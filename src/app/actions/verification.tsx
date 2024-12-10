import { ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const verifyAccount = async (
	uuid: string
): Promise<ResponseData<string>> => {
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

		return response as ResponseData<string>;
	} catch (error) {
		console.log("An error occurred: ", error);
    return { success: false, data: "An error occurred. Please, try again." };
	}
};
