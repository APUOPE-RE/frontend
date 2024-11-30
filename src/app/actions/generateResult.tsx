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
      return data;
    } else {
      const errorData = await response.text(); 
      console.error("Failed", errorData);
      return null
    }
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
