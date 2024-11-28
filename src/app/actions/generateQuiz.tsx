import { QuizSummaryData, ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchQuiz = async (value: string | null) => {
	try {
		const token = localStorage.getItem("token");
		const response = await fetch(`${API_BASE_URL}/api/quiz`, {
			// endpoint need to be checked
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ value }),
			credentials: "include",
		});

		if (response.ok) {
			return await response.json();
		} else {
			return console.error("Failed");
		}
	} catch (error) {
		return console.error("Error", error);
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
};
