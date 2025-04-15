import { combineReducers} from "@reduxjs/toolkit";
import counterSlice from "./counter.slice";
import  productSlice  from "./product.slice";
import  categorySlice  from "./category.slice";
import  subcatSlice  from "./subcat.slice";

export const rootReducer = combineReducers({
    count: counterSlice,
    product: productSlice,
    category: categorySlice,
    subcategory: subcatSlice,
  })