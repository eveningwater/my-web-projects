/**
 * 游戏主类：整合棋盘、方块、计分、渲染、输入、UI
 * - 负责游戏生命周期与规则编排
 */

import type { GameStatus, TetrominoType } from "./types";
import { ActivePiece } from "./ActivePiece";
import { BagRandomizer } from "./BagRandomizer";
import { BestScoreStore } from "./BestScoreStore";
import { Board } from "./Board";
import { InputController } from "./InputController";
import { Renderer } from "./Renderer";
import { ScoreSystem } from "./ScoreSystem";
import { TetrisConfig } from "./TetrisConfig";
import { Ui } from "./Ui";
import { clamp, lerp } from "./utils";

export class TetrisGame {
  private readonly config = new TetrisConfig();
  private readonly board = new Board(this.config);
  private readonly score = new ScoreSystem(this.config);
  private readonly bestStore = new BestScoreStore();
  private readonly rng = new BagRandomizer(this.config);

  private readonly ui: Ui;
  private readonly renderer: Renderer;
  private readonly input: InputController;

  private piece: ActivePiece | null = null;
  private next: ActivePiece | null = null;

  /**
   * requestAnimationFrame 的 id
   * - 用于销毁时停止动画循环
   */
  private rafId: number | null = null;

  /**
   * 当前是否在运行
   * - 用于路由切换时安全停止循环
   */
  private running = false;

  /**
   * 保存事件处理函数引用，便于移除
   */
  private readonly onResize: () => void;
  private readonly onPointerDown: () => void;
  private readonly onEndlessClick: () => void;
  private readonly onRestartWinClick: () => void;

  /**
   * 关卡设置
   * - 普通模式：最多 20 关
   * - 达到第 20 关时弹窗提示：进入无限模式 / 重新开始
   */
  private readonly maxLevel = 20;

  /**
   * 是否为无限模式
   * - 进入无限模式后，等级继续增长（但速度本身仍有上限）
   */
  private infiniteMode = false;

  /**
   * 是否处于“通关选择中”
   * - 用于屏蔽暂停键，避免打断选择弹层
   */
  private awaitingModeChoice = false;

  private status: GameStatus = "ready";
  private fallAccMs = 0;
  private lockAccMs = 0;
  private lastTs = performance.now();

  public constructor() {
    // 获取画布与绘图上下文
    const gameCanvas = document.getElementById("game") as HTMLCanvasElement;
    const nextCanvas = document.getElementById("next") as HTMLCanvasElement;
    const g = gameCanvas.getContext("2d");
    const n = nextCanvas.getContext("2d");
    if (!g || !n) throw new Error("无法获取 Canvas 2D 上下文");

    this.ui = new Ui();
    this.renderer = new Renderer(this.config, gameCanvas, nextCanvas, g, n);
    this.input = new InputController(this.ui);

    this.onResize = () => this.renderer.layout();
    this.onPointerDown = () => {
      // 仅用于获得交互焦点，不做其他行为
    };
    this.onEndlessClick = () => this.enterEndlessMode();
    this.onRestartWinClick = () => this.restart();
  }

  /**
   * 初始化：布局、绑定输入、启动渲染循环
   */
  public init(): void {
    if (this.running) return;
    this.running = true;
    this.renderer.layout();
    window.addEventListener("resize", this.onResize, { passive: true });

    // 首屏提示
    this.ui.setModeChoiceVisible(false);
    this.ui.setStartVisible(true);
    this.ui.setOverlay(true, "点击开始游戏", "用方向键或触控按钮控制；Space 直接落到底；P 暂停。");

    // 绑定输入
    this.input.bind({
      start: () => this.start(),
      restart: () => this.restart(),
      pauseToggle: () => this.togglePause(),
      moveLeft: () => this.tryMove(-1, 0),
      moveRight: () => this.tryMove(1, 0),
      rotate: () => this.tryRotate(1),
      softDrop: () => this.softDropOne(),
      hardDrop: () => this.hardDrop(),
    });

    // 通关后模式选择
    this.ui.endlessBtn.addEventListener("click", this.onEndlessClick);
    this.ui.restartBtnWin.addEventListener("click", this.onRestartWinClick);

    // 让“点一下页面后再按键”的体验更稳
    document.body.addEventListener("pointerdown", this.onPointerDown, { passive: true });

    this.syncHud();
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  /**
   * 销毁游戏实例（路由切换离开首页时调用）
   * - 停止动画循环
   * - 移除全局事件监听
   */
  public destroy(): void {
    if (!this.running) return;
    this.running = false;

    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    window.removeEventListener("resize", this.onResize);
    document.body.removeEventListener("pointerdown", this.onPointerDown);
    this.ui.endlessBtn.removeEventListener("click", this.onEndlessClick);
    this.ui.restartBtnWin.removeEventListener("click", this.onRestartWinClick);
    this.input.destroy();
  }

  /**
   * 开始游戏（从 ready/paused/over 进入 running）
   */
  private start(): void {
    if (this.status === "running") return;
    if (this.awaitingModeChoice) return;
    if (this.status === "ready") {
      this.restart();
      return;
    }
    if (this.status === "paused") {
      this.status = "running";
      this.ui.setModeChoiceVisible(false);
      this.ui.setStartVisible(false);
      this.ui.setOverlay(false, "", "");
      this.syncHud();
      return;
    }
    if (this.status === "over") {
      this.restart();
    }
  }

  /**
   * 重新开始（重置一切）
   */
  private restart(): void {
    this.board.reset();
    this.score.reset();
    this.fallAccMs = 0;
    this.lockAccMs = 0;
    this.lastTs = performance.now();
    this.infiniteMode = false;
    this.awaitingModeChoice = false;
    this.ui.setModeChoiceVisible(false);
    this.ui.setStartVisible(false);

    this.next = this.spawnPiece(this.rng.next());
    this.piece = this.spawnPiece(this.rng.next());
    this.ui.nextNameEl.textContent = this.next.type;

    // 生成后立刻碰撞则判定失败（极少见，但需要）
    if (this.piece && this.board.collides(this.piece, this.piece.x, this.piece.y, this.piece.rotationIndex)) {
      this.status = "over";
      this.ui.setModeChoiceVisible(false);
      this.ui.setStartVisible(false);
      this.ui.setOverlay(true, "游戏结束", "按 R 重新开始。");
    } else {
      this.status = "running";
      this.ui.setModeChoiceVisible(false);
      this.ui.setStartVisible(false);
      this.ui.setOverlay(false, "", "");
    }
    this.syncHud();
  }

  /**
   * 暂停/继续
   */
  private togglePause(): void {
    if (this.status === "over" || this.status === "ready") return;
    if (this.awaitingModeChoice) return;
    if (this.status === "paused") {
      this.status = "running";
      this.ui.setModeChoiceVisible(false);
      this.ui.setStartVisible(false);
      this.ui.setOverlay(false, "", "");
    } else {
      this.status = "paused";
      this.ui.setModeChoiceVisible(false);
      this.ui.setStartVisible(false);
      this.ui.setOverlay(true, "已暂停", "按 P 继续，按 R 重新开始。");
    }
    this.syncHud();
  }

  /**
   * 进入无限模式
   * - 继续沿用当前棋盘与方块，直接从暂停恢复为进行中
   */
  private enterEndlessMode(): void {
    this.infiniteMode = true;
    this.awaitingModeChoice = false;
    this.status = "running";
    this.ui.setModeChoiceVisible(false);
    this.ui.setStartVisible(false);
    this.ui.setOverlay(false, "", "");
    this.syncHud();
  }

  /**
   * 达到第 20 关时的提示
   */
  private promptModeChoice(): void {
    this.awaitingModeChoice = true;
    this.status = "paused";
    this.ui.setStartVisible(false);
    this.ui.setModeChoiceVisible(true);
    this.ui.setOverlay(
      true,
      `已到第${this.maxLevel}关`,
      `你已通关第${this.maxLevel}关，是否进入无限模式？（或重新开始）`,
    );
    this.syncHud();
  }

  /**
   * 创建新方块（初始位置在上方）
   */
  private spawnPiece(type: TetrominoType): ActivePiece {
    const x = Math.floor(this.config.cols / 2) - 2;
    const y = -1;
    return new ActivePiece(type, 0, x, y);
  }

  /**
   * 尝试移动
   */
  private tryMove(dx: number, dy: number): boolean {
    if (!this.piece) return false;
    if (this.status !== "running") return false;
    const p = this.piece;
    const nx = p.x + dx;
    const ny = p.y + dy;
    if (this.board.collides(p, nx, ny, p.rotationIndex)) return false;
    p.x = nx;
    p.y = ny;
    this.lockAccMs = 0;
    this.syncHud();
    return true;
  }

  /**
   * 尝试旋转（带简单墙踢）
   */
  private tryRotate(dir: number): boolean {
    if (!this.piece) return false;
    if (this.status !== "running") return false;
    const p = this.piece;
    const mats = p.def.mats;
    if (mats.length === 1) return true;
    const nr = (p.rotationIndex + dir + mats.length) % mats.length;
    const kicks: Array<[number, number]> = [
      [0, 0],
      [-1, 0],
      [1, 0],
      [-2, 0],
      [2, 0],
      [0, -1],
    ];
    for (const [kx, ky] of kicks) {
      const nx = p.x + kx;
      const ny = p.y + ky;
      if (!this.board.collides(p, nx, ny, nr)) {
        p.x = nx;
        p.y = ny;
        p.rotationIndex = nr;
        this.lockAccMs = 0;
        this.syncHud();
        return true;
      }
    }
    return false;
  }

  /**
   * 软降一格（按下/长按 ↓ 或按钮）
   */
  private softDropOne(): boolean {
    if (!this.piece) return false;
    if (this.status !== "running") return false;
    const moved = this.tryMove(0, 1);
    if (moved) {
      this.score.addSoftDrop(1);
      this.saveBestIfNeeded();
      this.syncHud();
    }
    return moved;
  }

  /**
   * 硬降（直接到底）
   */
  private hardDrop(): void {
    if (!this.piece) return;
    if (this.status !== "running") return;
    let steps = 0;
    while (this.tryMove(0, 1)) steps++;
    this.score.addHardDrop(steps * 2);
    this.saveBestIfNeeded();
    this.lockNow();
  }

  /**
   * 立即锁定（合并、消行、生成下一个）
   */
  private lockNow(): void {
    if (!this.piece) return;
    this.board.merge(this.piece);
    const cleared = this.board.clearFullLines();
    const prevLevel = this.score.level;
    this.score.onClearLines(cleared);
    this.saveBestIfNeeded();

    // 出下一块
    this.piece = this.next;
    this.next = this.spawnPiece(this.rng.next());
    this.ui.nextNameEl.textContent = this.next.type;
    this.fallAccMs = 0;
    this.lockAccMs = 0;

    // 新方块无法放下则结束
    if (this.piece && this.board.collides(this.piece, this.piece.x, this.piece.y, this.piece.rotationIndex)) {
      this.status = "over";
      this.ui.setModeChoiceVisible(false);
      this.ui.setStartVisible(false);
      this.ui.setOverlay(true, "游戏结束", "按 R 重新开始。");
      this.syncHud();
      return;
    }

    // 普通模式：首次达到第 20 关就弹出选择
    if (!this.infiniteMode && !this.awaitingModeChoice && prevLevel < this.maxLevel && this.score.level >= this.maxLevel) {
      this.score.level = this.maxLevel;
      this.promptModeChoice();
      return;
    }
    this.syncHud();
  }

  /**
   * 帧循环：更新逻辑 + 渲染
   */
  private loop(): void {
    if (!this.running) return;
    const ts = performance.now();
    const dt = Math.min(50, ts - this.lastTs);
    this.lastTs = ts;

    this.tick(dt);
    this.renderer.render(this.board, this.piece, this.next);

    this.rafId = requestAnimationFrame(() => this.loop());
  }

  /**
   * 逻辑更新：自动下落 + 锁定延迟
   */
  private tick(dtMs: number): void {
    if (this.status !== "running") return;
    if (!this.piece) return;

    this.fallAccMs += dtMs;
    const effectiveLevel = this.infiniteMode ? this.score.level : Math.min(this.score.level, this.maxLevel);
    const fallMs = this.config.fallIntervalMs(effectiveLevel);

    while (this.fallAccMs >= fallMs) {
      this.fallAccMs -= fallMs;
      if (!this.tryMove(0, 1)) {
        this.lockAccMs += fallMs;
        if (this.lockAccMs >= this.config.lockDelayMs) {
          this.lockNow();
          break;
        }
      } else {
        this.lockAccMs = 0;
      }
    }
  }

  /**
   * 更新 HUD 文案（速度倍率等）
   */
  private syncHud(): void {
    const best = this.bestStore.load();
    const effectiveLevel = this.infiniteMode ? this.score.level : Math.min(this.score.level, this.maxLevel);
    const mult = lerp(1, 2.2, clamp((effectiveLevel - 1) / 14, 0, 1));
    const speedText = `速度 ${mult.toFixed(2)}x`;
    this.ui.updateHud(this.status, this.score, best, speedText, effectiveLevel);
  }

  /**
   * 如分数超过最高分则写入 localStorage
   */
  private saveBestIfNeeded(): void {
    const best = this.bestStore.load();
    if (this.score.score > best) this.bestStore.save(this.score.score);
  }
}
