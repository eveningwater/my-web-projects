/**
 * 计分与等级系统
 * - 规则：每消 10 行升 1 级
 * - 软降每格 +1 分；硬降每格 +2 分
 */

import { TetrisConfig } from "./TetrisConfig";

export class ScoreSystem {
  public score = 0;
  public lines = 0;
  public level = 1;
  private readonly config: TetrisConfig;

  public constructor(config: TetrisConfig) {
    this.config = config;
  }

  public reset(): void {
    this.score = 0;
    this.lines = 0;
    this.level = 1;
  }

  public addSoftDrop(points: number): void {
    this.score += points;
  }

  public addHardDrop(points: number): void {
    this.score += points;
  }

  public onClearLines(cleared: number): void {
    if (cleared <= 0) return;
    this.lines += cleared;
    this.level = Math.max(1, Math.floor(this.lines / 10) + 1);
    this.score += this.config.lineScore[cleared] * this.level;
  }
}
