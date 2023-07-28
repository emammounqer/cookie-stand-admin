import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Arima } from "next/font/google";

import CreateForm from "@/components/CreateForm";
import ReportTable from "@/components/ReportTable";
import { getAllCookieStands } from "@/services/cookieStands";
import { deleteCookieStand } from "@/services/cookieStands";

const arima = Arima({ subsets: ["latin"] });

export default function CookieStandAdmin() {
  const [cookieStands, setCookieStands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingError, setDeletingError] = useState(null);

  useEffect(() => {
    async function fetchCookies() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllCookieStands();
        setCookieStands(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchCookies();
  }, []);

  const addCookieStand = (cookieStand) => {
    setCookieStands((cookieStands) => [...cookieStands, cookieStand]);
  };

  const handleDeleteCookieStand = async (standToDelete) => {
    setDeletingError(null);
    if (!standToDelete.id) {
      setCookieStands((cookieStands) =>
        cookieStands.filter((stand) => stand !== standToDelete)
      );
      return;
    }
    const prev = [...cookieStands];
    setCookieStands((cookieStands) =>
      cookieStands.map((stand) => {
        if (stand === standToDelete) {
          return { ...stand, deleting: true };
        }
        return stand;
      })
    );
    try {
      await deleteCookieStand(standToDelete.id);
      setCookieStands((cookieStands) =>
        cookieStands.filter((stand) => stand.id !== standToDelete.id)
      );
    } catch (error) {
      console.error({ error });
      setCookieStands(prev);
      setDeletingError(error.message);
    }
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
          <CreateForm
            addCookieStand={addCookieStand}
            deleteCookieStand={handleDeleteCookieStand}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          {loading ? (
            <p className="text-green-500 text-center">Loading...</p>
          ) : (
            <>
              <ReportTable
                cookieStands={cookieStands}
                deleteCookieStand={handleDeleteCookieStand}
              />
              {deletingError && (
                <p className="text-red-500 text-center">{deletingError}</p>
              )}
            </>
          )}
        </main>
        <footer className="p-5 text-lg font-semibold text-gray-700 bg-green-500">
          {cookieStands.length} Locations World Wide
        </footer>
      </div>
    </>
  );
}
