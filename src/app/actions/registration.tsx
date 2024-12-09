import { RegistrationData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (
	registrationData: RegistrationData
): Promise<string | null> => {
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
