import { EmailforPassReset, NewPasswordData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const sendResetPasswordLink = async (
	userEmail: EmailforPassReset
): Promise<ResponseData<Object>> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/sendResetPasswordLink`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: userEmail.email,
		})
		.then((res) => {
      return res.json();
    })
    .then((data: ResponseData<Object>) => {
      return data;
    });

    return response;
	} catch (error) {
		return { success: false, data: "An error occurred" };
	}
};

export const resetPassword = async (
	newPasswordData: NewPasswordData
): Promise<string | null> => {
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
		.then((res) => {
      return res.json();
    })
    .then((data: ResponseData<Object>) => {
      return data;
    });

		if (response.success) {
			return response.data as string;
		} else {
			// set error here
    return null;
		}
	} catch (error) {
		console.log("An error occurred: ", error);
    return null;
	}
};
