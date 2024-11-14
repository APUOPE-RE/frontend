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
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
};