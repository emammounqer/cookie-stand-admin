import Head from "next/head";
import { useState, useEffect } from "react";
import { Arima } from "next/font/google";

import CreateForm from "@/components/CreateForm";
import ReportTable from "@/components/ReportTable";
import useResources from "@/hooks/useResources";
import { Header } from "./Header";

const arima = Arima({ subsets: ["latin"] });

export default function CookieStandAdmin() {
  const cookieRecourses = useResources();

  return (
    <>
      <Head>
        <title>Cookie Stand Admin</title>
      </Head>
      <div className={`flex flex-col min-h-screen ${arima.className}`}>
        <Header />
        <main className="mx-1 mt-8 grow sm:mx-12 md:mx-24 lg:mx-36">
          <CreateForm
            handleAddCookieStand={cookieRecourses.handleAddCookieStand}
            handleDeleteCookieStand={cookieRecourses.handleDeleteCookieStand}
            addStandStatus={cookieRecourses.addStandStatus}
          />
          {cookieRecourses.fetchStandsStatus.error && (
            <p className="text-red-500 text-center">
              {cookieRecourses.fetchStandsStatus.error}
            </p>
          )}
          {cookieRecourses.fetchStandsStatus.loading ? (
            <p className="text-green-500 text-center">Loading...</p>
          ) : (
            <>
              <ReportTable
                cookieStands={cookieRecourses.cookieStands}
                deleteCookieStand={cookieRecourses.handleDeleteCookieStand}
              />
              {cookieRecourses.deletingError && (
                <p className="text-red-500 text-center">
                  {cookieRecourses.deletingError}
                </p>
              )}
            </>
          )}
        </main>
        <footer className="p-5 text-lg font-semibold text-gray-700 bg-green-500">
          {cookieRecourses.cookieStands.length} Locations World Wide
        </footer>
      </div>
    </>
  );
}
