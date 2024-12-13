import { QuizResultData, QuizSubmitData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchResult = async (submissionPayload: QuizSubmitData): Promise<QuizResultData | string> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/submitQuiz`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionPayload),
      credentials: "include",
    })
    .then((res) => {
      return res.json();
    })
    .then((data: ResponseData<QuizResultData | string>) => {
      return data;
    });

		if (response.success) {
			return response.data as QuizResultData;
		} else {
			return response.data as string;
		}
  } catch (error) {
		console.log("An error occurred: ", error);
    return "An error occurred. Please, try again.";
  }
};
