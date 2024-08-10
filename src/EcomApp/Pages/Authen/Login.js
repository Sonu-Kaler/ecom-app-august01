import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setAdmin} from "../../Redux/Slices/AdminSlice";
import {setUser} from "../../Redux/Slices/UserSlice";
const Login=()=>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin=async()=>{
        if(email && password){
            try{
                
                const userCred = await signInWithEmailAndPassword(auth,email,password);
                const user = userCred.user;

                const adminRef = doc(db,"Admin","AdminUser");
                const adminDoc = await getDoc(adminRef);
                const adminData = adminDoc.data();
                
                if(adminData && email === adminData.email){
                    dispatch(setAdmin({
                        name:adminData.name,
                        email:adminData.email,
                        uid:adminData.uid
                    }))
                    console.log("Admin Logged");
                    navigate("/");
                }
                else{
                    const userDoc = await getDoc(doc(db,"Users",user.uid));
                    const userData = userDoc.data();

                    dispatch(setUser({
                        name:userData.name,
                        email:userData.email,
                        uid:userData.uid
                    }))
                    console.log("User Logged");
                    navigate("/");
                }
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
        <div className="form-container">
            <h2>Login</h2>
            <div className="form-input">
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
            </div>
            <button onClick={handleLogin} className="form-btn">Login</button>
            <p onClick={()=>navigate("/signup")} className="form-link-toggle">Click to Signup</p>
        </div>
    )
}
export default Login;