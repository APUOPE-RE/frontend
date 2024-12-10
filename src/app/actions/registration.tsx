import { RegistrationData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (
	registrationData: RegistrationData
): Promise<ResponseData<string>> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: registrationData.email,
				username: registrationData.username,
				passwordHash: registrationData.passwordFirst,
			}),
		})
		.then((res) => {
      return res.json();
    })
    .then((data: ResponseData<Object>) => {
      return data;
    });

		return response as ResponseData<string>;
	} catch (error) {
		console.log("An error occurred: ", error);
		return { success: false, data: "An error occurred. Please, try again."};
	}
};
