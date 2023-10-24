import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../../Services/HttpMethods";

const initialState = {
  dsTask: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};

export const BacklogsSlice = createSlice({
  name: "backlogs",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDSTask.fulfilled, (state, action) => {
      state.dsTask = action.payload;
    });
  },
});

export const getDSTask = createAsyncThunk(
  "backlogs/getDSTask",
  async (projectID) => {
    try {
      const res = await getRequest(`/Task/${projectID}`);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const createBacklogs = createAsyncThunk(
  "backlogs/createBacklogs",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    const projectID = sessionStorage.getItem("current_project");
    try {
      let { taskName, taskType, taskPriority, taskDescription } = values;
      const res = await postRequest(`/Task/${projectID}/create-new-task`, {
        taskName,
        taskType,
        taskPriority,
        taskDescription,
      });
      if (res.status === 200) {
        return fulfillWithValue("Đã tạo task thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Tạo task thất bại!");
    }
  }
);