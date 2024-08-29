"use client";

import { Message, useChat } from "ai/react";
import React from "react";
import Messages from "./Messages";
import { ChatInput } from "./ChatInput";

const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { messages, handleSubmit, handleInputChange, input, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages,
    });
  return (
    <div className="relaltive min-h-full w-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
        <Messages messages={messages} />
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSumit={handleSubmit}
        setInput={setInput}
      />
    </div>
  );
};

export default ChatWrapper;
