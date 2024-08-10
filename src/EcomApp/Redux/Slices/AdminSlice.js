import { createSlice } from "@reduxjs/toolkit";
const initialState={
    admin:null
}
const AdminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdmin:(state,action)=>{
            state.admin=action.payload;
        },
        clearAdmin:(state,action)=>{
            state.admin=null
        }
    }
})
export const{setAdmin,clearAdmin} = AdminSlice.actions;
export default AdminSlice.reducer;