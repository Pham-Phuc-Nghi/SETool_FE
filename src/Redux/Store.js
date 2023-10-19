import { configureStore } from "@reduxjs/toolkit";
import { DangNhapSlice } from "./Slices/DangNhap/DangNhapSlice";

const Store = configureStore({
  reducer: {
    // add slice here 
    dang_nhap: DangNhapSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;