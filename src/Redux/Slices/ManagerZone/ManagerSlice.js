import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../Services/HttpMethods";

const initialState = {
  dsSprint: [],
  projectDetails: {},
  dsDev: [],
  dsQA: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};

export const ManagerSlice = createSlice({
  name: "manager",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDSSprint.fulfilled, (state, action) => {
      state.dsSprint = action.payload;
    });
    builder.addCase(getProjectDetails.fulfilled, (state, action) => {
      state.projectDetails = action.payload;
    });
    builder.addCase(getListDev.fulfilled, (state, action) => {
      state.dsDev = action.payload;
    });
    builder.addCase(getListQA.fulfilled, (state, action) => {
      state.dsQA = action.payload;
    });
  },
});

export const getDSSprint = createAsyncThunk(
  "manager/getDSSprint",
  async (projectID) => {
    try {
      const res = await getRequest(`sprints/${projectID}`);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getListDev = createAsyncThunk(
  "manager/getListDev",
  async (projectID) => {
    let roleID = 3;
    try {
      const res = await getRequest(
        `/projects/list-all-member-by-role/${projectID}/${roleID}`
      );
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getListQA = createAsyncThunk(
  "manager/getListQA",
  async (projectID) => {
    let roleID = 4;
    try {
      const res = await getRequest(
        `/projects/list-all-member-by-role/${projectID}/${roleID}`
      );
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getProjectDetails = createAsyncThunk(
  "manager/getProjectDetails",
  async (projectID) => {
    try {
      const res = await getRequest(`/projects/get-project-detail/${projectID}`);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const editProject = createAsyncThunk(
  "manager/editProject",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    const projectID = sessionStorage.getItem("current_project");
    try {
      let {
        projectName,
        projectDescription,
        projectStartDay,
        projectEndDay,
        projectTotalSprint,
        projectDayPerSprint,
      } = values;
      const res = await putRequest(`/projects/update-project/${projectID}`, {
        projectName,
        projectDescription,
        projectStartDay,
        projectEndDay,
        projectTotalSprint,
        projectDayPerSprint,
      });
      if (res.status === 200) {
        return fulfillWithValue("Edit project thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Edit project thất bại!");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "manager/deleteProject",
  async (projectID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await deleteRequest(`/projects/delete-project/${projectID}`);
      if (res.status === 200) {
        return fulfillWithValue("Đã delete project thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Delete project thất bại!");
    }
  }
);

export const createSprint = createAsyncThunk(
  "manager/createSprint",
  async (projectID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await postRequest(`/sprints/create-sprint/${projectID}`);
      if (res.status === 200) {
        return fulfillWithValue("Đã tạo sprint thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Tạo sprint thất bại!");
    }
  }
);

export const editSprint = createAsyncThunk(
  "manager/editSprint",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      let { sprintID, sprintDuration, sprintDescription } = values;
      const res = await putRequest(`/sprints/update-sprint/${sprintID}`, {
        sprintDuration,
        sprintDescription,
      });
      if (res.status === 200) {
        return fulfillWithValue("Edit sprint thành công");
      }
      if (res.response?.status === 400) {
        const err = res.response.data;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Edit sprint thất bại!");
    }
  }
);
