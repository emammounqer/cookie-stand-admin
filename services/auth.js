export async function loginPOST(username, password) {
  const tokenUrl = process.env.NEXT_PUBLIC_API_URL + "api/token/";

  const options = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(tokenUrl, options);
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  return {
    access: data.access,
    refresh: data.refresh,
  };
}
