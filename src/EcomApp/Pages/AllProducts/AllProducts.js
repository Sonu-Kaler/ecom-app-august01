import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/Products/ProductCard";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { useDispatch } from "react-redux";
import FilterSearch from "../../Components/FilterSearch/FilterSearch";
import { addToCart } from "../../Redux/Slices/CartSlice";


const AllProducts=()=>{
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        const unsubSnap = onSnapshot(
            query(collection(db,"products")),
            (querySnapshot)=>{
                const productData=[];
                querySnapshot.forEach((doc)=>{
                    productData.push({id:doc.id,...doc.data()});
                })
                setProducts(productData);
            },
            (error)=>{
                console.log("Error",error);
            }
        )
        return()=>{unsubSnap()}
    },[])

    const dispatch = useDispatch();
    // Filter -
        const [search,setSearch] = useState("");
        const [genderFilter,setGenderFilter] = useState("");
        const [priceFilter,setPriceFilter] = useState("");
        const [filterProducts,setFilterProducts] = useState([]);
        useEffect(()=>{
            let filtered=products;
            if(search){
                filtered=filtered.filter(item=>item.title.toLowerCase().includes(search.toLowerCase()));
            }
            if(genderFilter){
                filtered=filtered.filter(item=>item.gender===genderFilter);
            }
            if(priceFilter){
                const [min,max] = priceFilter.split("-").map(Number);
                filtered=filtered.filter(item=>item.price>=min && item.price<=max);
            }
            setFilterProducts(filtered);
        },[search,genderFilter,priceFilter,products])
    return(
        <div>
            <Layout>
            <FilterSearch setSearch={setSearch} setGenderFilter={setGenderFilter} setPriceFilter={setPriceFilter}/>
            <div className="product-container">
                {
                    filterProducts.map((item)=>(
                        <ProductCard key={item.id} title={item.title} price={item.price} id={item.id} image={item.image} onClick={()=>dispatch(addToCart(item))}/>
                    ))
                }
            </div>
            </Layout>
        </div>
    )
}

export default AllProducts;