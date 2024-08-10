import { createSlice } from "@reduxjs/toolkit"

const CartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const existing = state.find(item=>item.id===action.payload.id);
            if(existing){
                existing.quantity+=1;
            }
            else{
                state.push({...action.payload,quantity:1});
            }
        },
        removeFromCart:(state,action)=>{
            return state.filter(item=>item.id!==action.payload.id)
        },
        clearCart:(state)=>{
            return [];
        }
    }
})

export const {addToCart,removeFromCart,clearCart} = CartSlice.actions;
export default CartSlice.reducer;
export const stateCart = state => state.cart;
export const cartCount = state => state.reduce((total,item)=>total+item.quantity,0);