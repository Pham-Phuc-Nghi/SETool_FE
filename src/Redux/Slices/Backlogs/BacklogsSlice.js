import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../Services/HttpMethods";

const initialState = {
  dsTask: [],
  dsTaskEdit: {},
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
    builder.addCase(getDSTaskById.fulfilled, (state, action) => {
      state.dsTaskEdit = action.payload;
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

export const getDSTaskById = createAsyncThunk(
  "backlogs/getDSTaskById",
  async (taskID) => {
    try {
      const res = await getRequest(`/Task/backlog/${taskID}`);
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

export const editBacklogs = createAsyncThunk(
  "backlogs/editBacklogs",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      let { taskID, taskName, taskType, taskPriority, taskDescription } =
        values;
      const res = await putRequest(`/Task/backlog/${taskID}`, {
        taskName,
        taskType,
        taskPriority,
        taskDescription,
      });
      if (res.status === 200) {
        return fulfillWithValue("Đã edit task thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Edit task thất bại!");
    }
  }
);

export const editAssignee = createAsyncThunk(
  "backlogs/editAssignee",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      const projectID = sessionStorage.getItem("current_project");
      let {
        taskID,
        sprintID,
        assigneeID,
        reporterID,
        taskStartDay,
        taskEndDay,
      } = values;
      const res = await postRequest(
        `/Task/${projectID}/set-assignee-review/${taskID}`,
        { sprintID, assigneeID, reporterID, taskStartDay, taskEndDay }
      );
      if (res.status === 200) {
        return fulfillWithValue("Edit assignee thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Edit assignee thất bại!");
    }
  }
);

export const deleteBacklogs = createAsyncThunk(
  "backlogs/deleteBacklogs",
  async (taskID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await deleteRequest(`/Task/${taskID}`)
      if (res.status === 200) {
        return fulfillWithValue("Đã delete task thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Delete task thất bại!");
    }
  }
);
