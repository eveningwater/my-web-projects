// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
export const scale = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) => ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
export const getStyle = (el: HTMLElement, prop: string) =>
  window.getComputedStyle(el).getPropertyValue(prop);
