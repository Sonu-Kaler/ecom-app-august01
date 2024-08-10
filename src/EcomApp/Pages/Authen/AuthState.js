import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setAdmin } from "../../Redux/Slices/AdminSlice";
import { setUser } from "../../Redux/Slices/UserSlice";

const AuthState=()=>{

    const dispatch = useDispatch();

    useEffect(()=>{
        const unsubAuth = onAuthStateChanged(auth,(user)=>{
            if(user){
                const adminRef = doc(db,"Admin","AdminUser");
                const unsubSnap = onSnapshot(
                    adminRef,
                    (adminDoc)=>{
                        if(adminDoc.exists() && adminDoc.data().email === user.email){
                            const adminData = adminDoc.data();
                            dispatch(setAdmin({
                                name:adminData.name,
                                email:adminData.email,
                                uid:adminData.uid
                            }))
                        }
                        else{
                            const unsubSnap = onSnapshot(
                                doc(db,"Users",user.uid),
                                (userDoc)=>{
                                    if(userDoc.exists()){
                                        const userData = userDoc.data();
                                        dispatch(setUser({
                                            name:userData.name,
                                            email:userData.email,
                                            uid:userData.uid
                                        }))
                                        console.log("User Logged");
                                    }
                                },
                                (error)=>{
                                    console.log("Error",error);
                                }
                            )
                            return()=>{unsubSnap()};
                        }
                    },
                    (error)=>{
                        console.log("Error",error);
                    }
                )
                return()=>{unsubSnap()};
            }
        })
        return()=>{unsubAuth()};
    },[dispatch])
    return null;
}

export default AuthState;