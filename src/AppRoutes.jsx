// src/Routes.js
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Users/Login";
import Register from "./components/Users/Registeration";
import ProductsList from "./components/Admin/ProductsList";
import AddProduct from "./components/Admin/AddProduct";
import ProductCategoryList from "./components/Admin/ProductCategoryList";
import AddProductCategory from "./components/Admin/AddProductCategory";
import UsersList from "./components/Admin/UsersList";
import CreateInvoice from "./components/Staffs/CreateInvoice";
import OrdersList from "./components/Staffs/OrdersList";
import UserAccount from "./components/Users/UserAccount";
import Error from "./pages/Error";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Error" element={<Error />} />
      <Route path="/*" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/UserAccount" element={<UserAccount />} />
      {/* Admin */}
      <Route
        path="/Admin/ProductCategoryList"
        element={<ProductCategoryList />}
      />
      <Route path="/Admin/AddCategory" element={<AddProductCategory />} />
      <Route path="/Admin/ProductList" element={<ProductsList />} />
      <Route path="/Admin/AddProduct" element={<AddProduct />} />
      <Route path="/Admin/EditProduct/:id" element={<AddProduct />} />
      <Route path="/Admin/UsersList" element={<UsersList />} />
      {/* Staff */}
      <Route path="/Staff/CreateInvoice" element={<CreateInvoice />} />
      <Route path="/Orders" element={<OrdersList />} />
    </Routes>
  );
};

export default AppRoutes;
