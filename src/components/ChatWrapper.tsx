"use client";

import { useChat } from "ai/react";
import React from "react";

const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
  const { messages, handleSubmit, handleInputChange, input } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
  });
  return (
    <div className="relaltive min-h-full w-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
        {JSON.stringify(messages)}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type="text"
          value={input}
          className="text-black"
        />
        <button type="submit" className="text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWrapper;
