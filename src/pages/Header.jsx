import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [loginStatus, setLoginStatus] = useState(Cookies.get("loginStatus"));
  const [loginUserType, setUserType] = useState(Cookies.get("loginUserType"));
  const navigate = useNavigate();

  useEffect(() => {
    setLoginStatus(Cookies.get("loginStatus"));
    setUserType(Cookies.get("loginUserType"));
  }, [Cookies.get("loginStatus"), Cookies.get("loginUserType")]);

  const handleLogOut = () => {
    Cookies.remove("loginStatus");
    Cookies.remove("loginUserType");
    Cookies.remove("userId");
    setLoginStatus(false);
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          <a href="/">My Supermarket</a>
        </div>
        <div className="space-x-4">
          {loginStatus == null && (
            <a href="/" className="text-white hover:text-gray-300">
              Home
            </a>
          )}
          {loginUserType == 0 && (
            <a
              href="/Admin/ProductCategoryList"
              className="text-white hover:text-gray-300"
            >
              Product Categories
            </a>
          )}
          {loginUserType == 0 && (
            <a
              href="/Admin/ProductList"
              className="text-white hover:text-gray-300"
            >
              Products
            </a>
          )}
          {loginUserType == 0 && (
            <a href="/Admin/UsersList" className="text-white hover:text-gray-300">
              Users
            </a>
          )}
          {loginUserType == 0 && (
            <a href="/" className="text-white hover:text-gray-300">
              Reports
            </a>
          )}
          {loginUserType == 1 && (
            <a href="/Staff/CreateInvoice" className="text-white hover:text-gray-300">
              Create Invoice
            </a>
          )}
          {loginUserType == 1 && (
            <a href="/" className="text-white hover:text-gray-300">
              Orders
            </a>
          )}
          {loginStatus != "true" && (
            <a href="/Login" className="text-white hover:text-gray-300">
              Login
            </a>
          )}
          {loginStatus != "true" && (
            <a href="/Register" className="text-white hover:text-gray-300">
              Register
            </a>
          )}
          {loginStatus == "true" && (
            <a href="/MyAccount" className="text-white hover:text-gray-300">
              My Account
            </a>
          )}
          {loginStatus == "true" && (
            <a
              onClick={handleLogOut}
              href=""
              className="text-white hover:text-gray-300"
            >
              LogOut
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
