const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const downloadQuizPdf = async (quizid: number | null): Promise<boolean | string> => {
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

        return true;
    } else {
			return response.json().then((data: string) => {
				return data;
			});
    }
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return "An error occurred. Please, try again.";
  }
};
