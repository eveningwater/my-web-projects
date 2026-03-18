/**
 * 游戏配置（集中管理，便于调参）
 */

import type { TetrominoType } from "./types";
import { clamp, lerp } from "./utils";

export class TetrisConfig {
  public readonly cols = 10;
  public readonly rows = 20;
  public readonly cellSize = 36;
  public readonly lockDelayMs = 250;

  /**
   * 消行分数表（对应清除 1/2/3/4 行）
   */
  public readonly lineScore = [0, 100, 300, 500, 800] as const;

  /**
   * 方块袋（7-bag）顺序基础
   */
  public readonly bag: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];

  /**
   * 下落速度：根据 level 返回下落间隔（毫秒）
   * - 等级越高，间隔越小
   */
  public fallIntervalMs(level: number): number {
    const base = 700;
    const min = 85;
    const t = clamp((level - 1) / 18, 0, 1);
    return Math.round(lerp(base, min, t));
  }
}
