import { ResponseData } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleLogout = async (setAuthenticated: (value: boolean) => void) => {
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

      // // Redirect to login page after logout
      // router.push("/login");
    } else {
      // set error here
    }
  } catch (error) {
		console.log("An error occurred: ", error);
  }
};