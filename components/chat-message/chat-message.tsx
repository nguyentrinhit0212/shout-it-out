import React from "react";
import styles from "./chat-message.module.css";

interface ChatMessageProps {
  msg: string;
  top: number;
  user: string; // Tên người dùng gửi tin nhắn
  onRemove: () => void;
}

const ChatMessage = React.memo(
  ({ msg, top, user, onRemove }: ChatMessageProps) => {
    const handleAnimationEnd = () => {
      onRemove();
    };

    return (
      <div
        className={`${styles.message} absolute`}
        style={{
          top: `${top}%`,
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        <strong>{user}:</strong> {msg}
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
