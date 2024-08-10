import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { clearUser } from "../../Redux/Slices/UserSlice";
import { clearAdmin } from "../../Redux/Slices/AdminSlice";
import { FaShoppingCart } from "react-icons/fa";

const Navbar=()=>{

    const user = useSelector((state)=>state.user.user);
    const admin = useSelector((state)=>state.admin.admin);

    const dispatch = useDispatch();

    const logout=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Logged Out");
            dispatch(clearUser());
            dispatch(clearAdmin());
          }).catch((error) => {
            // An error happened.
            console.log("Error",error);
          });
    }
    return(
        <div className="navbar">
            <Link to="/" className="logo">Ecom</Link>
            
            <div className="navbar-end">
            <Link to="/allproducts">All Products</Link>
            {
                user && <Link to="/cart">Cart</Link>
            }
            {
                admin && <Link to="/dashboard">Dashboard</Link>
            }
            {
                user && <Link to="/order">Order</Link>
            }
            {
                !user && !admin ?
                (
                    <Link to="/signup">Signup</Link>
                )
                :
                (
                    <button onClick={logout} className="nav-btn">Logout</button>
                )
            }
            </div>
            
        </div>
    )
}
export default Navbar