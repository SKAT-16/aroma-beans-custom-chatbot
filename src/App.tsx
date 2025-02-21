import React, { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { Chat } from "./Types/types";
import { companyInfo } from "./components/CompanyInfo";

function App() {
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    { role: "model", text: companyInfo, hidden: true },
  ]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [showChatBot, setChatBot] = useState(false);

  const generateBotResponse = async (history: Chat[]) => {
    const contents = history.map((h: Chat) => ({
      role: h.role,
      parts: [{ text: h.text }],
    }));

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, reqOptions);
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong!");

      const responseText = data.candidates[0].content.parts[0].text
        .replace(/\n/g, "")
        .trim();
      updateHistory(responseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  const updateHistory = (text: string, isError = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg: Chat) => msg.text !== "Thinking..."),
      { role: "model", text, isError },
    ]);

    console.log(isError);
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="sm:relative static">
      <button
        onClick={() => setChatBot(!showChatBot)}
        className="fixed bottom-8 right-9 bg-[#6D4fc2] rounded-full flex items-center cursor-pointer justify-center size-12 transition-all duration-200">
        <span
          className={`material-symbols-rounded absolute text-white transition-all duration-200 ${
            showChatBot && "opacity-0 rotate-90"
          }`}>
          mode_comment
        </span>
        <span
          className={`material-symbols-rounded absolute text-white transition-all duration-200 ${
            showChatBot ? "inline" : "hidden"
          }`}>
          close
        </span>
      </button>
      <div
        className={`bg-white w-full md:w-[420px] h-screen md:h-fit md:fixed ${
          !showChatBot && "scale-[0.2] opacity-0 pointer-events-none"
        } bottom-24 right-9 md:rounded-[15px] shadow-md overflow-hidden origin-bottom-right scale-100 transition-all duration-100 ease-in-out`}>
        {/* Chat Header */}
        <header className="bg-[#6d4fc2] fill-[#6d4fc2] shrink-0 flex items-center justify-between px-4 py-3">
          <div className="flex gap-3 items-center">
            <ChatbotIcon className="h-[35px] w-[35px] p-1.5 bg-white rounded-[50%]" />
            <h2 className="text-white text-2xl font-semibold">Chatbot</h2>
          </div>
          <button
            onClick={() => setChatBot(false)}
            className="material-symbols-rounded h-10 w-10 cursor-pointer text-white hover:bg-[#593bab] rounded-[50%] transition-all duration-200 ease-in-out">
            keyboard_arrow_down
          </button>
        </header>

        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="md:h-[460px] h-full mb-20 overflow-auto px-6 pt-5 pb-40 md:pb-5 flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <ChatbotIcon className="h-[35px] w-[35px] p-1.5 fill-white bg-[#6D4FC2] mb-0.5 self-end rounded-[50%]" />
            <p className="px-3 py-4 max-w-[75%] bg-[#F6F2FF] rounded-lg break-words whitespace-pre-line">
              Hey there 👋
              <br /> How can i help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chat Footer */}
        <div className="absolute bottom-0 left-0 px-5 pt-4 pb-5 bg-white w-full">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
