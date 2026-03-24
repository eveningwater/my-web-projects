export class HeaderToggle {
  private header: HTMLElement | null = null;
  private toggleBtn: HTMLButtonElement | null = null;
  private collapsed = false;
  private lastMobile = false;

  public init(): void {
    this.header = document.querySelector<HTMLElement>(".topBar");
    this.toggleBtn = document.getElementById("topBarToggle") as HTMLButtonElement | null;
    if (!this.header || !this.toggleBtn) return;

    const isMobile = this.isMobile();
    this.lastMobile = isMobile;
    this.setCollapsed(isMobile);

    this.toggleBtn.addEventListener("click", () => {
      this.setCollapsed(!this.collapsed);
      window.dispatchEvent(new Event("resize"));
    });

    window.addEventListener("resize", () => {
      const nowMobile = this.isMobile();
      if (nowMobile !== this.lastMobile) {
        this.lastMobile = nowMobile;
        if (nowMobile) this.setCollapsed(true);
        else this.setCollapsed(false);
      }
    });
  }

  private setCollapsed(collapsed: boolean): void {
    if (!this.header || !this.toggleBtn) return;
    this.collapsed = collapsed;
    this.header.classList.toggle("collapsed", collapsed);
    this.toggleBtn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    this.toggleBtn.setAttribute("aria-label", collapsed ? "展开导航" : "折叠导航");
    this.toggleBtn.textContent = collapsed ? "菜单" : "收起";
  }

  private isMobile(): boolean {
    return window.matchMedia("(max-width: 680px)").matches || window.matchMedia("(pointer: coarse)").matches;
  }
}
