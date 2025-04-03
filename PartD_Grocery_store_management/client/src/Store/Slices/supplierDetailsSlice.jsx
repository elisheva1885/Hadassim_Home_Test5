import { createSlice } from "@reduxjs/toolkit"

const initVal = {
    supplierDetails:{
    companyName:null,
    representative_Name: null
    }
}

const supplierDetailsSlice = createSlice({
    name:"supplierDetails",
    initialState:initVal,
    reducers:{
        setSupplierDetails:(state,action)=>{
            state.supplierDetails.companyName=action.payload.companyName
            state.supplierDetails.representative_Name=action.payload.representative_Name
        },
        // clearBasket(state) {
        //     state.basket = null;
        // }
    }
})

export const {setSupplierDetails} = supplierDetailsSlice.actions
export default supplierDetailsSlice.reducer