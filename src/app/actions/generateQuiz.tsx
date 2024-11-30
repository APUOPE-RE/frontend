const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchQuiz = async (lectureId: number | null) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/generateQuiz/${lectureId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
       credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return console.error("Failed");
    }
  } catch (error) {
    return console.error("Error", error);
  }
};
