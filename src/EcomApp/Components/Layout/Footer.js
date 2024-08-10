import React from "react";

const Footer=()=>{
    return(
        <div className="footer">
            <div>
                <h3>Categories</h3>
                <a href="#">Home</a>
                <a href="#">Order</a>
                <a href="#">Cart</a>
            </div>
            <div>
                <h3>Customer Service</h3>
                <a href="#">Return Policy</a>
                <a href="#">About</a>
                <a href="#">Contact Us</a>
                <a href="#">Privacy</a>
            </div>
            <img src="https://cdn.zeebiz.com/sites/default/files/2024/01/03/274966-upigpay.jpg" style={{width:"100px",height:"100px",objectFit:"contain"}}/>
        </div>
    )
}
export default Footer