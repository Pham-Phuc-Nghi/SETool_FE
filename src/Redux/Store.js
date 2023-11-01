import { configureStore } from "@reduxjs/toolkit";
import { DangNhapSlice } from "./Slices/DangNhap/DangNhapSlice";
import { HomePagesSlice } from "./Slices/HonePages/HomePagesSlice";
import { CollaborationSlice } from "./Slices/Collaboration/CollaborationSlice";
import { ManagerSlice } from "./Slices/ManagerZone/ManagerSlice";
import { BacklogsSlice } from "./Slices/Backlogs/BacklogsSlice";
import { TaskManagerSlice } from "./Slices/TaskManager/TaskManagerSlice";
import StateChangeSlice from "./Slices/StateChange/StateChangeSlice";
import { DashboardSlice } from "./Slices/Dashboard/DashboardSlice";

const Store = configureStore({
  reducer: {
    dang_nhap: DangNhapSlice.reducer,
    homepage: HomePagesSlice.reducer,
    collaboration: CollaborationSlice.reducer,
    manager: ManagerSlice.reducer,
    backlogs: BacklogsSlice.reducer,
    task: TaskManagerSlice.reducer,
    key: StateChangeSlice.reducer,
    dashboard: DashboardSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
