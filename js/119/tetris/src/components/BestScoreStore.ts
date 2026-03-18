/**
 * 最高分持久化（localStorage）
 */

export class BestScoreStore {
  private readonly key = "tetris_best_vite";

  public load(): number {
    const raw = localStorage.getItem(this.key);
    const v = Number(raw ?? "0");
    return Number.isFinite(v) ? v : 0;
  }

  public save(best: number): void {
    localStorage.setItem(this.key, String(best));
  }
}
