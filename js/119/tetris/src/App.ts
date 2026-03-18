/**
 * 应用主类
 * - 负责初始化路由与导航高亮
 * - 页面本身的实现放在 src/views
 */

import { HashRouter } from "./router/HashRouter";
import { AboutView } from "./views/AboutView";
import { HomeView } from "./views/HomeView";

export class App {
  private router: HashRouter | null = null;
  private readonly onHashChange: () => void;

  public constructor() {
    this.onHashChange = () => this.updateNavActive();
  }

  /**
   * 启动应用
   */
  public init(): void {
    const outlet = document.getElementById("app");
    if (!outlet) throw new Error("找不到路由出口 #app");

    this.router = new HashRouter({
      outlet,
      defaultPath: "/home",
      routes: {
        home: () => new HomeView(),
        about: () => new AboutView(),
      },
    });

    this.router.start();
    this.updateNavActive();
    window.addEventListener("hashchange", this.onHashChange);
  }

  private updateNavActive(): void {
    const hash = location.hash.replace(/^#\/?/, "");
    const key = (hash.split("?")[0].split("#")[0] || "home").trim();
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a.topLink[data-route]'));
    for (const link of links) {
      const route = link.dataset.route;
      link.classList.toggle("active", route === key);
    }
  }
}

