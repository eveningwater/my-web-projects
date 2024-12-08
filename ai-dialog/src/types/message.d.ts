export interface Message {
  messageId?: number;
  name: string;
  text: string;
  timestamp: number;
  type?: string;
  isEnd?: boolean;
  isNext?: boolean;
}
