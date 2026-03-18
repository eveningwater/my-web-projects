/**
 * 渲染器：负责把棋盘、方块、预览画布绘制出来
 * - 使用 canvas 2D
 * - 内部做 HiDPI 处理（不改变布局尺寸，只改变像素缓冲）
 */

import { ActivePiece } from "./ActivePiece";
import { Board } from "./Board";
import { TetrisConfig } from "./TetrisConfig";
import { rgba } from "./utils";

export class Renderer {
  private readonly config: TetrisConfig;
  private readonly gameCanvas: HTMLCanvasElement;
  private readonly nextCanvas: HTMLCanvasElement;
  private readonly g: CanvasRenderingContext2D;
  private readonly n: CanvasRenderingContext2D;
  private readonly dpr: number;
  private readonly boardW: number;
  private readonly boardH: number;

  private gridCache: HTMLCanvasElement;

  public constructor(
    config: TetrisConfig,
    gameCanvas: HTMLCanvasElement,
    nextCanvas: HTMLCanvasElement,
    g: CanvasRenderingContext2D,
    n: CanvasRenderingContext2D,
  ) {
    this.config = config;
    this.gameCanvas = gameCanvas;
    this.nextCanvas = nextCanvas;
    this.g = g;
    this.n = n;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.boardW = this.config.cols * this.config.cellSize;
    this.boardH = this.config.rows * this.config.cellSize;
    this.gridCache = this.buildGridCache();
  }

  /**
   * 按 CSS 尺寸设置画布，并按 DPR 设置实际像素缓冲
   */
  public layout(): void {
    const stage = this.gameCanvas.parentElement;
    const stageBox = stage?.closest(".stage") as HTMLElement | null;
    let cssW = this.boardW;
    if (stage) {
      const availW = innerWidth(stage);
      cssW = Math.max(1, Math.min(this.boardW, Math.floor(availW)));
    }
    const aspect = this.boardH / this.boardW;
    let cssH = Math.max(1, Math.round(cssW * aspect));

    const center = this.gameCanvas.closest(".center") as HTMLElement | null;
    const wrap = stage?.closest(".wrap") as HTMLElement | null;
    if (isMobile() && stage && center && wrap && stageBox) {
      const viewportH = window.innerHeight;
      const headerH = document.querySelector<HTMLElement>(".topBar")?.getBoundingClientRect().height ?? 0;
      const wrapStyle = getComputedStyle(wrap);
      const wrapPadT = Number.parseFloat(wrapStyle.paddingTop) || 0;
      const wrapPadB = Number.parseFloat(wrapStyle.paddingBottom) || 0;

      const brandEl = center.querySelector<HTMLElement>(".brandCenter");
      const brandH = brandEl ? brandEl.getBoundingClientRect().height : 0;
      const footerEl = center.querySelector<HTMLElement>(".footer");
      const controlsEl = center.querySelector<HTMLElement>(".mobileControls");
      const footerH = footerEl ? footerEl.getBoundingClientRect().height : 0;
      const controlsH = controlsEl && isDisplayed(controlsEl) ? controlsEl.getBoundingClientRect().height : 0;

      const centerStyle = getComputedStyle(center);
      const gap = Number.parseFloat(centerStyle.rowGap || centerStyle.gap) || 0;
      const count =
        1 +
        (brandEl ? 1 : 0) +
        (footerEl ? 1 : 0) +
        (controlsEl && isDisplayed(controlsEl) ? 1 : 0);
      const gapCount = Math.max(0, count - 1);
      const gapsH = gap * gapCount;

      const stageStyle = getComputedStyle(stageBox);
      const stageExtraH =
        (Number.parseFloat(stageStyle.paddingTop) || 0) +
        (Number.parseFloat(stageStyle.paddingBottom) || 0) +
        (Number.parseFloat(stageStyle.borderTopWidth) || 0) +
        (Number.parseFloat(stageStyle.borderBottomWidth) || 0);

      const reserve = 4;
      const maxCanvasCssH = viewportH - headerH - wrapPadT - wrapPadB - brandH - stageExtraH - footerH - controlsH - gapsH - reserve;
      if (Number.isFinite(maxCanvasCssH) && maxCanvasCssH > 0) {
        cssH = Math.min(cssH, Math.floor(maxCanvasCssH));
        cssW = Math.max(1, Math.min(cssW, Math.floor(cssH / aspect)));
      }
    }

    if (stageBox) {
      stageBox.style.setProperty("--stageMainH", `${cssH}px`);
      stageBox.style.setProperty("--stageMainW", `${cssW}px`);
    }
    this.resizeCanvas(this.gameCanvas, this.g, cssW, cssH, this.boardW, this.boardH);
    const nextBase = this.nextCanvas.closest(".stageCard") ? 60 : 160;
    this.resizeCanvas(this.nextCanvas, this.n, nextBase, nextBase);
  }

  private resizeCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    cssW: number,
    cssH: number,
    logicalW: number = cssW,
    logicalH: number = cssH,
  ): void {
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const w = Math.round(cssW * this.dpr);
    const h = Math.round(cssH * this.dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const sx = cssW / logicalW;
    const sy = cssH / logicalH;
    ctx.setTransform(this.dpr * sx, 0, 0, this.dpr * sy, 0, 0);
    ctx.imageSmoothingEnabled = true;
  }

  /**
   * 生成棋盘背景（网格 + 渐变）并缓存，避免每帧重复绘制
   */
  private buildGridCache(): HTMLCanvasElement {
    const c = document.createElement("canvas");
    c.width = this.boardW;
    c.height = this.boardH;
    const ctx = c.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 0, this.boardH);
    grad.addColorStop(0, "rgba(255,255,255,0.03)");
    grad.addColorStop(1, "rgba(255,255,255,0.01)");
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= this.config.cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * this.config.cellSize + 0.5, 0);
      ctx.lineTo(x * this.config.cellSize + 0.5, this.boardH);
      ctx.stroke();
    }
    for (let y = 0; y <= this.config.rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * this.config.cellSize + 0.5);
      ctx.lineTo(this.boardW, y * this.config.cellSize + 0.5);
      ctx.stroke();
    }
    return c;
  }

  /**
   * 绘制一个圆角格子（带渐变与描边）
   */
  private drawCell(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    glow: string,
    alpha: number,
  ): void {
    const pad = Math.max(2, Math.round(size * 0.08));
    const rx = x + pad;
    const ry = y + pad;
    const w = size - pad * 2;
    const h = size - pad * 2;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = glow || rgba(color, 0.4);
    ctx.shadowBlur = 18;
    const grad = ctx.createLinearGradient(rx, ry, rx + w, ry + h);
    grad.addColorStop(0, rgba(color, 0.92));
    grad.addColorStop(1, rgba(color, 0.62));
    ctx.fillStyle = grad;
    this.roundRect(ctx, rx, ry, w, h, Math.round(size * 0.22));
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1;
    this.roundRect(ctx, rx + 0.5, ry + 0.5, w - 1, h - 1, Math.round(size * 0.22));
    ctx.stroke();
    ctx.restore();
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  /**
   * 计算幽灵落点（一直下落到不能再下）
   */
  public ghostY(board: Board, piece: ActivePiece): number {
    let y = piece.y;
    while (!board.collides(piece, piece.x, y + 1, piece.rotationIndex)) y++;
    return y;
  }

  /**
   * 绘制棋盘、幽灵、当前方块、预览
   */
  public render(board: Board, piece: ActivePiece | null, next: ActivePiece | null): void {
    this.drawBoard(board);
    if (piece) {
      const gy = this.ghostY(board, piece);
      const ghost = piece.clone();
      ghost.y = gy;
      this.drawPiece(ghost, true);
      this.drawPiece(piece, false);
    }
    this.drawNext(next);
  }

  private drawBoard(board: Board): void {
    this.g.clearRect(0, 0, this.boardW, this.boardH);
    this.g.drawImage(this.gridCache, 0, 0);
    board.forEachCell((x, y, cell) => {
      if (!cell) return;
      this.drawCell(
        this.g,
        x * this.config.cellSize,
        y * this.config.cellSize,
        this.config.cellSize,
        cell.color,
        cell.glow,
        1,
      );
    });
  }

  private drawPiece(piece: ActivePiece, ghost: boolean): void {
    const mat = piece.matrix();
    const def = piece.def;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!mat[r][c]) continue;
        const by = piece.y + r;
        if (by < 0) continue;
        const x = (piece.x + c) * this.config.cellSize;
        const y = by * this.config.cellSize;
        this.drawCell(this.g, x, y, this.config.cellSize, def.color, def.glow, ghost ? 0.22 : 1);
      }
    }
  }

  private drawNext(next: ActivePiece | null): void {
    this.n.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
    if (!next) return;
    const mat = next.matrix(0);
    const def = next.def;

    // 计算方块真实边界，确保预览居中
    const bound = { minX: 4, minY: 4, maxX: -1, maxY: -1 };
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!mat[r][c]) continue;
        bound.minX = Math.min(bound.minX, c);
        bound.maxX = Math.max(bound.maxX, c);
        bound.minY = Math.min(bound.minY, r);
        bound.maxY = Math.max(bound.maxY, r);
      }
    }

    const canvasW = this.nextCanvas.width / this.dpr;
    const canvasH = this.nextCanvas.height / this.dpr;
    const boundWCells = bound.maxX - bound.minX + 1;
    const boundHCells = bound.maxY - bound.minY + 1;
    const maxDim = Math.max(boundWCells, boundHCells);
    const minDim = Math.min(canvasW, canvasH);
    const margin = Math.max(4, Math.floor(minDim * 0.08));
    const cell = Math.max(8, Math.floor((minDim - margin * 2) / maxDim));

    const w = (bound.maxX - bound.minX + 1) * cell;
    const h = (bound.maxY - bound.minY + 1) * cell;
    const cx = (canvasW - w) / 2;
    const cy = (canvasH - h) / 2;

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!mat[r][c]) continue;
        const x = cx + (c - bound.minX) * cell;
        const y = cy + (r - bound.minY) * cell;
        this.drawCell(this.n, x, y, cell, def.color, def.glow, 1);
      }
    }
  }
}

function innerWidth(el: HTMLElement): number {
  const style = getComputedStyle(el);
  const pl = Number.parseFloat(style.paddingLeft) || 0;
  const pr = Number.parseFloat(style.paddingRight) || 0;
  return Math.max(0, el.clientWidth - pl - pr);
}

function isMobile(): boolean {
  return window.matchMedia("(max-width: 680px)").matches || window.matchMedia("(pointer: coarse)").matches;
}

function isDisplayed(el: HTMLElement): boolean {
  return getComputedStyle(el).display !== "none";
}
