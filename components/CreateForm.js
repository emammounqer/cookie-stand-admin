function CreateForm({ addCookieStand }) {
  const onSubmit = (e) => {
    e.preventDefault();
    const cookie = {
      location: e.target.location.value,
      minCustomerPerHour: e.target["min-customer-per-hour"].value,
      maxCustomerPerHour: e.target["max-customer-per-hour"].value,
      avgCookiePerSale: e.target["avg-cookie-per-sale"].value,
      hourlySales: [48, 42, 30, 24, 42, 24, 36, 42, 42, 48, 36, 42, 24, 36],
    };
    addCookieStand(cookie);
    e.target.reset();
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
        <button type="submit" className="bg-green-500 rounded-md grow">
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateForm;
