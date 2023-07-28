import { accessToken } from "./auth";

export const getAllCookieStands = async () => {
  const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}api/v1/cookie_stands/`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await fetch(tokenUrl, options);
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data;
};

export const addCookieStand = async (cookie) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}api/v1/cookie_stands/`;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cookie),
  };
  const response = await fetch(url, options);

  if (response.status === 400) {
    const data = await response.json();
    console.error(data);
    throw new Error(JSON.stringify(data, null, 2));
  }
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data;
};

export const deleteCookieStand = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}api/v1/cookie_stands/${id}/`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(response.statusText);
};
