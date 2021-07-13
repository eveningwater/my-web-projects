export type actionType = {
  type: string;
  payload?: number;
};
export type stateType = {
  count: number;
};
export function initOrder(initialCount: number) {
  return { count: initialCount };
}
export function OrderReducer(state: stateType, action: actionType) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initOrder(action.payload ? action.payload : 0);
    default:
      throw new Error();
  }
}
