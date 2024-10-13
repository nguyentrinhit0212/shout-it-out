import ChatInput from "@/components/chat-input/chat-input";
import ChatMessage from "@/components/chat-message/chat-message";
import DisplayNameModal from "@/components/display-name-modal/display-name-modal";
import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  id: number;
  msg: string;
  top: number;
  user: string;
}

let socket: Socket;

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("displayName");
    if (storedName) {
      setDisplayName(storedName);
    }

    socket = io();

    socket.on("receiveMessage", (msg: string, user: string) => {
      const newMessage = {
        id: Date.now(),
        msg,
        top: Math.random() * 80,
        user,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (message: string) => {
    if (displayName) {
      console.log(displayName);
      socket.emit("sendMessage", message, displayName);
    }
  };

  const handleRemoveMessage = (id: number) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  const handleSetDisplayName = (name: string) => {
    setDisplayName(name);
    localStorage.setItem("displayName", name);
  };

  return (
    <div className="flex flex-col h-screen">
      {!displayName && (
        <DisplayNameModal onSetDisplayName={handleSetDisplayName} />
      )}{" "}
      <div className="relative w-full flex-grow h-[70%] overflow-hidden">
        {messages.map((msgObj) => (
          <ChatMessage
            key={msgObj.id}
            msg={msgObj.msg}
            top={msgObj.top}
            user={msgObj.user}
            onRemove={() => handleRemoveMessage(msgObj.id)}
          />
        ))}
      </div>
      {displayName && (
        <div className="flex-shrink-0 p-4 flex justify-center">
          <div className="w-full">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  );
}
