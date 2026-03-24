/**
 * 通用类型定义
 * - 把全局会用到的类型集中在一个文件里，避免循环依赖与重复声明
 */

/**
 * 方块类型枚举
 * - I、O、T、S、Z、J、L 是经典 7 种四连块
 */
export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

/**
 * 单个格子的渲染数据
 * - color/glow 用于绘制带高光的方块效果
 */
export interface CellPaint {
  type: TetrominoType;
  color: string;
  glow: string;
}

/**
 * 游戏运行状态
 */
export type GameStatus = "ready" | "running" | "paused" | "over";

/**
 * 方块定义（颜色 + 旋转矩阵）
 * - mats：每个元素是 4x4 矩阵，用 1/0 表示格子占用
 */
export interface TetrominoDef {
  name: TetrominoType;
  color: string;
  glow: string;
  mats: number[][][];
}

/**
 * 页脚友情链接条目
 */
export interface FooterItem {
  text: string;
  url: string;
}
