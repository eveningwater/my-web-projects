import Mock from "mockjs";
import { Message } from "../types/message";
import dayjs from "dayjs";

const generateMessage = () => {
  const messages = ["你好!", "你好吗?", "我能为你做什么?", "再见!"];
  const names = ["夕水", "机器人-毛毛"];

  return Mock.mock({
    "messages|5": [
      {
        "name|1": names,
        "text|1": messages,
        timestamp: "@datetime",
      },
    ],
  });
};

export const getMockMessages = () => {
  return generateMessage().messages.map((message: Message, index: number) => ({
    ...message,
    timestamp: dayjs(message.timestamp).unix() * 1000,
    isEnd: false,
    messageId: index + 1,
  }));
};
