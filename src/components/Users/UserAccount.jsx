import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUser, UpdateUser } from "../../services/Users/api";
import Cookies from "js-cookie";

const UserAccount = () => {
  const [formData, setFormData] = useState({
    userId : +Cookies.get('userId'),
    userName: "",
    password: "",
    fullName: "",
    email: "",
    gender: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      let data = await (await GetUser(+Cookies.get("userId"))).json();
      setFormData(data);
    }
    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var res = await UpdateUser(formData);
    var a = await res.json();
    if (a.productCategoryId > 0) {
      alert("User Data Updated!");
      navigate("/");
    } else alert(a.userName);
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-blue-500">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                UserName
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
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
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
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
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
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
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default UserAccount;
