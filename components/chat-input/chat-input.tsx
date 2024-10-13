import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Input
        maxLength={255}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Whats on your mind?"
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md"
      />
      <Button
        variant={"default"}
        onClick={sendMessage}
        className="ml-4 px-4 py-2"
      >
        Shout
      </Button>
    </div>
  );
};

export default React.memo(ChatInput);
