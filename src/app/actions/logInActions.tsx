const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchHello = async () => {
    const response = await fetch(`${API_BASE_URL}/api/`);
    return await response.text()
}