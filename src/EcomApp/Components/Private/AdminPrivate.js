import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AdminPrivate=({children})=>{
    const admin = useSelector((state)=>state.admin.admin);
    if(!admin){
        return <Navigate to="/login" />
    }
    return children;
}
export default AdminPrivate;