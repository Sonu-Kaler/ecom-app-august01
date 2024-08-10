import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./EcomApp/Pages/Home/Home";
import Signup from "./EcomApp/Pages/Authen/Signup";
import Login from "./EcomApp/Pages/Authen/Login";
import AdminSetup from "./EcomApp/Pages/Authen/AdminSetup";
import AuthState from "./EcomApp/Pages/Authen/AuthState";
import UserPrivate from "./EcomApp/Components/Private/UserPrivate";
import AdminPrivate from "./EcomApp/Components/Private/AdminPrivate";
import Cart from "./EcomApp/Pages/User/Cart";
import Dashboard from "./EcomApp/Pages/Admin/Dashboard";
import AddProduct from "./EcomApp/Pages/Admin/Products/AddProduct";
import UpdateProduct from "./EcomApp/Pages/Admin/Products/UpdateProduct";
import ProductInfo from "./EcomApp/Components/Products/ProductInfo";
import Order from "./EcomApp/Pages/User/Order";
import style from "./App.css";
import AllProducts from "./EcomApp/Pages/AllProducts/AllProducts";
const App=()=>{

  useEffect(()=>{
    AdminSetup();
  },[])
  return(
    <div>
      <Router>
        <AuthState/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login/>}/>
          

          <Route path="/cart" element={<UserPrivate><Cart/></UserPrivate>} />
          <Route path="/dashboard" element={<AdminPrivate><Dashboard /></AdminPrivate>}/>

          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/updateproduct/:id" element={<UpdateProduct/>}/>

          <Route path="/productInfo/:id" element={<ProductInfo />}/>
          <Route path="/order" element={<Order/>}/>

          <Route path="/allproducts" element={<AllProducts/>}/>
        </Routes>
      </Router>
    </div>
  ) 
}
export default App;