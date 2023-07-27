export const getAllCookieStands = async (token) => {
  const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}api/v1/cookie_stands/`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(tokenUrl, options);
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data;
};
