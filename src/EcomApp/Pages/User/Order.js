import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { collection, onSnapshot, query, QuerySnapshot } from "firebase/firestore";
import { MdCurrencyRupee } from "react-icons/md";
const Order=()=>{
    
    const [orders,setOrders] = useState([]);
    const [current,setCurrent] = useState(null);

    useEffect(()=>{
        const unsubAuth = onAuthStateChanged(auth,(user)=>{
            if(user){
                setCurrent(user);
            }
            else{
                setCurrent(null);
            }
        })
        const unsubSnap = onSnapshot(
            query(collection(db,"Orders")),
            (querySnapshot)=>{
                const orderData=[];
                querySnapshot.forEach((doc)=>{
                    orderData.push({id:doc.id,...doc.data()})
                })
                setOrders(orderData);
            },
            (error)=>{
                console.log("Error",error);
            }
        )
        return()=>{
            unsubAuth();
            unsubSnap();
        }
    },[])

    const userOrder = orders.filter(item=>item.userid===current?.uid)
    return(
        <div>
            <Layout>
                <div>
                <h2 style={{textAlign:"center",margin:"20px 0px"}}>Order</h2>
                <div style={{margin:"50px 0px"}}>
                    {
                        userOrder.length===0?
                        (
                            <p style={{textAlign:"center"}}>Nothing Found</p>
                        )
                        :
                        (
                            userOrder.map((order) => (
                                <div key={order.id}>
                                    <div className="order-container">
                                        {order.cart.map((item) => (
                                            <div key={item.title} className="order-product">
                                                <img src={item.image} style={{ width: "100px" }} alt={item.title} />
                                                <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                                                <h4>{item.title}</h4>
                                                <p><MdCurrencyRupee /> {item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-details">
                                        <h3>Shipping Details</h3>
                                        <p>Name: {order.name}</p>
                                        <p>Address: {order.address}</p>
                                        <p>Pincode: {order.pincode}</p>
                                        <p>Mobile: {order.mobile}</p>
                                        <p>Email: {order.email}</p>
                                        <p>Date: {order.date}</p>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
                </div>
            </Layout>
        </div>
    )
}
export default Order;