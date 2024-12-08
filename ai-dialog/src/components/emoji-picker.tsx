import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export const EmojiPicker: React.FC<{ onSelect: (emoji: string) => void }> = ({
  onSelect,
}) => {
  return (
    <Picker
      data={data}
      onEmojiSelect={(emoji: { native: string }) => onSelect(emoji.native)}
    />
  );
};
