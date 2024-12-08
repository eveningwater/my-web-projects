import { Message } from "../types/message";
import { parseStr } from "../utils/utils";
import { fetchEventSource } from "@microsoft/fetch-event-source";
export const getChatbotResponse = async <T extends Message>(
  message: string,
  callback: (data: T) => void
) => {
  const ctrl = new AbortController();
  return new Promise<T[]>((resolve, reject) => {
    const messages: Message[] = [];
    fetchEventSource(`http://localhost:3000/events`, {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: ctrl.signal,
      onmessage(event) {
        const data = parseStr<T>(event.data);
        if (data) {
          messages.push(data);
          callback?.(data);
        }
      },
      onerror(error) {
        ctrl.abort();
        reject(error);
      },
      onclose() {
        ctrl.abort();
        resolve(messages as T[]);
      },
    });
  });
};
