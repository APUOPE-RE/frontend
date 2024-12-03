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
  setCurrentConversationId: Dispatch<SetStateAction<number>>;
};

export const Conversations = ({
  currentConversation,
  setMessages,
  setValue,
  setCurrentConversationId,
}: ConversationsProps) => {
  const { conversations, materials } = useAppContext();

  const filterSubject = (id: number) => {
    return materials.find((m) => m.id === id);
  };

  const fetchMessages = async (conversationId: number) => {
    if (conversationId !== currentConversation) {
      setValue("conversationId", 0);
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
            className="relative w-[99%] h-20 border p-2 border-none rounded-lg mb-2 bg-gray-100 shadow-md hover:bg-blue-100 cursor-pointer"
            onClick={() => {
              setCurrentConversationId(c.id);
              fetchMessages(c.id);
            }}
          >
            <span className="absolute top-2 right-2 text-xs">
              {new Date(c.dateTime).toLocaleDateString()}
            </span>
            <div className="h-full flex items-center justify-between">
              <p>{filterSubject(c.chapterId > 0 ? c.chapterId : 1)?.label}</p>
              {console.log(c.id, currentConversation)}
              {currentConversation === c.id && <ChatOptions conversation={c} />}
            </div>
          </div>
        );
      })}
    </>
  );
};
