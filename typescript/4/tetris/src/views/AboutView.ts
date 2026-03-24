/**
 * 关于页
 * - 介绍游戏的设计与实现思路
 * - 如果涉及代码展示，使用代码高亮库进行高亮渲染
 */

import type { View } from "../router/HashRouter";

// 代码高亮（highlight.js）
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import plaintext from "highlight.js/lib/languages/plaintext";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/github-dark.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);

export class AboutView implements View {
  public mount(container: HTMLElement): void {
    container.innerHTML = this.template();
    const blocks = Array.from(container.querySelectorAll<HTMLElement>("pre code"));
    for (const block of blocks) hljs.highlightElement(block);
  }

  private template(): string {
    const stateSnippet = `// 一个可运行的俄罗斯方块，至少需要这些核心状态：
const state = {
  board: createBoard(), // 20 行 x 10 列，格子里存 null 或 { color, glow, type }
  bag: [],              // 7-bag 随机器的“袋子”
  piece: null,          // 当前活动方块 { type, r, x, y }
  next: null,           // 下一块（用于预览）
  score: 0,
  lines: 0,
  level: 1,
  paused: true,
  over: false,
  fallAcc: 0,           // 下落累计时间
  lockAcc: 0,           // 锁定累计时间（接触地面后给玩家调整时间）
};`;

    const piecesSnippet = `// 7 种方块的核心是“旋转矩阵”
// - 用 4x4 矩阵表示占用格子
// - 同一方块可能有 1/2/4 个旋转状态
const PIECES = {
  T: {
    color: '#b18bff',
    mats: [
      [
        [0,1,0,0],
        [1,1,1,0],
        [0,0,0,0],
        [0,0,0,0],
      ],
      // 其余 3 个旋转省略...
    ],
  },
  // I/O/S/Z/J/L 省略...
};`;

    const bagSnippet = `// 7-bag：把 I/O/T/S/Z/J/L 放进袋子洗牌，逐个取出
function refillBag() {
  state.bag = shuffle(['I','O','T','S','Z','J','L']);
}

function takeFromBag() {
  if (state.bag.length === 0) refillBag();
  return state.bag.pop();
}`;

    const spawnSnippet = `// 出生位置：居中 + y=-1（允许方块在棋盘外一点点）
function spawnPiece(type) {
  const x = Math.floor(COLS / 2) - 2;
  const y = -1;
  const r = 0;
  return { type, x, y, r };
}`;

    const collidesSnippet = `// 碰撞检测：判断某个“尝试姿态”是否越界或撞到已落下方块
function collides(piece, nx, ny, nr) {
  const mat = matrixAt(piece, nr);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (!mat[r][c]) continue;
      const x = nx + c;
      const y = ny + r;
      if (x < 0 || x >= COLS) return true;
      if (y >= ROWS) return true;
      if (y >= 0 && state.board[y][x]) return true;
    }
  }
  return false;
}`;

    const moveRotateSnippet = `// 移动：如果不碰撞，就更新坐标
function tryMove(dx, dy) {
  const p = state.piece;
  const nx = p.x + dx;
  const ny = p.y + dy;
  if (collides(p, nx, ny, p.r)) return false;
  p.x = nx;
  p.y = ny;
  state.lockAcc = 0; // 只要玩家还在调整，就不应立刻锁定
  return true;
}

// 旋转：旋转后可能碰撞，因此要做“墙踢”（kicks）
function tryRotate(dir) {
  const p = state.piece;
  const mats = PIECES[p.type].mats;
  if (mats.length === 1) return true;
  const nr = (p.r + dir + mats.length) % mats.length;
  const kicks = [[0,0],[-1,0],[1,0],[-2,0],[2,0],[0,-1]];
  for (const [kx, ky] of kicks) {
    if (!collides(p, p.x + kx, p.y + ky, nr)) {
      p.x += kx;
      p.y += ky;
      p.r = nr;
      state.lockAcc = 0;
      return true;
    }
  }
  return false;
}`;

    const mergeClearSnippet = `// 锁定：把活动方块写入棋盘网格
function mergePiece() {
  const p = state.piece;
  const mat = matrixAt(p, p.r);
  const def = PIECES[p.type];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (!mat[r][c]) continue;
      const x = p.x + c;
      const y = p.y + r;
      if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
        state.board[y][x] = { type: p.type, color: def.color, glow: def.glow };
      }
    }
  }
}

// 消行：从底往上扫描，满行就删掉并在顶部补一行空行
function clearLines() {
  let cleared = 0;
  for (let y = ROWS - 1; y >= 0; y--) {
    if (state.board[y].every(Boolean)) {
      state.board.splice(y, 1);
      state.board.unshift(Array.from({ length: COLS }, () => null));
      cleared++;
      y++;
    }
  }
  return cleared;
}`;

    const scoreLevelSnippet = `// 计分：一次消 1/2/3/4 行分别加 100/300/500/800，再乘以等级
const SCORE_TABLE = [0, 100, 300, 500, 800];

function applyScoreAndLevel(cleared) {
  if (cleared <= 0) return;
  state.lines += cleared;
  state.level = Math.max(1, Math.floor(state.lines / 10) + 1);
  state.score += SCORE_TABLE[cleared] * state.level;
}

// 下落奖励：软降每格 +1，硬降每格 +2
function softDropOne() { if (tryMove(0, 1)) state.score += 1; }
function hardDrop() { let s=0; while (tryMove(0,1)) s++; state.score += s * 2; lockNow(); }`;

    const tickLoopSnippet = `// 自动下落 + 锁定延迟（lockDelay=250ms）：这是“手感”的关键之一
function fallIntervalMs(level) {
  const base = 700;
  const min = 85;
  const t = clamp((level - 1) / 18, 0, 1);
  return Math.round(lerp(base, min, t));
}

function tick(dt) {
  if (state.paused || state.over) return;
  state.fallAcc += dt;
  const fallMs = fallIntervalMs(state.level);
  while (state.fallAcc >= fallMs) {
    state.fallAcc -= fallMs;
    if (!tryMove(0, 1)) {
      state.lockAcc += fallMs;
      if (state.lockAcc >= 250) {
        lockNow();
        break;
      }
    } else {
      state.lockAcc = 0;
    }
  }
}

function loop() {
  const t = performance.now();
  const dt = Math.min(50, t - lastTick);
  lastTick = t;
  tick(dt);
  render();
  requestAnimationFrame(loop);
}`;

    const ghostSnippet = `// 幽灵落点：不断尝试 y+1，直到即将碰撞为止
function ghostY() {
  const p = state.piece;
  let y = p.y;
  while (!collides(p, p.x, y + 1, p.r)) y++;
  return y;
}`;

    const hidpiSnippet = `// HiDPI：按 devicePixelRatio 放大像素缓冲，避免在高分屏发虚
const DPR = Math.min(2, window.devicePixelRatio || 1);
canvas.style.width = cssW + 'px';
canvas.style.height = cssH + 'px';
canvas.width = Math.round(cssW * DPR);
canvas.height = Math.round(cssH * DPR);
ctx.setTransform(DPR, 0, 0, DPR, 0, 0);`;

    return `
      <div class="wrap">
        <section class="panel aboutCard" aria-label="关于页面">
          <div class="aboutTitle">关于：俄罗斯方块游戏逻辑是如何实现的</div>

          <p class="aboutText">
            本文将详解“俄罗斯方块本身的实现逻辑”。
          </p>

          <div class="aboutSectionTitle">1. 先确定固定规则：棋盘尺寸与格子坐标系</div>
          <p class="aboutText">
            经典俄罗斯方块的棋盘通常是 <span class="kbd">10 列 × 20 行</span>。实现上最关键的一点是：所有操作都在“格子坐标”里完成，
            渲染时才把格子坐标映射到像素坐标（例如 CELL=36，则像素坐标为 x*CELL、y*CELL）。
          </p>

          <div class="aboutSectionTitle">2. 定义 7 种方块：旋转矩阵是核心数据</div>
          <p class="aboutText">
            方块并不需要“几何算法”，只需要旋转状态下的 4×4 矩阵。矩阵里的 1 表示占用格子，0 表示空。
            O 方块只有 1 个旋转态，I/S/Z 有 2 个，T/J/L 通常有 4 个。这样一来，“旋转”就等价于切换矩阵索引。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(piecesSnippet)}</code></pre>

          <div class="aboutSectionTitle">3. 游戏状态最少需要哪些字段</div>
          <p class="aboutText">
            俄罗斯方块是一套状态机：当前棋盘、当前方块、下一块、分数、等级、是否暂停/结束，以及驱动自动下落的计时器。
            只要这些状态都能被稳定维护，游戏逻辑就能跑起来。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(stateSnippet)}</code></pre>

          <div class="aboutSectionTitle">4. 随机出块：用 7-bag 让随机更“公平”</div>
          <p class="aboutText">
            直接随机会出现“很久不出 I 块”这种极端情况，体验较差。常用做法是 7-bag：把 7 种方块放入一个袋子，洗牌后逐个取出，
            袋子为空再洗一次。这样“每 7 次”至少出现一次每种方块，随机但不极端。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(bagSnippet)}</code></pre>

          <div class="aboutSectionTitle">5. 出生点：居中 + 顶部外溢（y = -1）</div>
          <p class="aboutText">
            出生时让方块的 y 为 -1（甚至更小）是常见做法：允许方块“从棋盘上方进入”，并且旋转时不会一开始就因为顶部边界而失败。
            但碰撞检测要特别处理：y&lt;0 的部分不能访问棋盘数组，只要不越过左右边界即可。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(spawnSnippet)}</code></pre>

          <div class="aboutSectionTitle">6. 碰撞检测：所有规则判断都围绕它展开</div>
          <p class="aboutText">
            碰撞检测是俄罗斯方块最核心的函数。移动/旋转/硬降/幽灵落点/锁定，都需要调用它。
            它的输入不是“当前方块”，而是一个“尝试姿态”：想把方块放到 (nx, ny) 并且旋转到 nr，这样可以做到“先判定再落位”。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(collidesSnippet)}</code></pre>

          <div class="aboutSectionTitle">7. 移动与旋转：先试探、再提交</div>
          <p class="aboutText">
            移动的逻辑很简单：如果不碰撞就更新坐标。同时有一个非常重要的小细节：只要玩家还在移动/旋转，就应该重置锁定计时，
            否则会出现“刚落地想调整一下就立刻锁死”的糟糕手感。
          </p>
          <p class="aboutText">
            旋转比移动复杂：方块在墙边或堆叠附近旋转，极容易碰撞。为了让旋转更“顺”，会做一个简化的墙踢策略：
            旋转失败时尝试把方块向左/右挪 1~2 格或向上抬 1 格，只要找到一个不碰撞的位置就算旋转成功。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(moveRotateSnippet)}</code></pre>

          <div class="aboutSectionTitle">8. 锁定与消行：把“活动方块”写入棋盘</div>
          <p class="aboutText">
            当方块无法继续下落并且锁定延迟结束时，需要把它“合并”到棋盘网格（从活动方块变为固定方块），这一步叫 merge。
            merge 之后检查满行：从底向上扫描，满行就删除该行，并在顶部插入一行空行。这样棋盘高度保持不变。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(mergeClearSnippet)}</code></pre>

          <div class="aboutSectionTitle">9. 计分与等级：让游戏有节奏</div>
          <p class="aboutText">
            常见的简化计分是：一次消 1/2/3/4 行分别奖励 100/300/500/800，再乘以当前等级；
            同时给软降/硬降一些小奖励，让“操作技巧”能直接反馈到分数上。
          </p>
          <p class="aboutText">
            等级的推进通常与已消行数绑定，例如每消 10 行升 1 级。等级越高，下落速度越快，但为了可玩性通常会给速度一个上限。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(scoreLevelSnippet)}</code></pre>

          <div class="aboutSectionTitle">10. 自动下落与锁定延迟：手感的关键</div>
          <p class="aboutText">
            游戏循环中最关键的部分是 tick：累计时间达到下落间隔就尝试下落一格；如果下落失败，就开始累计 lockAcc（锁定累计时间）；
            lockAcc 超过 lockDelay（比如 250ms）就真正锁定。
          </p>
          <p class="aboutText">
            这就是为什么“方块落地后还能左右挪一下”：它不是 bug，是故意做出来的手感。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(tickLoopSnippet)}</code></pre>

          <div class="aboutSectionTitle">11. 幽灵落点：辅助玩家预判</div>
          <p class="aboutText">
            幽灵落点（ghost piece）用于提示“如果现在硬降会落到哪里”。实现方式很直观：不断尝试 y+1，直到下一步会发生碰撞为止。
            这也是碰撞检测函数复用带来的好处：只要 collides 写对了，很多功能都能“顺手实现”。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(ghostSnippet)}</code></pre>

          <div class="aboutSectionTitle">12. 渲染与性能：Canvas 的 HiDPI 与缓存</div>
          <p class="aboutText">
            渲染上一般把棋盘背景（网格线、渐变）画到一个离屏缓存里：每帧先把缓存 drawImage 到主画布，再画棋盘固定块、幽灵、活动块。
            这样比每帧重画网格更省。
          </p>
          <p class="aboutText">
            另外，高分屏上 Canvas 容易发虚，解决方案是按 DPR 放大画布实际像素缓冲，再把坐标系缩回 CSS 像素。
          </p>
          <pre class="aboutCode"><code class="language-javascript">${this.escape(hidpiSnippet)}</code></pre>

          <div class="aboutSectionTitle">13. 进阶规则：20 关与无限模式（本项目的扩展）</div>
          <p class="aboutText">
            在经典“等级越高越快”的基础上，本项目增加了一个“20 关通关提示”：普通模式最多到第 20 关，到达时暂停并询问是否进入无限模式或重新开始。
            无限模式下等级可以继续增长（但速度公式仍可设置上限），保证既有通关目标也保留挑战空间。
          </p>

          <div class="aboutSectionTitle">14. 继续扩展的方向</div>
          <ul class="aboutList">
            <li>实现更完整的 SRS 墙踢规则（旋转手感进一步提升）。</li>
            <li>加入 Hold（暂存方块）、连击/Back-to-Back 等现代计分系统。</li>
            <li>加入“阴影/粒子/音效”，并与渲染层解耦。</li>
            <li>加入回放或“种子随机”，方便复盘与挑战。</li>
          </ul>
        </section>
      </div>
    `;
  }

  /**
   * 将代码片段转义为安全的 HTML 文本，避免被当作标签解析
   */
  private escape(code: string): string {
    return code
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}
