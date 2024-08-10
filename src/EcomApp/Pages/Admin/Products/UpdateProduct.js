import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { auth, db, storage } from "../../../../firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
const UpdateProduct=()=>{

    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState("");
    const [desc,setDesc] = useState("");
    const [gender,setGender] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState();


    const navigate = useNavigate();
    const handleSubmit=async()=>{
        if(title && price && desc && gender && category && image){
            try{
                const imageRef = ref(
                    storage,
                    `products/${auth.currentUser.uid}/${Date.now()}`
                )
                await uploadBytes(imageRef,image);
                const imageUrl = await getDownloadURL(imageRef);
                const productData={
                    title,
                    price,
                    description:desc,
                    gender,
                    category,
                    image:imageUrl,
                    date: new Date().toLocaleString("en-US",{
                        month:"short",
                        day:"2-digit",
                        year:"numeric"
                    }),
                    filePath:imageRef.fullPath
                }

                const imgRef = doc(db,"products",id);
                const imgRefDoc = await getDoc(imgRef);

                if(imgRefDoc.exists()){
                    const filePath = imgRefDoc.data().filePath;
                    if(filePath){
                        const productImgRef = ref(storage,filePath);
                        await deleteObject(productImgRef);
                        console.log("Old Path Deleted");
                    }
                }

                await setDoc(imgRef,productData);
                console.log("Update Product Doc");
                navigate("/dashboard");
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
            <h1>Update Product</h1>
            <div className="form-input">
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
                <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price"/>
                <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Description"/>
                <div className="form-select">
                    <select onChange={(e)=>setGender(e.target.value)} value={gender}>
                        <option value="">
                            Gender
                        </option>
                        <option value="Male">
                            Male
                        </option>
                        <option value="Female">
                            Female
                        </option>
                    </select>
                </div>

                <div className="form-select">
                    {
                        gender==="Male"?
                        (
                            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                                <option value="">
                                    Category
                                </option>
                                <option value="Tshirts/Tees">
                                    Tshirts/Tees
                                </option>
                                <option value="Shirts">
                                    Shirts
                                </option>
                                <option value="Jeans">
                                    Jeans
                                </option>
                            </select>
                        )
                        :
                        (
                            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                                <option value="">
                                    Category
                                </option>
                                <option value="Tops/Tees">
                                    Tops/Tees
                                </option>
                                <option value="Saree">
                                    Saree
                                </option>
                                <option value="Kurti">
                                    Kurti
                                </option>
                            </select>
                        )
                    }
                </div>
                <FileInput accept={"image/*"} id={"upload-product-image"} text="Upload Product Image" handleFn={(file)=>setImage(file)}/>
                <button onClick={handleSubmit} className="form-btn">
                    Update Product
                </button>
                
            </div>
        </div>
    )
}
export default UpdateProduct;


const FileInput=({accept,id,text,handleFn})=>{
    const [file,setFile] = useState("");

    const handleChange=(e)=>{
        console.log(e.target.files[0]);
        setFile(e.target.files[0].name);
        handleFn(e.target.files[0]);
    }
    return(
        <div className="file-input">
            <label htmlFor={id}>
            {file?`This ${file} is selected`:text}
            </label>
            <input type="file" accept={accept} id={id} onChange={handleChange} style={{display:"none"}}/>
        </div>
    )
}