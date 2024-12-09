import { ChatBotRequestData, ChatBotResponseData, ConversationData, MessageData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllConversations = async (): Promise<
	ConversationData[]> => {
	try {
		const token = localStorage.getItem("token");
		const response = await fetch(`${API_BASE_URL}/api/conversations`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => {
				return res.json();
			})
			.then((data: ConversationData[]) => {
				return data;
			});
			
		return response;
	} catch (error) {
		console.log("An error occurred: ", error);
    return [];
	}
};

export const fetchConversation = async (
	conversationId: number
): Promise<MessageData[]> => {
	try {
		const token = localStorage.getItem("token");
		const response = await fetch(
			`${API_BASE_URL}/api/conversation/${conversationId}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((data: MessageData[]) => {
				return data;
			});

		return response;
	} catch (error) {
		console.log("An error occurred: ", error);
    return [];
	}
};

export const chatBotRequest = async (
	request: ChatBotRequestData
): Promise<ChatBotResponseData | string> => {
	try {
		const token = localStorage.getItem("token");
		const response = await fetch(`${API_BASE_URL}/api/chatBot`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				conversationId: request.conversationId ?? 0,
				lectureId: request.lectureId,
				data: request.content,
			}),
		})

		if (!response.ok) {
			return response.json().then((data: ResponseData<ChatBotResponseData>) => {
				return data.data;
			});
		} else {
			return "tämäm on virhe"
			/*return response.json().then((data: ResponseData<string>) => {
				return data.data;
			});*/
		}
	} catch (error) {
		console.log("An error occurred: ", error);
    return "";
	}
};
