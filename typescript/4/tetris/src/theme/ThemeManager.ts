type ThemeMode = "light" | "dark" | "custom";

type Rgb = { r: number; g: number; b: number };

const MODE_KEY = "tetris_theme_mode";
const COLOR_KEY = "tetris_theme_color";

const DEFAULT_COLOR = "#5cf2c2";

const darkPalette = {
  bg0: "#070a12",
  bg1: "#0b1222",
  bgSpot0: "#101c3b",
  bgSpot1: "#1b1842",
  panel: "rgba(255, 255, 255, 0.16)",
  panelBg: "rgba(10, 16, 34, 0.86)",
  panelSoft: "rgba(10, 16, 34, 0.72)",
  surface: "rgba(0, 0, 0, 0.22)",
  overlayBg: "rgba(3, 6, 14, 0.62)",
  stroke: "rgba(255, 255, 255, 0.16)",
  text: "rgba(255, 255, 255, 0.92)",
  muted: "rgba(255, 255, 255, 0.7)",
  hintText: "rgba(255, 255, 255, 0.7)",
  kbdBg: "rgba(255, 255, 255, 0.05)",
  kbdBorder: "rgba(255, 255, 255, 0.14)",
  kbdText: "rgba(255, 255, 255, 0.82)",
  shadow: "rgba(0, 0, 0, 0.35)",
  topBar: "rgba(7, 10, 18, 0.6)",
  topLink: "rgba(255, 255, 255, 0.84)",
  topLinkBorder: "rgba(255, 255, 255, 0.12)",
  topLinkBg: "rgba(255, 255, 255, 0.04)",
  topLinkHoverBg: "rgba(255, 255, 255, 0.08)",
  topLinkHoverBorder: "rgba(255, 255, 255, 0.2)",
};

const lightPalette = {
  bg0: "#f7f9ff",
  bg1: "#eef2f9",
  bgSpot0: "#ffffff",
  bgSpot1: "#f0f5ff",
  panel: "rgba(10, 16, 34, 0.06)",
  panelBg: "rgba(255, 255, 255, 0.82)",
  panelSoft: "rgba(255, 255, 255, 0.68)",
  surface: "rgba(10, 16, 34, 0.05)",
  overlayBg: "rgba(245, 247, 255, 0.75)",
  stroke: "rgba(10, 16, 34, 0.12)",
  text: "rgba(10, 16, 34, 0.9)",
  muted: "rgba(10, 16, 34, 0.6)",
  hintText: "rgba(10, 16, 34, 0.7)",
  kbdBg: "rgba(10, 16, 34, 0.06)",
  kbdBorder: "rgba(10, 16, 34, 0.2)",
  kbdText: "rgba(10, 16, 34, 0.85)",
  shadow: "rgba(10, 16, 34, 0.12)",
  topBar: "rgba(255, 255, 255, 0.92)",
  topLink: "rgba(10, 16, 34, 0.78)",
  topLinkBorder: "rgba(10, 16, 34, 0.16)",
  topLinkBg: "rgba(10, 16, 34, 0.04)",
  topLinkHoverBg: "rgba(10, 16, 34, 0.08)",
  topLinkHoverBorder: "rgba(10, 16, 34, 0.2)",
};

export class ThemeManager {
  private mode: ThemeMode;
  private customColor: string;

  public constructor() {
    const savedMode = (localStorage.getItem(MODE_KEY) as ThemeMode) || "dark";
    const savedColor = localStorage.getItem(COLOR_KEY) || DEFAULT_COLOR;
    this.mode = this.normalizeMode(savedMode);
    this.customColor = this.normalizeColor(savedColor);
  }

  public getMode(): ThemeMode {
    return this.mode;
  }

  public getCustomColor(): string {
    return this.customColor;
  }

  public setMode(mode: ThemeMode): void {
    this.mode = this.normalizeMode(mode);
    localStorage.setItem(MODE_KEY, this.mode);
    this.apply();
  }

  public setCustomColor(color: string): void {
    this.customColor = this.normalizeColor(color);
    localStorage.setItem(COLOR_KEY, this.customColor);
    if (this.mode === "custom") this.apply();
  }

  public apply(): void {
    const root = document.documentElement;
    const palette = this.buildPalette();
    root.style.setProperty("--bg0", palette.bg0);
    root.style.setProperty("--bg1", palette.bg1);
    root.style.setProperty("--bgSpot0", palette.bgSpot0);
    root.style.setProperty("--bgSpot1", palette.bgSpot1);
    root.style.setProperty("--panel", palette.panel);
    root.style.setProperty("--panelBg", palette.panelBg);
    root.style.setProperty("--panelSoft", palette.panelSoft);
    root.style.setProperty("--surface", palette.surface);
    root.style.setProperty("--overlayBg", palette.overlayBg);
    root.style.setProperty("--stroke", palette.stroke);
    root.style.setProperty("--text", palette.text);
    root.style.setProperty("--muted", palette.muted);
    root.style.setProperty("--hintText", palette.hintText);
    root.style.setProperty("--kbdBg", palette.kbdBg);
    root.style.setProperty("--kbdBorder", palette.kbdBorder);
    root.style.setProperty("--kbdText", palette.kbdText);
    root.style.setProperty("--shadow", palette.shadow);
    root.style.setProperty("--topBar", palette.topBar);
    root.style.setProperty("--topLink", palette.topLink);
    root.style.setProperty("--topLinkBorder", palette.topLinkBorder);
    root.style.setProperty("--topLinkBg", palette.topLinkBg);
    root.style.setProperty("--topLinkHoverBg", palette.topLinkHoverBg);
    root.style.setProperty("--topLinkHoverBorder", palette.topLinkHoverBorder);
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--accent-rgb", palette.accentRgb);
  }

  private buildPalette(): { [k: string]: string } {
    if (this.mode === "light") {
      const accent = "#1f7ae0";
      return {
        ...lightPalette,
        accent,
        accentRgb: toRgbString(parseHex(accent)),
      };
    }

    if (this.mode === "custom") {
      const base = parseHex(this.customColor);
      const bg0 = toCssRgb(mix(base, { r: 7, g: 10, b: 18 }, 0.88));
      const bg1 = toCssRgb(mix(base, { r: 11, g: 18, b: 34 }, 0.9));
      const bgSpot0 = toCssRgb(mix(base, { r: 16, g: 28, b: 59 }, 0.75));
      const bgSpot1 = toCssRgb(mix(base, { r: 27, g: 24, b: 66 }, 0.78));
      const linkBase = toCssRgb(mix(base, { r: 255, g: 255, b: 255 }, 0.65));
      return {
        ...darkPalette,
        bg0,
        bg1,
        bgSpot0,
        bgSpot1,
        panelBg: toCssRgb(mix(base, { r: 10, g: 16, b: 34 }, 0.78)),
        panelSoft: toCssRgb(mix(base, { r: 10, g: 16, b: 34 }, 0.68)),
        surface: "rgba(0, 0, 0, 0.22)",
        overlayBg: "rgba(3, 6, 14, 0.62)",
        hintText: "rgba(255, 255, 255, 0.7)",
        kbdBg: "rgba(255, 255, 255, 0.06)",
        kbdBorder: "rgba(255, 255, 255, 0.18)",
        kbdText: "rgba(255, 255, 255, 0.86)",
        topLink: linkBase,
        topLinkBorder: "rgba(255, 255, 255, 0.18)",
        topLinkBg: "rgba(255, 255, 255, 0.06)",
        topLinkHoverBg: "rgba(255, 255, 255, 0.12)",
        topLinkHoverBorder: "rgba(255, 255, 255, 0.28)",
        accent: this.customColor,
        accentRgb: toRgbString(base),
      };
    }

    const accent = DEFAULT_COLOR;
    return {
      ...darkPalette,
      accent,
      accentRgb: toRgbString(parseHex(accent)),
    };
  }

  private normalizeMode(mode: ThemeMode): ThemeMode {
    if (mode === "light" || mode === "dark" || mode === "custom") return mode;
    return "dark";
  }

  private normalizeColor(color: string): string {
    const hex = color.trim().toLowerCase();
    if (/^#([0-9a-f]{6})$/.test(hex)) return hex;
    return DEFAULT_COLOR;
  }
}

function parseHex(hex: string): Rgb {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 92, g: 242, b: 194 };
  return {
    r: Number.parseInt(m[1], 16),
    g: Number.parseInt(m[2], 16),
    b: Number.parseInt(m[3], 16),
  };
}

function toRgbString(rgb: Rgb): string {
  return `${rgb.r} ${rgb.g} ${rgb.b}`;
}

function toCssRgb(rgb: Rgb): string {
  return `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;
}

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  const clamped = Math.max(0, Math.min(1, t));
  return {
    r: Math.round(a.r * (1 - clamped) + b.r * clamped),
    g: Math.round(a.g * (1 - clamped) + b.g * clamped),
    b: Math.round(a.b * (1 - clamped) + b.b * clamped),
  };
}
