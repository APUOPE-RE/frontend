import { ChatBotRequestData, ChatBotResponseData, ConversationData, MessageData, ResponseData } from "../../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const fetchAllConversations = async (): Promise<ResponseData<ConversationData | string>> => {
	try {
        const token = localStorage.getItem("token");
		const response = await fetch(`${API_BASE_URL}/api/conversations`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
            	"Content-Type": "application/json",
			},
			credentials: 'include',
		})
			.then((res) => {
				return res.json();
			})
			.then((data: ResponseData<ConversationData>) => {
				return data;
			});

		return response;
	} catch (error) {
		console.error("Error during conversation fetch:", error);
		return { success: false, data: "An error occurred" };
	}
};

export const fetchConversation = async (conversationId: number): Promise<ResponseData<MessageData | string>> => {
	try {
        const token = localStorage.getItem("token");
		const response = await fetch(`${API_BASE_URL}/api/conversation/${conversationId}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
            	"Content-Type": "application/json",
			},
			credentials: 'include',
		})
			.then((res) => {
				return res.json();
			})
			.then((data: ResponseData<MessageData>) => {
				return data;
			});

		return response;
	} catch (error) {
		console.error("Error during conversation fetch:", error);
		return { success: false, data: "An error occurred" };
	}
};

export const chatBotRequest = async (request: ChatBotRequestData): Promise<ResponseData<ChatBotResponseData | string>> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/chatBot`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: 1,
				conversationId: 0,
				chapterId: 0,
				data: request.content,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data: ResponseData<ChatBotResponseData>) => {
				return data;
			});

		return response;
	} catch (error) {
		console.error("Error during chatbot request:", error);
		return { success: false, data: "An error occurred" };
	}
};
