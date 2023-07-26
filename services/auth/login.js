import jwt from "jsonwebtoken";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const tokenUrl = baseUrl + "api/token/";

export async function login(username, password) {
  const options = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(tokenUrl, options);
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  const decodedAccess = jwt.decode(data.access);

  return {
    access: data.access,
    refresh: data.refresh,
    user: {
      username: decodedAccess.username,
      email: decodedAccess.email,
      id: decodedAccess.user_id,
    },
  };
}
