import { ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleLogout = async (setAuthenticated: (value: boolean) => void): Promise<boolean | string> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (response.ok) {
      localStorage.removeItem("token");
      setAuthenticated(false);
      return true;
      // // Redirect to login page after logout
      // router.push("/login");
    } else {
			return response.json().then((data: ResponseData<string>) => {
				return data.data;
			});
    }
  } catch (error) {
		console.log("An error occurred: ", error);
    return "An error occurred. Please, try again.";
  }
};