import { hours } from "@/data/timeSlotData";
import { calculateTotal } from "@/helper/calculateTotal";

const tdClass = "px-3 border border-gray-600";

const ReportTable = ({ cookieStands, deleteCookieStand }) => {
  if (cookieStands.length === 0)
    return (
      <h2 className="p-5 text-lg font-semibold text-center text-gray-700">
        No Cookie Stands Available
      </h2>
    );

  var { hourlyTotals, totalAll } = calculateTotal(cookieStands);

  return (
    <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-md">
      <table className="min-w-full text-sm ">
        <thead className="leading-6 bg-green-700">
          <tr className="px-10">
            <th>Location</th>
            {hours.map((hour) => (
              <th key={hour}>{hour}</th>
            ))}
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cookieStands.map((stand, i) => (
            <tr
              key={i}
              className={i % 2 == 0 ? "bg-green-400" : "bg-green-300"}
            >
              <td className={tdClass}>{stand.location}</td>
              {stand.hourlySales.map((hour) => (
                <td key={hour} className={tdClass}>
                  {hour}
                </td>
              ))}
              <td className={tdClass}>
                {stand.hourlySales.reduce((prev, curr) => prev + curr, 0)}
              </td>

              <td className={tdClass + " text-center"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="1rem"
                  height="1rem"
                  className="inline text-red-600 cursor-pointer"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  role="button"
                  onClick={() => deleteCookieStand(i)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="font-bold text-center bg-green-700">
          <tr>
            <td className={tdClass}>Totals</td>
            {hourlyTotals.map((hourlyTotal, i) => (
              <td key={i} className={tdClass}>
                {hourlyTotal}
              </td>
            ))}
            <td className={tdClass}>{totalAll}</td>
            <td className={tdClass}> - </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default ReportTable;
