import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const UserPrivate=({children})=>{
    const user = useSelector((state)=>state.user.user);
    if(!user){
        return <Navigate to="/login" />
    }
    return children;
}
export default UserPrivate;