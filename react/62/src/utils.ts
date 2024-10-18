export const isEmptyObject = (val: unknown) => {
    if (val === null || val === undefined) return true;
    if (typeof val !== 'object') return true;
    if (Array.isArray(val)) return val.length === 0;
    return Object.keys(val).length === 0;
};

export const debounce = <T extends any[]>(handler: (...args: T) => void, ms: number): ((...args: T) => void) => {
    let time: ReturnType<typeof setTimeout> | null = null;
    return function fn(this: typeof fn,...args: T) {
      time && clearTimeout(time);
      time = setTimeout(() => handler.apply(this, args), ms);
    };
  };
  