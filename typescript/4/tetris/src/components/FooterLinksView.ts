/**
 * 页脚渲染类（面向对象封装）
 * - 负责把 footerList 渲染成一组链接
 */

import type { FooterItem } from "./types";

export class FooterLinksView {
  private readonly container: HTMLElement;

  public constructor(container: HTMLElement) {
    this.container = container;
  }

  /**
   * 渲染友情链接
   */
  public render(items: FooterItem[]): void {
    const frag = document.createDocumentFragment();
    for (const item of items) {
      const a = document.createElement("a");
      a.textContent = item.text;
      a.href = item.url;

      // 外链在新标签打开；mailto 直接走默认行为
      const isMailto = item.url.startsWith("mailto:");
      if (!isMailto) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      frag.appendChild(a);
    }

    this.container.replaceChildren(frag);
  }
}
