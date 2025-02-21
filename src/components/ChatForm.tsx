import React, { useState } from "react";
import { Chat } from "../Types/types";

function ChatForm({
  setChatHistory,
  generateBotResponse,
  chatHistory,
}: {
  readonly setChatHistory: React.Dispatch<React.SetStateAction<Chat[]>>;
  readonly generateBotResponse: (history: Chat[]) => void;
  readonly chatHistory: Chat[];
}) {
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    setChatHistory((prev) => [...prev, { text: message, role: "user" }]);
    setMessage("");

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { text: "Thinking...", role: "model" },
      ]);
      generateBotResponse([
        ...chatHistory,
        {
          text: `Using the details provided above, please address this query: ${message}`,
          role: "user",
        },
      ]);
    }, 400);
  };

  return (
    <form
      action=""
      className="flex items-center bg-white rounded-4xl outline-[#CCCCE5] outline-1 focus-within:outline-2 focus-within:outline-[#6D4FC2] focus-within:shadow-md transition-all duration-200 ease-in-out"
      onSubmit={handleFormSubmit}>
      <input
        className="w-full border-none h-[47px] px-4 py-4 outline-none"
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button
        type="submit"
        className="material-symbols-rounded size-9 border-none outline-none cursor-pointer text-xl text-white shrink-0 mr-1.5 rounded-[50%] bg-[#6D4FC2] hover:bg-[#593bab] transition-all duration-200 ease-in-out">
        arrow_upward
      </button>
    </form>
  );
}

export default ChatForm;
