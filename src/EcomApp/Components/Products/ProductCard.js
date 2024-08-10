import React from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const ProductCard=({title,image,price,id,onClick})=>{

    const navigate = useNavigate();
    return(
        <div className="product-card">
            <div onClick={()=>navigate(`/productInfo/${id}`)}>
                <div className="product-card-image">
                    <img src={image} />
                </div>
                    <h3>{title}</h3>
                    <p><LiaRupeeSignSolid />{price}</p>
            </div>
            <button onClick={onClick} className="cart-btn">Add to Cart</button>
        </div>
    )
}
export default ProductCard;