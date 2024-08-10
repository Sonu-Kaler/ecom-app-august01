import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, QuerySnapshot, writeBatch } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
const Dashboard=()=>{

    const navigate = useNavigate();

    const [products,setProducts] = useState([]);
    useEffect(()=>{
        const unsubSnap = onSnapshot(
            query(collection(db,"products")),
            (querySnapshot)=>{
                const productData=[];
                querySnapshot.forEach((doc)=>{
                    productData.push({id:doc.id,...doc.data()})
                })
                setProducts(productData);
            },
            (error)=>{
                console.log("Error",error)
            }
        )
        return()=>{
            unsubSnap();
        }
    },[])


    const handleDelete=async(id)=>{
        try{

            const imgRef = doc(db,"products",id);
            const imgRefDoc = await getDoc(imgRef);

            if(imgRefDoc.exists()){
                const filePath = imgRefDoc.data().filePath;
                if(filePath){
                    const productImgRef = ref(storage,filePath);
                    await deleteObject(productImgRef);
                    console.log("Path Deleted");
                }
                else{
                    console.log("No file path exists");
                }
                await deleteDoc(imgRef);
            }
            else{
                console.log("No Doc Exists");
            }
        }
        catch(e){
            console.log("Error",e);
        }
    }


    const [current,setCurrent] = useState("products");

    // Orders 
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        const unsubSnap = onSnapshot(
            query(collection(db,"Orders")),
            (querySnapshot)=>{
                const orderData=[];
                querySnapshot.forEach((doc)=>{
                    orderData.push({id:doc.id,...doc.data()});
                })
                setOrders(orderData);
            },
            (error)=>{
                console.log("Error",error);
            }
        )
        return()=>{unsubSnap()}
    },[])

    // Users
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        const unsubSnap = onSnapshot(
            query(collection(db,"Users")),
            (querySnapshot)=>{
                const userData=[];
                querySnapshot.forEach((doc)=>{
                    userData.push({id:doc.id,...doc.data()})
                })
                setUsers(userData);
            },
            (error)=>{
                console.log("Error",error);
            }
        )
        return()=>{unsubSnap()}
    },[])
    

    // Clear order docs -
    const clearOrder = async () => {
        try {
            const orderQuerySnapshot = await getDocs(collection(db, "Orders"));
            const batch = writeBatch(db);
    
            orderQuerySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
    
            await batch.commit();
    
            // Clear the orders from state
            setOrders([]);
            console.log("All orders cleared from Firebase and state.");
        } catch (error) {
            console.log("Error clearing orders:", error);
        }
    };
    

//     const deleteUsers = async () => {
//     try {
//         const userQuerySnapshot = await getDocs(collection(db, "Users"));
//         const batch = writeBatch(db);

//         userQuerySnapshot.forEach((doc) => {
//             batch.delete(doc.ref);
//         });

//         await batch.commit();

//         // Clear the users from state
//         setUsers([]);
//         console.log("All users cleared from Firebase and state.");
//     } catch (error) {
//         console.log("Error deleting users:", error);
//     }
// };

    return(
        <div>
            <Layout>
                <div className="dashboard-container">
                    <div className="dashboard-top">
                        <h1>Dashboard</h1>
                        <div className="dashboard-toggle">
                        <button onClick={()=>setCurrent("products")} className="toggle-btn">Products</button>
                        <button onClick={()=>setCurrent("orders")} className="toggle-btn">Orders</button>
                        <button onClick={()=>setCurrent("users")} className="toggle-btn">Users</button>
                        </div>
                    </div>


                {/* products */}
                {
                    current==="products" && 
                <div className="dashboard-products-container">
                    <div style={{display:"flex",justifyContent:"center",gap:"10px",alignItems:"center",margin:"10px 0px"}}>
                        <h2>Products</h2>
                        <button onClick={()=>navigate("/addproduct")} className="addproduct-btn">Add Products</button>
                    </div>
                    <div className="product-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th className="thStyle">
                                        S.No
                                    </th>
                                    <th className="thStyle">
                                        Image
                                    </th>
                                    <th className="thStyle">
                                        Title
                                    </th>
                                    <th className="thStyle">
                                        Price
                                    </th>
                                    <th className="thStyle">
                                        Category
                                    </th>
                                    <th className="thStyle">
                                        Date
                                    </th>
                                    <th className="thStyle actionsColumn">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((item,index)=>(
                                        <tr key={item.id}>
                                            <td className="tdStyle">
                                                {index+1}
                                            </td>
                                            <td className="tdStyle">
                                                <img src={item.image} style={{width:"20px"}}/>
                                            </td>
                                            <td className="tdStyle">
                                                {item.title}
                                            </td>
                                            <td className="tdStyle">
                                                {item.price}
                                            </td>
                                            <td className="tdStyle">
                                                {item.category}
                                            </td>
                                            <td className="tdStyle">
                                                {item.date}
                                            </td>
                                            <td style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}} className="tdStyle actionsColumn">
                                                <p onClick={()=>handleDelete(item.id)}><MdDelete /></p>
                                                <p onClick={()=>navigate(`/updateproduct/${item.id}`)}><FaEdit /></p>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                }
                {
                    current==="orders" &&
                    <div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"10px 0px",gap:"10px"}}>
                        <h2>Orders</h2>
                        <button onClick={clearOrder} className="addproduct-btn">Clear Orders</button>
                        </div>
                        <div className="order-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th className="thStyle">
                                    S.No
                                    </th>
                                    <th className="thStyle">
                                        Image
                                    </th>
                                    <th className="thStyle">
                                        Title
                                    </th>
                                    <th className="thStyle">
                                        Price
                                    </th>
                                    <th className="thStyle">
                                        Category
                                    </th>
                                    <th className="thStyle">
                                        Name
                                    </th>
                                    <th className="thStyle">
                                        Address
                                    </th>
                                    <th className="thStyle">
                                        Pincode
                                    </th>
                                    <th className="thStyle">
                                        Phone
                                    </th>
                                    <th className="thStyle">
                                        Email
                                    </th>
                                    <th className="thStyle">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((item,index)=>(
                                        item.cart.map((ite)=>(
                                            <tr key={item.id}>
                                                <td className="tdStyle">
                                                    {index+1}
                                                </td>
                                                <td className="tdStyle">
                                                    <img src={ite.image}  style={{width:"20px"}}/>
                                                </td>
                                                <td className="tdStyle">
                                                    {ite.title}
                                                </td>
                                                <td className="tdStyle">
                                                    {ite.price}
                                                </td>
                                                <td className="tdStyle">
                                                    {ite.category}
                                                </td>
                                                <td className="tdStyle">
                                                    {item.name}
                                                </td>
                                                <td className="tdStyle">
                                                    {item.address}
                                                </td>
                                                <td className="tdStyle">
                                                    {item.pincode}
                                                </td>
                                                <td className="tdStyle">
                                                    {item.phone}
                                                </td>
                                                <td className="tdStyle">
                                                    {item.email}
                                                </td>
                                                <td className="tdStyle">
                                                    {item.date}
                                                </td>
                                            </tr>
                                        ))
                                    ))
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                }
                {
                    current==="users" && 
                    <div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"10px 0px",gap:"10px"}}>
                        <h2>Users</h2>
                        {/* <button className="addproduct-btn">Clear Users</button> */}
                        </div>
                        <div className="user-table-container">
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th className="thStyle">
                                        S.No
                                    </th>
                                    <th className="thStyle">
                                        Name
                                    </th>
                                    <th className="thStyle">
                                        Email
                                    </th>
                                    <th className="thStyle">
                                        Uid
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((item,index)=>(
                                        <tr key={item.id}>
                                            <td className="tdStyle">
                                                {index+1}
                                            </td>
                                            <td className="tdStyle">
                                                {item.name}
                                            </td>
                                            <td className="tdStyle"> 
                                                {item.email}
                                            </td>
                                            <td className="tdStyle">
                                                {item.uid}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                }
            </div>
            </Layout>
        </div>
    )
}
export default Dashboard;