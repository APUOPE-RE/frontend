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
