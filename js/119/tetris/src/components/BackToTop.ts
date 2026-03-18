export class BackToTop {
  private button: HTMLButtonElement | null = null;
  private readonly onScroll: () => void;
  private readonly onClick: () => void;

  public constructor() {
    this.onScroll = () => {
      if (!this.button) return;
      this.button.classList.toggle("show", window.scrollY > 320);
    };
    this.onClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  public init(): void {
    if (this.button) return;
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.className = "backToTop";
    this.button.setAttribute("aria-label", "回到顶部");
    this.button.textContent = "↑";
    document.body.appendChild(this.button);
    this.button.addEventListener("click", this.onClick);
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.onScroll();
  }
}
