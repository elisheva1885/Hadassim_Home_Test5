import { createSlice } from "@reduxjs/toolkit"

const initVal = {
    storeProducts:null
}

const storeProductsSlice = createSlice({
    name:"storeProducts",
    initialState:initVal,
    reducers:{
        setStoreProducts:(state,action)=>{
            state.storeProducts=action.payload
        },
    }
})

export const {setStoreProducts} = storeProductsSlice.actions
export default storeProductsSlice.reducer