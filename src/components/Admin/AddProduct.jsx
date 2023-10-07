import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  CreateProduct,
  GetAllProductCategories,
  GetProduct,
  UpdateProduct,
} from "../../services/Products/api";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    productId: 0,
    productCategoryId: "",
    productName: "",
    price: "",
    tax: 0,
    discount: 0,
    stockQuantity: 0,
    vendor: "",
    descriptions: "",
    image: null,
  });
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await GetAllProductCategories();
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
        if (id != null || id > 0) {
          let res = await GetProduct(id);
          let data = await res.json();
          setFormData({
            productId: data.productId,
            productCategoryId: data.productCategoryId,
            productName: data.productName,
            price: data.price,
            tax: data.tax,
            discount: data.discount,
            stockQuantity: data.stockQuantity,
            vendor: data.vendor,
            descriptions: data.descriptions,
          });
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id > 0) {
      var resp = await UpdateProduct(formData);
      var b = await resp.json();
      if (b.productId > 0) {
        alert("Product Updated!!");
        navigate("/Admin/ProductList");
      } else alert(b.productName);
    } else {
      var res = await CreateProduct(formData);
      var a = await res.json();
      if (a.productId > 0) {
        navigate("/Admin/ProductList");
      } else alert(a.productName);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {id == null || id == 0 ? "Add" : "Edit"} Product
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="productCategoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Product Category
            </label>
            <select
              id="productCategoryId"
              name="productCategoryId"
              value={formData.productCategoryId}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option
                  key={category.productCategoryId}
                  value={category.productCategoryId}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descriptions"
              className="block text-sm font-medium text-gray-700"
            >
              Descriptions
            </label>
            <input
              type="text"
              id="descriptions"
              name="descriptions"
              value={formData.descriptions}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tax"
              className="block text-sm font-medium text-gray-700"
            >
              Tax%
            </label>
            <input
              type="text"
              id="tax"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount%
            </label>
            <input
              type="text"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="text"
              id="stockQuantity"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="vendor"
              className="block text-sm font-medium text-gray-700"
            >
              Vendor
            </label>
            <input
              type="text"
              id="vendor"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {id == 0 || id == null ? "Add" : "Edit"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
