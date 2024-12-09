import { QuizData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchQuiz = async (lectureId: number | null): Promise<QuizData | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/generateQuiz/${lectureId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
       credentials: "include",
    })
    .then((res) => {
      return res.json();
    })
    .then((data: ResponseData<Object>) => {
      return data;
    });

		if (response.success) {
			return response.data as QuizData;
		} else {
			return null;
		}
  } catch (error) {
		console.log("An error occurred: ", error);
    return null;
  }
};
