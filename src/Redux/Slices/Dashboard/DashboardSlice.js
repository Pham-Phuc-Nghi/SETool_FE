import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../Services/HttpMethods";

const initialState = {
  dashboard: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDashboard.fulfilled, (state, action) => {
      state.dashboard = action.payload;
    });
  },
});

export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (sprintID) => {
    try {
      const projectID = sessionStorage.getItem("current_project");
      const res = await getRequest(`/Task/${projectID}/${sprintID}`);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
