import Head from "next/head";
import { Arima } from "next/font/google";
import { useState } from "react";

const arima = Arima({ subsets: ["latin"] });

export default function Home() {
  const [lastCookie, setLastCookie] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const cookie = {
      location: e.target.location.value,
      minCustomerPerHour: e.target["min-customer-per-hour"].value,
      maxCustomerPerHour: e.target["max-customer-per-hour"].value,
      avgCookiePerSale: e.target["avg-cookie-per-sale"].value,
    };
    setLastCookie(cookie);
  };

  return (
    <>
      <Head>
        <title>Cookie Stand Admin</title>
      </Head>
      <div
        className={`flex flex-col justify-between min-h-screen ${arima.className}`}
      >
        <header className="p-4 text-4xl font-semibold text-black bg-green-500">
          Cookie Stand Admin
        </header>
        <main className="mx-1 mt-8 grow sm:mx-12 md:mx-24 lg:mx-64">
          <Form onSubmit={onSubmit} />
          <pre>{JSON.stringify(lastCookie, null, 2)}</pre>
          <h2 className="p-5 text-lg font-semibold text-center text-gray-700">
            Report table coming soon ...
          </h2>
        </main>
        <footer className="p-5 text-lg font-semibold text-gray-700 bg-green-500">
          &copy; 2023
        </footer>
      </div>
    </>
  );
}

function Form({ onSubmit }) {
  return (
    <form className="p-4 bg-green-300 rounded-lg" onSubmit={onSubmit}>
      <h2 className="pb-4 text-2xl font-semibold text-center ">
        Create cookie Stand
      </h2>
      <div className="flex gap-3 mb-3">
        <label htmlFor="location" className="font-semibold">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          required
          className="w-full"
        />
      </div>
      <div className="flex flex-col justify-between gap-3 text-center md:flex-row">
        <div className="flex flex-col flex-1 md:justify-between">
          <label htmlFor="min-customer-per-hour block">
            Minimum Customer per Hour
          </label>
          <input
            className="w-full"
            type="number"
            id="min-customer-per-hour"
            name="min-customer-per-hour"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <label htmlFor="max-customer-per-hour">
            Maximum Customer per Hour
          </label>
          <input
            className="w-full"
            type="number"
            id="max-customer-per-hour"
            name="max-customer-per-hour"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <label htmlFor="avg-cookie-per-sale">Average Cookie per Sale</label>
          <input
            className="w-full"
            type="number"
            id="avg-cookie-per-sale"
            name="avg-cookie-per-sale"
          />
        </div>
        <button type="submit" className="bg-green-500 grow">
          Create
        </button>
      </div>
    </form>
  );
}
