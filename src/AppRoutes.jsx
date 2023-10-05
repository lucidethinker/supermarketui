// src/Routes.js
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Users/Login';
import Register from './components/Users/Registeration';
import ProductsList from './components/Admin/ProductsList';
import AddProduct from './components/Admin/AddProduct';
import ProductCategoryList from './components/Admin/ProductCategoryList';
import AddProductCategory from './components/Admin/AddProductCategory';
import UsersList from './components/Admin/UsersList';
import CreateInvoice from './components/Staffs/CreateInvoice';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path ="/" element={<Home />} />
      <Route path ="/Login" element={<Login/>} />
      <Route path ="/Register" element={<Register />} />  
      {/* Admin */}
      <Route path ="/Admin/ProductCategoryList" element={<ProductCategoryList />} /> 
      <Route path ="/Admin/AddCategory" element={<AddProductCategory />} /> 
      <Route path ="/Admin/ProductList" element={<ProductsList />} />
      <Route path ="/Admin/AddProduct" element={<AddProduct />} /> 
      <Route path ="/Admin/UsersList" element={<UsersList />} /> 
      {/* Staff */}
      <Route path ="/Staff/CreateInvoice" element={<CreateInvoice />} /> 
    </Routes>
  );
};

export default AppRoutes;
