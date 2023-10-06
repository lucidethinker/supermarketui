import { useEffect, useState } from "react";
import {
  GetAllProductCategories,
  GetAllProducts,
  DeleteProduct,
} from "../../services/Products/api";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [pList, setpList] = useState([]);
  const [cList, setcList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      var res = await GetAllProducts();
      var data = await res.json();
      setpList(data);
      var res2 = await GetAllProductCategories();
      setcList(await res2.json());
    }
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await DeleteProduct(productId);

      if (response.status === 200) {
        setpList((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
      } else {
        alert("Error deleting product:", response);
      }
    } catch (error) {
      alert("Error deleting product:", error);
    }
  };
  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-end">
        <a
          href="/Admin/AddProduct"
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
              Category
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Name
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
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Stock
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Vendor
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Descriptions
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {pList.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
              <td className="px-4 py-2 border border-gray-200">
                {
                  cList.find(
                    (c) => c.productCategoryId == item.productCategoryId
                  )?.categoryName
                }
              </td>
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
              <td className="px-4 py-2 border border-gray-200">
                {item.vendor}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {item.descriptions}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                <button
                  onClick={() => {
                    navigate(`/Admin/EditProduct/${item.productId}`);
                  }}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(item.productId)}
                  className="bg-red-500 text-white px-4 py-2 rounded  ml-2"
                >
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

export default ProductsList;
