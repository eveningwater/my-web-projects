/**
 * 活动方块（正在下落的那个）
 */

import type { TetrominoDef, TetrominoType } from "./types";
import { TETROMINOS } from "./tetrominos";

export class ActivePiece {
  public readonly type: TetrominoType;
  public rotationIndex: number;
  public x: number;
  public y: number;

  public constructor(type: TetrominoType, rotationIndex: number, x: number, y: number) {
    this.type = type;
    this.rotationIndex = rotationIndex;
    this.x = x;
    this.y = y;
  }

  /**
   * 获取该方块类型的定义（颜色/矩阵等）
   */
  public get def(): TetrominoDef {
    return TETROMINOS[this.type];
  }

  /**
   * 获取指定旋转下的 4x4 矩阵
   */
  public matrix(rot: number = this.rotationIndex): number[][] {
    const mats = this.def.mats;
    const idx = ((rot % mats.length) + mats.length) % mats.length;
    return mats[idx];
  }

  /**
   * 创建一个拷贝（用于尝试移动/旋转）
   */
  public clone(): ActivePiece {
    return new ActivePiece(this.type, this.rotationIndex, this.x, this.y);
  }
}
