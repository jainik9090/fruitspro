import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading:false,
    product:[],
    error:null    
}

export const productUser = createAsyncThunk(
    "product/productUser",
    async () => {
      const response = await fetch("http://localhost:3000/Product");
      const data = await response.json();

      console.log(data);
      return data;
      
    },
  )

export const productSlice = createSlice({
    name:"product",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(productUser.fulfilled, (state, action) => {
          state.product.push(action.payload)
        })
      },
})

export default productSlice.reducer;