import ChatbotIcon from "./ChatbotIcon";
import { Chat } from "../Types/types";

function ChatMessage({ chat }: { readonly chat: Chat }) {
  return chat.role === "user" ? (
    <div className="flex-col flex items-end">
      <p className="px-3 py-4 max-w-[75%] bg-[#6D4FC2] text-white rounded-2xl rounded-br-xs">
        {chat.text}
      </p>
    </div>
  ) : (
    !chat?.hidden && (
      <div
        className={`flex gap-3 items-center ${
          chat?.isError && "opacity-50 text-red-700"
        }`}>
        <ChatbotIcon className="h-[35px] w-[35px] p-1.5 fill-white bg-[#6D4FC2] mb-0.5 self-end rounded-[50%]" />
        <p className="px-3 py-4 max-w-[75%] bg-[#F6F2FF] rounded-lg break-words whitespace-pre-line">
          {chat.text}
        </p>
      </div>
    )
  );
}

export default ChatMessage;
