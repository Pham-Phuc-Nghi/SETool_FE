import { configureStore } from "@reduxjs/toolkit";
import { DangNhapSlice } from "./Slices/DangNhap/DangNhapSlice";
import { HomePagesSlice } from "./Slices/HonePages/HomePagesSlice";

const Store = configureStore({
  reducer: {
    dang_nhap: DangNhapSlice.reducer,
    homepage: HomePagesSlice.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
