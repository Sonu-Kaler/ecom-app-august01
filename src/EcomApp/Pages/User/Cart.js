import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import OrderForm from "./OrderForm";
import {Modal} from "./OrderForm";
import { MdDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { removeFromCart } from "../../Redux/Slices/CartSlice";
import { useNavigate } from "react-router-dom";
const Cart=()=>{

    const cart = useSelector((state)=>state.cart);

    const [sub,setSub] = useState(0);
    useEffect(()=>{
        let temp=0;
        cart.forEach((doc)=>{
            temp=temp+=parseInt(doc.price);
        })
        setSub(temp);
    },[])

    const ship = 100;
    const total = ship+sub;


    const [isOpen,setOpen] = useState(false);
    const open=()=>{setOpen(true)};
    const close=()=>{setOpen(false)};

    const dispatch = useDispatch();

    const user = useSelector((state)=>state.user.user);
    const navigate = useNavigate();
    return(
        <div>
            <Layout>
                <h2 style={{textAlign:"center",margin:"20px 0px"}}>Cart</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", margin: "20px 0px" }}>
                    <div>
                    {
                        cart.length===0?
                        (
                            <p style={{ marginTop: "20px" }}>Empty</p>
                        )
                        :
                        (
                            <div>
                                {
                                    cart.map((item)=>(
                                        <div key={item.id} className="cart-product-container">
                                            <img src={item.image} style={{width:"100px"}}/>
                                            <div className="cart-product-content">
                                                <h2>{item.title}</h2>
                                                <p className="cart-product-desc">{item.description}</p>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p><FaIndianRupeeSign />{item.price}</p>
                                                    <MdDelete onClick={()=>dispatch(removeFromCart(item))}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                    </div>
                    <div className="cartPrice">
                        <div style={{ display: "flex", justifyContent: "space-between",color:"#8e8ea9" }}>
                            <p>SubTotal -</p>
                            <p>{sub}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between",color:"#8e8ea9" }}>
                            <p>Shipping -</p>
                            <p>{ship}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between",color:"#080816" }}>
                            <p>Total -</p>
                            <p>{total}</p>
                        </div>
                        <button onClick={open} className="btn-buy">Buy Now</button>
                    </div>
                </div>


                <Modal isOpen={isOpen} close={close}>
                    <OrderForm close={close}/>
                </Modal>
            </Layout>
        </div>
    )
}
export default Cart;