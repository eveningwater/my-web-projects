/**
 * 首页（游戏页）
 * - 负责渲染游戏 UI，并在渲染后启动游戏主类
 */

import { FooterLinksView } from "../components/FooterLinksView";
import { TetrisGame } from "../components/TetrisGame";
import { footerList } from "../components/footerList";
import type { View } from "../router/HashRouter";

export class HomeView implements View {
  private game: TetrisGame | null = null;
  private lastMobile: boolean | null = null;
  private onResize: (() => void) | null = null;

  public mount(container: HTMLElement): void {
    container.innerHTML = this.template();

    this.syncLayout();
    this.onResize = () => this.syncLayout();
    window.addEventListener("resize", this.onResize, { passive: true });

    // 启动游戏
    this.game = new TetrisGame();
    this.game.init();

    // 渲染页脚友情链接
    const footerEl = document.getElementById("footerLinks");
    if (footerEl) {
      new FooterLinksView(footerEl).render(footerList);
    }
  }

  public unmount(): void {
    // 卸载时释放全局事件与动画，避免切换页面后仍在运行
    if (this.game) this.game.destroy();
    this.game = null;

    if (this.onResize) window.removeEventListener("resize", this.onResize);
    this.onResize = null;
    this.lastMobile = null;
  }

  private template(): string {
    return `
      <div class="wrap">
        <div class="app">
          <section id="desktopLeftSlot" class="left" aria-label="统计面板"></section>

          <main class="center" aria-label="游戏区域">
            <div class="stage">
              <div class="stageGrid">
                <div class="stageMain">
                  <canvas id="game" width="360" height="720"></canvas>
                </div>

                <div class="stageSide">
                  <div id="mobileNextSlot"></div>
                  <div id="mobileStatsSlot"></div>
                </div>
              </div>

              <div id="overlay" class="overlay show" role="dialog" aria-modal="true">
                <div class="card">
                  <p id="overlayTitle" class="title">点击开始游戏</p>
                  <p id="overlayDesc" class="desc">用方向键或触控按钮控制，Space 直接落到底，P 暂停。</p>
                  <div class="overlayActions">
                    <button id="startBtn" class="primaryBtn" type="button">点击开始游戏</button>
                    <div id="modeChoice" class="modeChoice">
                      <button id="endlessBtn" class="primaryBtn" type="button">进入无限模式</button>
                      <button id="restartBtnWin" class="ghostBtn" type="button">重新开始</button>
                    </div>
                    <span class="badge">下一块：<b id="nextName">?</b></span>
                    <div class="overlayTip">也可以按 <span class="kbd">R</span> 开始</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="footer">提示：移动端使用下方触控按钮；首次打开请点击页面后再按键。</div>

            <section class="mobileControls" aria-label="触控操作">
              <div class="meta">
                <span>触控操作</span>
                <span>长按可连发</span>
              </div>
              <div class="row" style="margin-bottom: 10px">
                <button class="mcBtn" id="btnLeft" type="button">左移</button>
                <button class="mcBtn primary" id="btnRotate" type="button">旋转</button>
                <button class="mcBtn" id="btnRight" type="button">右移</button>
              </div>
              <div class="row" style="margin-bottom: 10px">
                <button class="mcBtn" id="btnDown" type="button">软降</button>
                <button class="mcBtn primary" id="btnDrop" type="button">快速下落</button>
                <button class="mcBtn" id="btnPause" type="button">暂停/继续</button>
              </div>
              <div class="row">
                <button class="mcBtn danger wide" id="btnRestart" type="button">重新开始</button>
              </div>
            </section>
          </main>

          <aside id="desktopRightSlot" class="right" aria-label="预览与提示"></aside>

          <div id="hudStash" style="display: none">
            <section id="hudLeftPanel" class="panel" aria-label="统计面板">
              <div class="brand">
                <h1>俄罗斯方块</h1>
                <div class="sub">清爽主题 · 键盘/触控</div>
              </div>
              <div class="kv">
                <div class="stat"><div class="k">分数</div><div id="score" class="v">0</div></div>
                <div class="stat"><div class="k">等级</div><div id="level" class="v">1</div></div>
                <div class="stat"><div class="k">已消行</div><div id="lines" class="v">0</div></div>
                <div class="stat"><div class="k">最高分</div><div id="best" class="v">0</div></div>
              </div>
              <div class="hint">
                <div><span class="kbd">←</span>/<span class="kbd">→</span> 移动，<span class="kbd">↑</span> 旋转</div>
                <div><span class="kbd">↓</span> 软降，<span class="kbd">Space</span> 快速下落</div>
                <div><span class="kbd">P</span> 暂停/继续，<span class="kbd">R</span> 重新开始</div>
              </div>
            </section>

            <section id="hudNextPanel" class="panel nextWrap" aria-label="下一个方块">
              <div class="labelRow">
                <div class="label">下一个方块</div>
                <div class="mini" id="speed">速度 1.00x</div>
              </div>
              <div class="miniPanel">
                <canvas id="next" width="160" height="160"></canvas>
              </div>
            </section>

            <section id="hudStatePanel" class="panel" aria-label="状态与计分">
              <div class="labelRow">
                <div class="label">状态</div>
                <div class="mini" id="state">准备</div>
              </div>
              <div class="hint" style="margin-top: 10px; padding-top: 0; border-top: 0">
                <div>消行计分：1/2/3/4 行 = 100/300/500/800 × 等级</div>
                <div>软降每格 +1 分，快速下落每格 +2 分</div>
              </div>
            </section>
          </div>
        </div>

        <footer class="panel siteFooter" aria-label="友情链接">
          <div class="siteFooterTitle">友情链接</div>
          <nav id="footerLinks" class="siteFooterLinks" aria-label="友情链接列表"></nav>
        </footer>
      </div>
    `;
  }

  private syncLayout(): void {
    const isMobile = window.matchMedia("(max-width: 860px)").matches || window.matchMedia("(pointer: coarse)").matches;
    if (this.lastMobile === isMobile) return;
    this.lastMobile = isMobile;

    const stash = document.getElementById("hudStash");
    const desktopLeft = document.getElementById("desktopLeftSlot");
    const desktopRight = document.getElementById("desktopRightSlot");
    const mobileNext = document.getElementById("mobileNextSlot");
    const mobileStats = document.getElementById("mobileStatsSlot");
    const leftPanel = document.getElementById("hudLeftPanel");
    const nextPanel = document.getElementById("hudNextPanel");
    const statePanel = document.getElementById("hudStatePanel");

    if (!stash || !desktopLeft || !desktopRight || !mobileNext || !mobileStats || !leftPanel || !nextPanel || !statePanel) return;

    const stateRow = statePanel.querySelector(".labelRow");
    const stateHint = statePanel.querySelector(".hint");
    const kv = leftPanel.querySelector(".kv");
    const leftHint = leftPanel.querySelector(".hint");
    const leftBrand = leftPanel.querySelector(".brand");

    if (isMobile) {
      nextPanel.className = "stageCard stageNext";
      mobileNext.replaceChildren(nextPanel);

      leftPanel.className = "stageCard stageStats";
      mobileStats.replaceChildren(leftPanel);

      if (stateRow && kv && stateRow.parentElement === statePanel) {
        leftPanel.insertBefore(stateRow, kv);
      }

      if (leftBrand) (leftBrand as HTMLElement).style.display = "none";
      if (leftHint) (leftHint as HTMLElement).style.display = "none";
      if (stateHint) (stateHint as HTMLElement).style.display = "none";

      stash.appendChild(statePanel);
    } else {
      nextPanel.className = "panel nextWrap";
      statePanel.className = "panel";
      leftPanel.className = "panel";

      desktopLeft.replaceChildren(leftPanel);
      desktopRight.replaceChildren(nextPanel, statePanel);

      if (stateRow && stateRow.parentElement !== statePanel) {
        statePanel.insertBefore(stateRow, statePanel.firstChild);
      }

      if (leftBrand) (leftBrand as HTMLElement).style.display = "";
      if (leftHint) (leftHint as HTMLElement).style.display = "";
      if (stateHint) (stateHint as HTMLElement).style.display = "";
    }
  }
}
