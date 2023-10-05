import { useEffect, useState } from "react";
import { GetAllProductCategories } from "../../services/Products/api";

const ProductCategoryList = () => {
  const [cList, setcList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      var res = await GetAllProductCategories();
      var data = await res.json();
      setcList(data);
    }
    fetchData();
  }, []);
  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-end">
        <a
          href="/Admin/AddCategory"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New
        </a>
      </div>
      <table className="min-w-full table-auto border border-collapse border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Sl.No
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Category Name
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Tax
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Discount
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cList.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
              <td className="px-4 py-2 border border-gray-200">
                {item.categoryName}
              </td>
              <td className="px-4 py-2 border border-gray-200">{item.tax}</td>
              <td className="px-4 py-2 border border-gray-200">
                {item.discount}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                <button onClick={()=>{}} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                  Edit
                </button>
                <button onClick={()=>{}} className="bg-red-500 text-white px-4 py-2 rounded  ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategoryList;
