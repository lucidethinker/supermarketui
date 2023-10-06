import { useEffect, useState } from "react";
import { GetAllOrders } from "../../services/Orders/api";

const OrdersList = () => {
  const [oList, setoList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let res = await GetAllOrders();
      let data = await res.json();
      setoList(data);
    }
    fetchData();
  }, []);
  return (
    <table className="min-w-full table-auto border border-collapse border-gray-200 mt-5">
      <thead>
        <tr>
          <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
            Sl.No
          </th>
          <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
            Product Name
          </th>
          <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
            Price
          </th>
          <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
            Tax%
          </th>
          <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
            Discount%
          </th>
        </tr>
      </thead>
      <tbody>
        {oList.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
            <td className="px-4 py-2 border border-gray-200">
              {item.productName}
            </td>
            <td className="px-4 py-2 border border-gray-200">{item.price}</td>
            <td className="px-4 py-2 border border-gray-200">{item.tax}</td>
            <td className="px-4 py-2 border border-gray-200">
              {item.discount}
            </td>
            <td className="px-4 py-2 border border-gray-200">
              {item.stockQuantity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OrdersList;
