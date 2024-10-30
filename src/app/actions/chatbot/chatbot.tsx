const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ChatBotRequestData = {
	user: number;
	data: string;
};

export const chatBotRequest = async (request: ChatBotRequestData) => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/chatBot`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: request.user,
				data: request.data,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				return data;
			});

		return response;
	} catch (error) {
		console.error("Error during login request:", error);
		return { success: false, message: "An error occurred" };
	}
};
