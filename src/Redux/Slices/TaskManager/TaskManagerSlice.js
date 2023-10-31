import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../Services/HttpMethods";

const initialState = {
  dsMyTask: [],
  dsMyTaskDetail: {},
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
    builder.addCase(getDSMytaskDetail.fulfilled, (state, action) => {
      state.dsMyTaskDetail = action.payload;
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

export const getDSMytaskDetail = createAsyncThunk(
  "task/getDSMytaskDetail",
  async (taskID) => {
    try {
      const res = await getRequest(`/Task/get-task-detail/${taskID}`);
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
        return fulfillWithValue(res.data.message[0]);
      }
      if (res.response?.status === 400) {
        return rejectWithValue(res.response.data.message[0]);
      }
    } catch (error) {
      return rejectWithValue("Chuyển task thất bại!");
    }
  }
);
export const createComment = createAsyncThunk(
  "task/createComment",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      let { taskID, commentContent } = values;
      const res = await postRequest(`/Comment/create-comment/${taskID}`, {
        commentContent,
      });
      console.log(res);
      if (res.status === 200) {
        return fulfillWithValue(res.data);
      }
      if (res.response?.status === 400) {
        return rejectWithValue(res.response.data.message[0]);
      }
    } catch (error) {
      return rejectWithValue("Add comment thất bại!");
    }
  }
);
