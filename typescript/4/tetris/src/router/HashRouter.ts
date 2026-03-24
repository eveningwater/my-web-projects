/**
 * Hash 路由（默认模式）
 * - 通过监听 hashchange 实现前端路由
 * - 路由形态：#/home、#/about
 */

export interface View {
  /**
   * 挂载页面内容到容器
   */
  mount(container: HTMLElement): void;

  /**
   * 可选：卸载页面，释放事件与资源
   */
  unmount?(): void;
}

export type RouteFactory = () => View;

export class HashRouter {
  private readonly outlet: HTMLElement;
  private readonly routes: Record<string, RouteFactory>;
  private readonly defaultPath: string;

  private currentView: View | null = null;
  private readonly onHashChange: () => void;

  public constructor(options: { outlet: HTMLElement; routes: Record<string, RouteFactory>; defaultPath: string }) {
    this.outlet = options.outlet;
    this.routes = options.routes;
    this.defaultPath = options.defaultPath;
    this.onHashChange = () => this.renderCurrent();
  }

  /**
   * 启动路由
   */
  public start(): void {
    window.addEventListener("hashchange", this.onHashChange);
    if (!location.hash) {
      this.navigate(this.defaultPath);
      return;
    }
    this.renderCurrent();
  }

  /**
   * 停止路由（通常不需要调用，除非做热替换/卸载 App）
   */
  public stop(): void {
    window.removeEventListener("hashchange", this.onHashChange);
    this.unmountCurrent();
  }

  /**
   * 跳转到指定路径
   */
  public navigate(path: string): void {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    location.hash = `#${normalized}`;
  }

  /**
   * 获取当前路由 path（去掉 #）
   */
  public currentPath(): string {
    const raw = location.hash.replace(/^#/, "");
    return raw || this.defaultPath;
  }

  private routeKeyFromPath(path: string): string {
    const normalized = path.replace(/^\/+/, "");
    const key = normalized.split("?")[0].split("#")[0];
    return key || this.defaultPath.replace(/^\/+/, "");
  }

  private renderCurrent(): void {
    const path = this.currentPath();
    const key = this.routeKeyFromPath(path);
    const factory = this.routes[key];
    if (!factory) {
      this.navigate(this.defaultPath);
      return;
    }

    this.unmountCurrent();
    this.outlet.replaceChildren();
    const view = factory();
    this.currentView = view;
    view.mount(this.outlet);
  }

  private unmountCurrent(): void {
    if (!this.currentView) return;
    if (this.currentView.unmount) this.currentView.unmount();
    this.currentView = null;
  }
}
