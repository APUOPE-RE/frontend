import { NewPasswordData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API Base URL:", API_BASE_URL);

export const setNewPassword = async (
	newPasswordData: NewPasswordData
): Promise<ResponseData<string>> => {
	try {
		console.log("Request to:", `${API_BASE_URL}/api/new_password`); // TBD
		console.log("Request body:", {
			email: newPasswordData.email,
			password: newPasswordData.passwordFirst,
		});
		const response = await fetch(`${API_BASE_URL}/api/new_password`, { // TBD
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: newPasswordData.email,
				passwordHash: newPasswordData.passwordFirst,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data: ResponseData<string>) => {
				return data;
			});

		return response;
	} catch (error) {
		console.error("Error during setting new passowrd:", error);
		return { success: false, data: "An error occurred" };
	}
};
