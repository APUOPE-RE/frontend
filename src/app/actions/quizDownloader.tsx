const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const downloadQuizPdf = async (quizid: number | null) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/fetchQuizPdf/${quizid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
       credentials: "include",
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const tag = document.createElement('a');
        tag.href= url;
        tag.download = `quiz_${quizid}.pdf`;
        tag.click();
        tag.remove();
        window.URL.revokeObjectURL(url);
    } else {
      console.error("Failed to fetch PDF:", await response.text());
    }
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
};
