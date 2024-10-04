import { RegistrationData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (registrationData: RegistrationData): Promise<ResponseData<string>> => {
	try {
        console.log(registrationData)
		const response = await fetch(`${API_BASE_URL}/api/Register`, {
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
			.then((data: ResponseData<string>) => {
				console.log(data)
				return data;
			});

		return response;
	} catch (error) {
		console.error("Error during registration:", error);
		return { success: false, data: "An error occurred" };
	}
};
