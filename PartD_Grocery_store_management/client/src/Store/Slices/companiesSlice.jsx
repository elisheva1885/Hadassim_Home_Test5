import { createSlice } from "@reduxjs/toolkit"

const initVal = {   
    companies:null,
}

const companiesSlice = createSlice({
    name:"companies",
    initialState:initVal,
    reducers:{
        setCompanies:(state,action)=>{
            state.companies=action.payload
        },
        // clearBasket(state) {
        //     state.basket = null;
        // }
    }
})

export const {setCompanies} = companiesSlice.actions
export default companiesSlice.reducer