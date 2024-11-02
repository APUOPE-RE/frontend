import { EmailforPassReset, NewPasswordData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const sendResetPasswordLink = async (
	userEmail: EmailforPassReset
): Promise<ResponseData<string>> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/sendResetPasswordLink`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: userEmail.email,
		})

		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		const data: ResponseData<string> = await response.json();
		return data;

	} catch (error) {
		console.error("Error during password reset request:", error);
		return { success: false, data: "An error occurred" };
	}
};

export const resetPassword = async (
	newPasswordData: NewPasswordData
): Promise<ResponseData<string>> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/resetPassword`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uuid: newPasswordData.uuid,
				password: newPasswordData.passwordFirst,
			}),
		})

		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		const data: ResponseData<string> = await response.json();
		return data;

	} catch (error) {
		console.error("Error during password reset request:", error);
		return { success: false, data: "An error occurred" };
	}
};
