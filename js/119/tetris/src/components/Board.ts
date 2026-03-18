/**
 * 棋盘（固定的 10x20 网格）
 * - 负责：碰撞检测、合并方块、消行等核心棋盘操作
 */

import type { CellPaint } from "./types";
import { ActivePiece } from "./ActivePiece";
import { TetrisConfig } from "./TetrisConfig";

export class Board {
  private grid: Array<Array<CellPaint | null>> = [];
  private readonly config: TetrisConfig;

  public constructor(config: TetrisConfig) {
    this.config = config;
    this.reset();
  }

  /**
   * 清空棋盘
   */
  public reset(): void {
    this.grid = Array.from({ length: this.config.rows }, () =>
      Array.from({ length: this.config.cols }, () => null),
    );
  }

  /**
   * 获取某个格子（越界返回 null）
   */
  public cell(x: number, y: number): CellPaint | null {
    if (y < 0 || y >= this.config.rows) return null;
    if (x < 0 || x >= this.config.cols) return null;
    return this.grid[y][x];
  }

  /**
   * 判断方块在 (nx, ny) 与旋转 nr 时是否与边界/已有格子碰撞
   */
  public collides(piece: ActivePiece, nx: number, ny: number, nr: number): boolean {
    const mat = piece.matrix(nr);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!mat[r][c]) continue;
        const x = nx + c;
        const y = ny + r;
        if (x < 0 || x >= this.config.cols) return true;
        if (y >= this.config.rows) return true;
        if (y >= 0 && this.grid[y][x]) return true;
      }
    }
    return false;
  }

  /**
   * 将活动方块合并到棋盘（变成固定方块）
   */
  public merge(piece: ActivePiece): void {
    const mat = piece.matrix();
    const def = piece.def;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!mat[r][c]) continue;
        const x = piece.x + c;
        const y = piece.y + r;
        if (y >= 0 && y < this.config.rows && x >= 0 && x < this.config.cols) {
          this.grid[y][x] = { type: piece.type, color: def.color, glow: def.glow };
        }
      }
    }
  }

  /**
   * 消除满行，并返回消除行数
   */
  public clearFullLines(): number {
    let cleared = 0;
    for (let y = this.config.rows - 1; y >= 0; y--) {
      const full = this.grid[y].every((cell) => cell != null);
      if (!full) continue;
      this.grid.splice(y, 1);
      this.grid.unshift(Array.from({ length: this.config.cols }, () => null));
      cleared++;
      y++;
    }
    return cleared;
  }

  /**
   * 遍历棋盘所有格子（用于渲染）
   */
  public forEachCell(cb: (x: number, y: number, cell: CellPaint | null) => void): void {
    for (let y = 0; y < this.config.rows; y++) {
      for (let x = 0; x < this.config.cols; x++) {
        cb(x, y, this.grid[y][x]);
      }
    }
  }
}
