import { RenderType } from "../const";
import { Message } from "../types/message";

export interface RenderContentProps {
  type?: string;
  text?: string;
  message?: Message;
}
export const RenderContent = ({ text, message }: RenderContentProps) => {
  if (
    typeof message === "object" &&
    message !== null &&
    message?.type === RenderType.MESSAGE
  ) {
    return <>{message?.text}</>;
  }
  return <>{text}</>;
};
