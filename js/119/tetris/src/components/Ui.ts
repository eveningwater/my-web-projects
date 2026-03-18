/**
 * UI 视图层：负责更新文本、按钮、遮罩层显示
 * - 这里只做 DOM 显示更新，不写游戏规则
 */

import type { GameStatus } from "./types";
import { ScoreSystem } from "./ScoreSystem";

export class Ui {
  public readonly scoreEl = document.getElementById("score") as HTMLDivElement;
  public readonly levelEl = document.getElementById("level") as HTMLDivElement;
  public readonly linesEl = document.getElementById("lines") as HTMLDivElement;
  public readonly bestEl = document.getElementById("best") as HTMLDivElement;
  public readonly speedEl = document.getElementById("speed") as HTMLDivElement;
  public readonly stateEl = document.getElementById("state") as HTMLDivElement;
  public readonly overlayEl = document.getElementById("overlay") as HTMLDivElement;
  public readonly overlayTitleEl = document.getElementById("overlayTitle") as HTMLParagraphElement;
  public readonly overlayDescEl = document.getElementById("overlayDesc") as HTMLParagraphElement;
  public readonly nextNameEl = document.getElementById("nextName") as HTMLElement;
  public readonly startBtn = document.getElementById("startBtn") as HTMLButtonElement;
  public readonly modeChoiceEl = document.getElementById("modeChoice") as HTMLDivElement;
  public readonly endlessBtn = document.getElementById("endlessBtn") as HTMLButtonElement;
  public readonly restartBtnWin = document.getElementById("restartBtnWin") as HTMLButtonElement;

  // 移动端按钮
  public readonly btnLeft = document.getElementById("btnLeft") as HTMLButtonElement;
  public readonly btnRight = document.getElementById("btnRight") as HTMLButtonElement;
  public readonly btnRotate = document.getElementById("btnRotate") as HTMLButtonElement;
  public readonly btnDown = document.getElementById("btnDown") as HTMLButtonElement;
  public readonly btnDrop = document.getElementById("btnDrop") as HTMLButtonElement;
  public readonly btnPause = document.getElementById("btnPause") as HTMLButtonElement;
  public readonly btnRestart = document.getElementById("btnRestart") as HTMLButtonElement;

  /**
   * 显示/隐藏遮罩层
   */
  public setOverlay(show: boolean, title: string, desc: string): void {
    this.overlayEl.classList.toggle("show", show);
    this.overlayTitleEl.textContent = title;
    this.overlayDescEl.textContent = desc;
  }

  /**
   * 控制“通关提示”的按钮组显示与否
   */
  public setModeChoiceVisible(show: boolean): void {
    this.modeChoiceEl.classList.toggle("show", show);
  }

  /**
   * 控制“开始按钮”是否显示（通关弹层出现时会隐藏）
   */
  public setStartVisible(show: boolean): void {
    this.startBtn.style.display = show ? "" : "none";
  }

  /**
   * 更新 HUD（分数/等级/速度/状态等）
   * - levelOverride：当需要“封顶显示”等级时可传入该值
   */
  public updateHud(status: GameStatus, score: ScoreSystem, best: number, speedText: string, levelOverride?: number): void {
    this.scoreEl.textContent = String(score.score);
    this.levelEl.textContent = String(levelOverride ?? score.level);
    this.linesEl.textContent = String(score.lines);
    this.bestEl.textContent = String(best);
    this.speedEl.textContent = speedText;
    this.stateEl.textContent = status === "ready" ? "准备" : status === "running" ? "进行中" : status === "paused" ? "暂停" : "结束";
  }
}
