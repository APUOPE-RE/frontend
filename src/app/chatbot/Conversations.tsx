import React, { Dispatch, SetStateAction } from "react";
import { useAppContext } from "@/src/context";
import { ChatBotRequestData, Message } from "../types/types";
import { fetchConversation } from "../actions/chatbot";
import { UseFormSetValue } from "react-hook-form";

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
			setValue("conversationId", 0);
			setValue("chapterId", 0);
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
					<button
						key={c.id}
						className="w-[99%] h-20 border p-2 bg-white border-gray-300 rounded-lg mb-2 hover:bg-blue-100"
						onClick={() => fetchMessages(c.id)}
					>
						<p className="text-xs text-right">
							{new Date(c.dateTime).toLocaleDateString()}
						</p>
						<p className="pt-3 text-left">
							{
								filterSubject(c.chapterId > 0 ? c.chapterId : 1)
									?.value
							}
						</p>
					</button>
				);
			})}
		</>
	);
};
