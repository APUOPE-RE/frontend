const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type UserCredentials = {
	email: string;
	passwordHash: string;
};

export const validateUser = async (userCredentials: UserCredentials) => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/Login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userCredentials.email,
				passwordHash: userCredentials.passwordHash,
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
