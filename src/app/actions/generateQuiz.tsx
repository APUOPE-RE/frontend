import { QuizData, QuizSummaryData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchQuiz = async (lectureId: number | null): Promise<QuizData | string> => {
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
    .then((data: ResponseData<QuizData | string>) => {
      return data;
    });

		if (response.success) {
			return response.data as QuizData;
		} else {
      return response.data as string;
		}
  } catch (error) {
		console.log("An error occurred: ", error);
    return "An error occurred. Please, try again.";
  }
};

export const fetchPreviousQuizzes = async (): Promise<
	QuizSummaryData[] | ResponseData<string>
> => {
	try {
		const token = localStorage.getItem("token");
		const response = await fetch(
			`${API_BASE_URL}/api/fetchPreviousQuizzes`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((data: QuizSummaryData[]) => {
				return data;
			});

		return response;
	} catch (error) {
		console.error("Error during conversation fetch:", error);
		return { success: false, data: "An error occurred" };
	}
};

export const fetchPreviousQuiz = async (
	quizId: number
): Promise<QuizSummaryData | undefined> => {
	try {
		const token = localStorage.getItem("token");
		const response = await fetch(
			`${API_BASE_URL}/api/fetchPreviousQuiz/${quizId}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((data: QuizSummaryData) => {
				return data;
			});

		return response;
	} catch (error) {
		console.error("Error during conversation fetch:", error);
	}
}
