import { EmailforPassReset, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const verifyEmail = async (
	userEmail: EmailforPassReset
): Promise<ResponseData<string>> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/verify_email`, { // TBD
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userEmail.email,
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
