import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const OrderForm=({close})=>{

    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [pincode,setPincode] = useState("");
    const [phone,setPhone] = useState("");

    const cart = useSelector((state)=>state.cart);
    const navigate = useNavigate();
    const hanldeOrder=async()=>{
        if(name && address && pincode && phone){
            try{
                const orderData={
                    name,
                    address,
                    pincode,
                    phone,
                    userid:auth.currentUser.uid,
                    email:auth.currentUser.email,
                    date: new Date().toLocaleString("en-US",{
                        month:"short",
                        day:"2-digit",
                        year:"numeric"
                    }),
                    cart
                }
                await addDoc(collection(db,"Orders"),orderData);
                console.log("Ordered");
                close();
                navigate("/order");
            }
            catch(e){
                console.log("Error",e);
            }
        }
        else{
            console.log("Fill all fields");
        }
    }
    return(
        <div>
            <h2 style={{textAlign:"center",margin:"10px 0px"}}>Fill Details</h2>
            <div className="form-style">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
                <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address"/>
                <input type="number" value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder="Pincode"/>
                <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone"/>
            <button onClick={hanldeOrder}>Order</button>
            </div>
        </div>
    )
}
export default OrderForm;

export const Modal=({isOpen,close,children})=>{
    if(!isOpen) return null;
    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={close} className="modal-close">X</button>
                {children}
            </div>
        </div>
    )
}