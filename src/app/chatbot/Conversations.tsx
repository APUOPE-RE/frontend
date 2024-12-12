import React, { Dispatch, SetStateAction } from "react";
import { useAppContext } from "@/src/context";
import { ChatBotRequestData, Message } from "../types/types";
import { fetchConversation } from "../actions/chatbot";
import { UseFormSetValue } from "react-hook-form";
import ChatOptions from "@/src/components/ChatOptions";

enum Source {
  USER = 1,
  BOT = 2,
}

type ConversationsProps = {
  currentConversation: number;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setValue: UseFormSetValue<ChatBotRequestData>;
};

export const Conversations = ({
  currentConversation,
  setMessages,
  setValue,
}: ConversationsProps) => {
  const { conversations, materials } = useAppContext();

  const filterSubject = (id: number) => {
    return materials.find((m) => m.id === id);
  };

  const fetchMessages = async (conversationId: number) => {
    if (conversationId !== currentConversation) {
      setValue("conversationId", conversationId);
      setValue("lectureId", 0);
      const response = await fetchConversation(conversationId);
      if (Array.isArray(response)) {
        const messages: Message[] = response.map((m) => ({
          from: m.source === Source.USER ? "user" : "bot",
          message: m.content,
        }));
        setMessages(messages);
      }
    }
  };

  return (
    <>
      {conversations.map((c) => {
        return (
          <div
            key={c.id}
            className={`relative w-[99%] h-20 border p-2 border-none rounded-lg mb-2 shadow-md hover:bg-blue-100 cursor-pointer ${
              currentConversation === c.id ? "bg-blue-100" : "bg-gray-100"
            }`}
            onClick={() => fetchMessages(c.id)}
          >
            <span className="absolute top-2 right-2 text-xs">
              {new Date(c.dateTime).toLocaleDateString()}
            </span>
            <div className="h-full flex items-center justify-between">
              <p>{c.subject}</p>
              {currentConversation === c.id && (
                <ChatOptions conversation={c} setValue={setValue} />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
