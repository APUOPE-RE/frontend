import { QuizSubmitData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchResult = async (submissionPayload: QuizSubmitData) => {
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
    });

    if (response.ok) {
      const data = await response.json();
      // localStorage.setItem("quizResult", JSON.stringify(data));
      return data;
    } else {
      return console.error("Failed");
    }
  } catch (error) {
    return console.error("Error", error);
  }
};
