import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    shopdet: [],
    error: null
}

export const getShopdet = createAsyncThunk(
    "shopdet/getShopdet",
    async () => {
        const responce = await fetch("http://localhost:4000/Review");
        const data = await responce.json();

        return data;
    }
)

export const addShopdet = createAsyncThunk(
    "shopdet/addShopdet",

    async (data) => {
        const response = await fetch("http://localhost:4000/Review", {
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
export const deleteShopdet = createAsyncThunk(
    "shopdet/deleteShopdet",

    async (id) => {
        const responce = await fetch("http://localhost:4000/Review/" + id, {
            method: "DELETE"
        })
        const data = await responce.json();
        console.log(data);
        return data.id;

    }
)


export const shopDetSlice = createSlice({
    name: "shopdet",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getShopdet.fulfilled, (state, action) => {
            state.shopdet = action.payload
        });
        builder.addCase(addShopdet.fulfilled, (state, action) => {
            state.shopdet.concat(action.payload);
        })

        builder.addCase(deleteShopdet.fulfilled, (state, action) => {
            const i = state.shopdet.findIndex(v => v.id === action.payload);
            state.shopdet.splice(i, 1);

        })

      
    }
})

export default shopDetSlice.reducer;