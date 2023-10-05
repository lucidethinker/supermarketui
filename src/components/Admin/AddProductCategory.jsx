import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AddCategory, GetAllProductCategories } from "../../services/Products/api";

const AddProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: "",
    tax: "",
    discount: "",
  });
  useEffect(() => {
    // Fetch categories from the server and set them in the state
    async function fetchCategories() {
      try {
        const response = await GetAllProductCategories();
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Assuming the response is an array of category options
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // For file input, handle files separately
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Assuming you only allow a single file upload
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var res = await AddCategory(formData);
    var a = await res.json();
    if(a.productCategoryId > 0)
        {
            navigate('/Admin/ProductCategoryList');
        }
    else
    alert(a.categoryName);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
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
              Tax
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
              Discount
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

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
