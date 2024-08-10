import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Slices/CartSlice";
import { FaRegStar, FaStar } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
const ProductInfo=()=>{
    const {id} = useParams();

    const [product,setProduct] = useState([]);
    const getData=async()=>{
        try{
            const docRef = doc(db,"products",id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                console.log("Doc Found:",docSnap.data())
                setProduct({id:id,...docSnap.data()});
            }
            else{
                console.log("No Such Doc");
            }
        }
        catch(e){
            console.log("Error",e);
        }
    }

    useEffect(()=>{
        if(id){
            getData();
        }
    },[id])

    const dispatch = useDispatch();
    return(
        <div>
            <Layout>
                <div className="productInfo">
                    <div>
                        <img src={product.image} className="productImage"/>
                    </div>
                    <div>
                        <div>
                        <h3>{product.title}</h3>
                        <div style={{display:"flex",gap:"5px"}}>
                            <div>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaRegStar />
                            </div>
                            <p>Reviews</p>
                        </div>
                        </div>
                            <p>{product.description}</p>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <p><LiaRupeeSignSolid />{product.price}</p>
                            <button onClick={()=>dispatch(addToCart(product))} className="cart-btn" style={{width:"100px"}}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
export default ProductInfo;