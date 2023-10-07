import { useEffect, useState } from "react";
import { GetAllOrders } from "../../services/Orders/api";
import { GetAllUser } from "../../services/Users/api";

const OrdersList = () => {
  const [oList, setoList] = useState([]);
  const [uList, setuList] = useState([]);
  const [dateTotalMap, setDateTotalMap] = useState({});
  const [showTotalTable, setShowTotalTable] = useState(false); // Track whether to show the total table

  useEffect(() => {
    async function fetchData() {
      let res = await GetAllOrders();
      let data = await res.json();
      let u = await (await GetAllUser()).json();
      setuList(u);
      setoList(data);

      const totalByDate = {};
      data.forEach((item) => {
        const date = item.orderDate.split(" ")[0];
        if (!totalByDate[date]) {
          totalByDate[date] = 0;
        }
        totalByDate[date] += item.totalAmount;
      });
      setDateTotalMap(totalByDate);
    }
    fetchData();
  }, []);

  const toggleTotalTable = () => {
    setShowTotalTable(!showTotalTable);
  };

  return (
    <div>
      <table className="min-w-full table-auto border border-collapse border-gray-200 mt-5">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Sl.No
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Time & Date
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Gross
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Tax%
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Discount%
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {oList.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
              <td className="px-4 py-2 border border-gray-200">
                {item.orderDate}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {item.grossAmount}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {item.taxAmount}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {item.discountAmount}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {item.totalAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 my-4"
          onClick={toggleTotalTable}
        >
          Show Total Amount by Date
        </button>

        {showTotalTable && (
          <div className="mt-4">
            <table className="w-full border border-collapse border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(dateTotalMap).map((date, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-200" : ""}
                  >
                    <td className="px-4 py-2">{date}</td>
                    <td className="px-4 py-2">{dateTotalMap[date]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
