import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../../Services/HttpMethods";

const initialState = {
  dsProject: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};

export const HomePagesSlice = createSlice({
  name: "homepage",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDSProject.fulfilled, (state, action) => {
      state.dsProject = action.payload;
    });
  },
});

export const getDSProject = createAsyncThunk(
  "homepage/getDSProject",
  async () => {
    try {
      const res = await getRequest(`projects/get-project-by-userID`);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const createProject = createAsyncThunk(
  "homepage/createProject",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      let {
        projectName,
        projectDescription,
        projectTotalSprint,
        projectDayPerSprint,
      } = values;
      const res = await postRequest(`projects/create-project`, {
        projectName,
        projectDescription,
        projectTotalSprint,
        projectDayPerSprint,
      });
      console.log(res.data);
      if (res.status === 200) {
        return fulfillWithValue("Đã tạo project thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Tạo project thất bại!");
    }
  }
);
