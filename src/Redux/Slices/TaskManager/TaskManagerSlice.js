import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, patchRequest } from "../../../Services/HttpMethods";

const initialState = {
  dsMyTask: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};

export const TaskManagerSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDSMytask.fulfilled, (state, action) => {
      state.dsMyTask = action.payload;
    });
  },
});

export const getDSMytask = createAsyncThunk(
  "task/getDSMytask",
  async (sprintID) => {
    const projectID = sessionStorage.getItem("current_project");
    try {
      const res = await getRequest(`/Task/${projectID}/${sprintID}/my-task`);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const updateMytask = createAsyncThunk(
  "task/updateMytask",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      let { taskID, newStatus } = values;
      const res = await patchRequest(
        `/Task/change-task-status/${taskID}/${newStatus}`
      );
      if (res.status === 200) {
        return fulfillWithValue("Đã chuyển task thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Chuyển task thất bại!");
    }
  }
);
