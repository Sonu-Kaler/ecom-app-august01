import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
const Signup=()=>{

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");


    const navigate = useNavigate();

    const handleSignup=async()=>{
        if(name && email && password && confirmPassword){
            try{
                const userCred = await createUserWithEmailAndPassword(auth,email,password);
                const user = userCred.user;

                await setDoc(doc(db,"Users",user.uid),{
                    name:name,
                    email:email,
                    uid:user.uid
                })
                console.log("User Created");
                navigate("/login");
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
            <h2>Signup</h2>
            <div className="form-input">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm  Password"/>
            </div>
            <button onClick={handleSignup} className="form-btn">Signup</button>
            <p onClick={()=>navigate("/login")} className="form-link-toggle">Click to Login</p>
        </div>
    )
}
export default Signup;