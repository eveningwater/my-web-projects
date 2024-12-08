import { Message } from "../types/message";

export const groupByInterval = (
  arr: Message[],
  filterFn = (item: Message) => item.isEnd
) => {
  if (arr.length === 0) {
    return [arr];
  }

  const result: Message[][] = [[arr[0]]];
  for (let i = 1; i < arr.length; i++) {
    const item = arr[i];
    if (filterFn(item)) {
      result.push([item]);
    } else {
      result[result.length - 1].push(item);
    }
  }

  return result;
};

export enum parseStrType {
  EVAL = "eval",
  JSON = "json",
}
export const parseStr = <T>(
  str: string,
  type: parseStrType = parseStrType.JSON
) => {
  const parseMethod = {
    [parseStrType.EVAL]: <T>(v: string): T => new Function(`return ${v}`)(),
    [parseStrType.JSON]: JSON.parse,
  };
  let res: T | null = null;
  try {
    const method = parseMethod[type];
    if (method) {
      res = method(str);
    }
  } catch (error) {
    console.error(`[parse data error]:${error}`);
  }
  return res;
};

export const isValidJSON = (val: string) => {
  try {
    const res = JSON.parse(val);
    return res !== null;
  } catch (error) {
    console.log("isValidJSON:", error);
    return false;
  }
};

export const mergeMessagesByType = <T extends Message>(arr: T[]) => {
  const stepMerge = (arr: T[], filterFn: (item: T) => boolean) => {
    const temp: Record<
      string,
      Omit<Message, "name" | "timestamp"> | number | string | boolean
    > = {};
    let orderTypeId = -1;
    const result: T[] = [];

    arr.forEach((item, index) => {
      const {
        name,
        timestamp,
        isEnd,
        isNext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        messageId,
        type = "message",
        ...rest
      } = item;
      if (filterFn(item)) {
        temp[type] = { type, ...rest };
        temp.name = name;
        temp.timestamp = timestamp;
        temp.isEnd = isEnd || false;
        temp.isNext = isNext || false;
        temp.type = type;
        if (orderTypeId === -1) {
          orderTypeId = arr[Math.max(index - 1, 0)].messageId as number;
        }
      } else {
        result.push(item);
      }
    });

    if (Object.keys(temp).length > 0) {
      const spliceIndex = result.findIndex(
        (item) => item.messageId === orderTypeId
      );
      result.splice(spliceIndex + 1, 0, {
        ...temp,
        messageId: orderTypeId,
      } as T);
    }
    return result.map((item, index) => ({ ...item, messageId: index + 1 }));
  };

  return stepMerge(arr, (item) => item?.type === "message");
};
