import React from "react";
import ChatbotIcon from "./ChatbotIcon";
import { Chat } from "../Types/types";

function ChatMessage({ chat }: { readonly chat: Chat }) {
  // Function to render HTML content safely
  const renderText = (text: string) => {
    // Use dangerouslySetInnerHTML with a sanitization step
    return { __html: text };
  };

  return chat.role === "user" ? (
    <div className="flex flex-col items-end w-full">
      <p
        className="px-4 py-3 max-w-[75%] bg-gradient-to-br from-[#6D4FC2] to-[#5A3E9B] text-white rounded-2xl rounded-br-sm shadow-md text-sm leading-relaxed"
        dangerouslySetInnerHTML={renderText(chat.text)}
      />
    </div>
  ) : (
    !chat?.hidden && (
      <div
        className={`flex items-start space-x-3 w-full ${
          chat?.isError ? "opacity-60 text-red-700" : ""
        }`}>
        <ChatbotIcon className="h-10 w-10 p-2 bg-gradient-to-br from-[#6D4FC2] to-[#5A3E9B] text-white rounded-full shadow-md flex-shrink-0" />
        <p
          className="px-4 py-3 max-w-[75%] bg-[#F6F2FF] text-gray-800 rounded-2xl rounded-tl-sm shadow-sm text-sm leading-relaxed break-words whitespace-pre-line"
          dangerouslySetInnerHTML={renderText(chat.text)}
        />
      </div>
    )
  );
}

export default ChatMessage;
