/**
 * 输入控制：键盘 + 触控按钮（移动端）
 * - 负责把用户输入映射为“游戏动作”
 */

import { Ui } from "./Ui";

export class InputController {
  private readonly ui: Ui;
  private readonly cleanups: Array<() => void> = [];

  public constructor(ui: Ui) {
    this.ui = ui;
  }

  /**
   * 绑定“长按连发”按钮
   * - 用 pointer 事件兼容鼠标/触摸
   */
  public bindHoldButton(button: HTMLButtonElement, onStep: () => void, intervalMs: number = 90): void {
    let timer: number | null = null;
    let active = false;

    const start = (): void => {
      if (active) return;
      active = true;
      onStep();
      timer = window.setInterval(onStep, intervalMs);
    };

    const stop = (): void => {
      active = false;
      if (timer != null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const onPointerDown = (e: PointerEvent): void => {
      e.preventDefault();
      start();
    };

    button.addEventListener("pointerdown", onPointerDown);
    button.addEventListener("pointerup", stop);
    button.addEventListener("pointerleave", stop);
    button.addEventListener("pointercancel", stop);

    this.cleanups.push(() => {
      stop();
      button.removeEventListener("pointerdown", onPointerDown);
      button.removeEventListener("pointerup", stop);
      button.removeEventListener("pointerleave", stop);
      button.removeEventListener("pointercancel", stop);
    });
  }

  /**
   * 统一绑定输入
   */
  public bind(handlers: {
    start: () => void;
    restart: () => void;
    pauseToggle: () => void;
    moveLeft: () => void;
    moveRight: () => void;
    rotate: () => void;
    softDrop: () => void;
    hardDrop: () => void;
  }): void {
    // 点击开始按钮
    const onStartClick = (): void => handlers.start();
    this.ui.startBtn.addEventListener("click", onStartClick);
    this.cleanups.push(() => this.ui.startBtn.removeEventListener("click", onStartClick));

    // 键盘控制（桌面/外接键盘）
    const onKeyDown = (e: KeyboardEvent): void => {
      const k = e.key;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Spacebar"].includes(k)) e.preventDefault();
      if (k === "r" || k === "R") {
        handlers.restart();
        return;
      }
      if (k === "p" || k === "P") {
        handlers.pauseToggle();
        return;
      }
      if (k === "ArrowLeft") handlers.moveLeft();
      else if (k === "ArrowRight") handlers.moveRight();
      else if (k === "ArrowUp") handlers.rotate();
      else if (k === "ArrowDown") handlers.softDrop();
      else if (k === " " || k === "Spacebar") handlers.hardDrop();
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    this.cleanups.push(() => window.removeEventListener("keydown", onKeyDown));

    // 移动端按钮
    const onRotateClick = (): void => handlers.rotate();
    const onDropClick = (): void => handlers.hardDrop();
    const onPauseClick = (): void => handlers.pauseToggle();
    const onRestartClick = (): void => handlers.restart();
    this.ui.btnRotate.addEventListener("click", onRotateClick);
    this.ui.btnDrop.addEventListener("click", onDropClick);
    this.ui.btnPause.addEventListener("click", onPauseClick);
    this.ui.btnRestart.addEventListener("click", onRestartClick);
    this.cleanups.push(() => this.ui.btnRotate.removeEventListener("click", onRotateClick));
    this.cleanups.push(() => this.ui.btnDrop.removeEventListener("click", onDropClick));
    this.cleanups.push(() => this.ui.btnPause.removeEventListener("click", onPauseClick));
    this.cleanups.push(() => this.ui.btnRestart.removeEventListener("click", onRestartClick));
    this.bindHoldButton(this.ui.btnLeft, handlers.moveLeft);
    this.bindHoldButton(this.ui.btnRight, handlers.moveRight);
    this.bindHoldButton(this.ui.btnDown, handlers.softDrop);
  }

  /**
   * 销毁输入绑定
   * - 用于路由切换离开首页时清理全局事件
   */
  public destroy(): void {
    for (const dispose of this.cleanups.splice(0)) dispose();
  }
}
