import React from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";

function App() {
  return (
    <div>
      <div className="bg-white w-[420px] relative rounded-[15px] shadow-md overflow-hidden">
        {/* Chat Header */}
        <header className="bg-[#6d4fc2] fill-[#6d4fc2] shrink-0 flex items-center justify-between px-4 py-3">
          <div className="flex gap-3 items-center">
            <ChatbotIcon className="h-[35px] w-[35px] p-1.5 bg-white rounded-[50%]" />
            <h2 className="text-white text-2xl font-semibold">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded h-10 w-10 cursor-pointer text-white hover:bg-[#593bab] rounded-[50%] transition-all duration-200 ease-in-out">
            keyboard_arrow_down
          </button>
        </header>

        {/* Chat Body */}
        <div className="h-[460px] mb-20 overflow-auto px-6 py-5 flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <ChatbotIcon className="h-[35px] w-[35px] p-1.5 fill-white bg-[#6D4FC2] mb-0.5 self-end rounded-[50%]" />
            <p className="px-3 py-4 max-w-[75%] bg-[#F6F2FF] rounded-lg break-words whitespace-pre-line">
              Hey there 👋
              <br /> How can i help you today?
            </p>
          </div>

          <div className="flex-col flex items-end">
            <p className="px-3 py-4 max-w-[75%] bg-[#6D4FC2] text-white rounded-2xl rounded-br-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              sint eligendi voluptate nisi consequatur!
            </p>
          </div>
        </div>

        {/* Chat Footer */}
        <div className="absolute bottom-0 left-0 px-5 pt-4 pb-5 bg-white w-full">
          <ChatForm />
        </div>
      </div>
    </div>
  );
}

export default App;
