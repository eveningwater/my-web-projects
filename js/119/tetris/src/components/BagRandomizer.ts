/**
 * 7-bag 随机器
 * - 用“袋子洗牌”的方式保证随机更公平（不会连续很久缺某个块）
 */

import type { TetrominoType } from "./types";
import { TetrisConfig } from "./TetrisConfig";

export class BagRandomizer {
  private bag: TetrominoType[] = [];
  private readonly config: TetrisConfig;

  public constructor(config: TetrisConfig) {
    this.config = config;
  }

  private refill(): void {
    this.bag = this.shuffle(this.config.bag.slice());
  }

  private shuffle(arr: TetrominoType[]): TetrominoType[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  public next(): TetrominoType {
    if (this.bag.length === 0) this.refill();
    return this.bag.pop()!;
  }
}
