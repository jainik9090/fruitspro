import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    subcategory: [],
    error: null
}

export const getSubcatdata = createAsyncThunk(
    "subcategory/getSubcatdata",
    async () => {
        const responce = await fetch("http://localhost:4000/Subcategory");
        const data = await responce.json();

        console.log(data);
        return data;

    },
)

export const addSubcate = createAsyncThunk(
    "subcategory/addSubcate",

    async (data) => {
        const response = await fetch("http://localhost:4000/Subcategory", {
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


export const deleteSubcat = createAsyncThunk(
    "subcategory/deleteSubcat",

    async (id) => {
        const responce = await fetch("http://localhost:4000/Subcategory/" + id, {
            method: "DELETE"
        })
        const data = await responce.json();
        console.log(data);
        return data.id;

    }
)

export const updateSubcate = createAsyncThunk(
    "subcategory/updateSubcate",
  
    async (data) => {
      const response = await fetch("http://localhost:4000/Subcategory/" + data.id, {
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

export const subcatSlice = createSlice({
    name: "subcategory",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSubcatdata.fulfilled, (state, action) => {
            state.subcategory = action.payload
        });

        builder.addCase(addSubcate.fulfilled, (state, action) => {
            state.subcategory.concat(action.payload);
        })

        builder.addCase(deleteSubcat.fulfilled, (state, action) => {
            const i = state.subcategory.findIndex(v => v.id === action.payload);
            state.subcategory.splice(i, 1);

        })

        builder.addCase(updateSubcate.fulfilled, (state, action) => {
            const i = state.subcategory.findIndex(v => v.id === action.payload.id);
            state.subcategory[i] = action.payload;
        })
    }
})

export default subcatSlice.reducer;