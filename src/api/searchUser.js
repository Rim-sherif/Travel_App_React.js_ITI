export async function fetchUsers(token, value) {
  const API_URL = `http://localhost:5000/api/v1/user/?search=${value}`;
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    if (data.success) {
      return data.users;
    } else {
      throw new Error("Error fetching users: " + data.message);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
