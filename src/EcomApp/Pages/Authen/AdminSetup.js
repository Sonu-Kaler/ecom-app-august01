import React from "react";
import {auth, db} from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
const AdminSetup=async()=>{

    const adminRef = doc(db,"Admin","AdminUser");
    const adminDoc = await getDoc(adminRef);

    const name = "admin";
    const email = "admin@mail.com";
    const password = "admin2288";

    if(!adminDoc.exists()){
        try{
            const adminCred = await createUserWithEmailAndPassword(auth,email,password);
            const admin = adminCred.user;
            await setDoc(adminRef,{
                name:name,
                email:email,
                uid:admin.uid
            })
            console.log("Admin Created");
        }
        catch(e){
            console.log("Error",e);
        }
    }
    else{
        console.log("Already Exists");
    }
    return null;
}

export default AdminSetup;