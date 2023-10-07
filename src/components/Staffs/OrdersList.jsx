import { useEffect, useState } from "react";
import { GetAllOrders } from "../../services/Orders/api";
import { GetAllUser } from "../../services/Users/api";

const OrdersList = () => {
  const [oList, setoList] = useState([]);
  const [uList, setuList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let res = await GetAllOrders();
      let data = await res.json();
      let u = await (await GetAllUser()).json();
      setuList(u);
      setoList(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <label htmlFor="search" className="block font-bold">
        Search
      </label>
      <select
        name="search"
        id="search"
        className="w-1/2 px-4 py-2 border rounded-md"
        onChange={async (e) => {
          if (e.target.value != "") {
            let a = await (await GetAllOrders()).json();
            setoList([...a.filter((i) => i.userId == e.target.value)]);
          }
        }}
      >
        <option value="" selected disabled>
          Select Category
        </option>
        {uList.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.fullName}
          </option>
        ))}
      </select>
      <table className="min-w-full table-auto border border-collapse border-gray-200 mt-5">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Sl.No
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Cashier
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Time & Date
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Gross
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Tax
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Discount
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
                {uList.find((i) => i.userId == item.userId).fullName}
              </td>
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
    </div>
  );
};
export default OrdersList;
