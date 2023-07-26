import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Arima } from "next/font/google";

import CreateForm from "@/components/CreateForm";
import ReportTable from "@/components/ReportTable";

const arima = Arima({ subsets: ["latin"] });

export default function CookieStandAdmin() {
  const [cookieStands, setCookieStands] = useState([]);
  // const { tokens } = useAuth();

  useEffect(() => {
    async function updateCookies() {
      const data = await fetchCookies();
      setCookieStands(data);
    }
    updateCookies();
  }, []);

  async function fetchCookies() {
    // const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const tokenUrl = "http://127.0.0.1:8000/api/v1/cookie_stands/";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwNDA2NjkyLCJpYXQiOjE2OTA0MDMwOTIsImp0aSI6ImNhMDhhZDczZTJkNDQ4ZmZiY2I3YTU5MTNkYjQ2ZTIzIiwidXNlcl9pZCI6MiwiZW1haWwiOiIiLCJ1c2VybmFtZSI6ImVtYW0ifQ.kPB-TFzWRdZk8cdtJrWeajHKoBA32L1iefAgUZ9ZTAM"}`,
      },
    };
    const response = await fetch(tokenUrl, options);
    console.log(response);

    const data = await response.json();
    console.log(data);
    return data;
  }

  const addCookieStand = (cookieStand) => {
    setCookieStands((cookieStands) => [...cookieStands, cookieStand]);
  };

  const deleteCookieStand = (index) => {
    setCookieStands((cookieStands) =>
      cookieStands.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <Head>
        <title>Cookie Stand Admin</title>
      </Head>
      <div className={`flex flex-col min-h-screen ${arima.className}`}>
        <header className="flex items-center justify-between p-4 text-black align-middle bg-green-500">
          <h1 className="text-4xl font-semibold">Cookie Stand Admin</h1>
          <Link
            href={"./overview"}
            className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-800 "
          >
            overview
          </Link>
        </header>
        <main className="mx-1 mt-8 grow sm:mx-12 md:mx-24 lg:mx-36">
          <CreateForm addCookieStand={addCookieStand} />
          <ReportTable
            cookieStands={cookieStands}
            deleteCookieStand={deleteCookieStand}
          />
        </main>
        <footer className="p-5 text-lg font-semibold text-gray-700 bg-green-500">
          {cookieStands.length} Locations World Wide
        </footer>
      </div>
    </>
  );
}
