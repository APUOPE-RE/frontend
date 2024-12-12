import { UserCredentials, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const validateUser = async (
	userCredentials: UserCredentials
): Promise<ResponseData<string>> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userCredentials.email,
				passwordHash: userCredentials.passwordHash,
			}),
		});

		return response.json().then((data: ResponseData<string>) => {
			return data;
		});
	} catch (error) {
		console.log("An error occurred: ", error);
    return { success: false, data: "An error occurred. Please, try again."};
	}
};
