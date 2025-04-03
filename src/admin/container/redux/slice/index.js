import { combineReducers} from "@reduxjs/toolkit";
import counterSlice from "./counter.slice";
import  productSlice  from "./product.slice";

export const rootReducer = combineReducers({
    count: counterSlice,
    product: productSlice,
  })