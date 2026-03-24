import { ThemeManager } from "./ThemeManager";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/nano.min.css";

export class ThemeControls {
  private readonly manager: ThemeManager;

  public constructor(manager?: ThemeManager) {
    this.manager = manager ?? new ThemeManager();
  }

  public init(): void {
    const selectRoot = document.getElementById("themeSelect") as HTMLDivElement | null;
    const selectBtn = document.getElementById("themeSelectBtn") as HTMLButtonElement | null;
    const selectList = document.getElementById("themeSelectList") as HTMLDivElement | null;
    const selectOptions = Array.from(document.querySelectorAll<HTMLButtonElement>(".themeSelectOption"));
    const colorButton = document.getElementById("themeColorBtn") as HTMLDivElement | null;
    const colorWrap = document.getElementById("themeColorWrap") as HTMLDivElement | null;
    if (!selectRoot || !selectBtn || !selectList || selectOptions.length === 0 || !colorButton || !colorWrap) {
      this.manager.apply();
      return;
    }

    const pickr = Pickr.create({
      el: colorButton,
      theme: "nano",
      default: this.manager.getCustomColor(),
      useAsButton: true,
      components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: {
          hex: true,
          rgba: false,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: true,
          clear: false,
          save: true,
        },
      },
    });

    const setPickrColor = (hex: string): void => {
      pickr.setColor(hex, true);
    };

    pickr.on("change", (color: Pickr.HSVaColor | null) => {
      if (!color) return;
      const hex = color.toHEXA().toString();
      this.manager.setCustomColor(hex);
    });

    pickr.on("save", (color: Pickr.HSVaColor | null) => {
      if (!color) return;
      const hex = color.toHEXA().toString();
      this.manager.setCustomColor(hex);
      pickr.hide();
    });

    const applyMode = (mode: "light" | "dark" | "custom"): void => {
      this.manager.setMode(mode);
      selectBtn.textContent = mode === "custom" ? "自定义" : mode;
      for (const option of selectOptions) {
        option.classList.toggle("active", option.dataset.value === mode);
        option.setAttribute("aria-selected", option.dataset.value === mode ? "true" : "false");
      }
      this.toggleColorWrap(colorWrap, mode === "custom");
      if (mode === "custom") {
        setPickrColor(this.manager.getCustomColor());
      } else {
        pickr.hide();
      }
    };

    const currentMode = this.manager.getMode();
    applyMode(currentMode);
    setPickrColor(this.manager.getCustomColor());

    const close = (): void => {
      selectRoot.classList.remove("open");
      selectBtn.setAttribute("aria-expanded", "false");
    };

    const toggle = (): void => {
      const open = !selectRoot.classList.contains("open");
      selectRoot.classList.toggle("open", open);
      selectBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };

    selectBtn.addEventListener("click", toggle);
    selectOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const mode = option.dataset.value as "light" | "dark" | "custom";
        applyMode(mode);
        close();
      });
    });

    window.addEventListener("click", (event) => {
      if (!selectRoot.contains(event.target as Node)) close();
    });

    window.addEventListener("storage", () => {
      setPickrColor(this.manager.getCustomColor());
    });
  }

  private toggleColorWrap(el: HTMLElement, show: boolean): void {
    el.classList.toggle("show", show);
  }
}
