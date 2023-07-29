import { addCookieStand as addCookieStandService } from "@/services/cookieStands";
import { useState } from "react";
import { useUser } from "@/context/authCtx";

function CreateForm({ handleAddCookieStand, addStandStatus }) {
  const user = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newCookie = {
      location: e.target.location.value,
      minimum_customers_per_hour: e.target["min-customer-per-hour"].value,
      maximum_customers_per_hour: e.target["max-customer-per-hour"].value,
      average_cookies_per_sale: e.target["avg-cookie-per-sale"].value,
      hourly_sales: [48, 42, 30, 24, 42, 24, 36, 42, 42, 48, 36, 42, 24, 36],
      owner: user.id,
      loading: true,
    };

    handleAddCookieStand(newCookie);
  };

  return (
    <form className="p-4 bg-green-400 rounded-lg" onSubmit={onSubmit}>
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
        <div className="flex flex-col flex-1 p-2 bg-green-300 rounded-md md:justify-between">
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
        <div className="flex flex-col justify-between flex-1 p-2 bg-green-300 rounded-md">
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
        <div className="flex flex-col justify-between flex-1 p-2 bg-green-300 rounded-md">
          <label htmlFor="avg-cookie-per-sale">Average Cookie per Sale</label>
          <input
            className="w-full"
            type="number"
            id="avg-cookie-per-sale"
            name="avg-cookie-per-sale"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 rounded-md grow disabled:bg-green-200"
          disabled={addStandStatus.loading}
        >
          Create
        </button>
      </div>
      {addStandStatus.error && (
        <pre className="text-red-500">{addStandStatus.error}</pre>
      )}
    </form>
  );
}

export default CreateForm;
