import { ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const verifyAccount = async (
	uuid: string
): Promise<string | null> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/verify/${uuid}`, {
			method: "GET",
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
