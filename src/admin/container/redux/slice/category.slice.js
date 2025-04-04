import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    category: [],
    error: null
}

export const categoryUser = createAsyncThunk(
    "category/categoryUser",

    async () => {
        const responce = await fetch("http://localhost:4000/Category")
        const data = await responce.json();
        return data;
    }

)

export const addCategory = createAsyncThunk(
    "category/addCategory",

    async (data) => {
        const response = await fetch("http://localhost:4000/Category", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const rData = await response.json();
        console.log(rData);
        return rData;

    }
)
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",

    async (id) => {
        const responce = await fetch("http://localhost:4000/Category/" + id, {
            method: "DELETE"
        })
        const data = await responce.json();
        console.log(data);
        return data.id;

    }
)

export const updateCategory = createAsyncThunk(
    "product/updateProduct",
  
    async (data) => {
      const response = await fetch("http://localhost:4000/Category/" + data.id, {
        method:"PUT",
        body:JSON.stringify(data),
        headers: {
          "Content-Type" : "application/json",
        },
      });
  
      const rData = await response.json();
      console.log(rData);
      return rData;
      
    } 
  )  
export const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(categoryUser.fulfilled, (state, action) => {
            state.category = action.payload
        });
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.category.concat(action.payload);
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            const i = state.category.findIndex(v => v.id === action.payload);
            state.category.splice(i, 1);

        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            const i = state.category.findIndex(v => v.id === action.payload.id);
            state.category[i] = action.payload;
        })
    },
})

export default categorySlice.reducer;