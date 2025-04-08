import { createSlice } from "@reduxjs/toolkit"

const initVal = {
    products:null
}

const productsSlice = createSlice({
    name:"products",
    initialState:initVal,
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload
        },
    }
})

export const {setProducts} = productsSlice.actions
export default productsSlice.reducer