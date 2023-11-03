import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../Services/HttpMethods";

const initialState = {
  dsMember: [],
  dsMemberList: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
  userInfoID: "",
  userInfoName: "",
  userInfoEmail: "",
};

export const CollaborationSlice = createSlice({
  name: "collaboration",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDSMember.fulfilled, (state, action) => {
      state.dsMember = action.payload;
    });
    builder.addCase(getDSAllMember.fulfilled, (state, action) => {
      state.dsMemberList = action.payload;
    });
    builder.addCase(searchUserInfo.fulfilled, (state, action) => {
      // console.log("🚀 ~ file: CollaborationSlice.js:30 ~ builder.addCase ~ payload:", action.payload)
      state.userInfoID = action.payload.id;
      state.userInfoName = action.payload.name;
      state.userInfoEmail = action.payload.email;
    });
  },
});

export const addMemberToProject = createAsyncThunk(
  "collaboration/addMemberToProject",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { projectID, newUserID, role } = data;
      const res = await postRequest(
        `projects/add-member-to-project/${projectID}/${newUserID}/${role}`
      );
      if (res.status == 200) {
        return fulfillWithValue(res.data.message);
      }
      if (res.response.status === 400) {
        return rejectWithValue(res.response.data.message);
      }
    } catch (error) {
      return rejectWithValue("Something went wrong.");
    }
  }
);

export const searchUserInfo = createAsyncThunk(
  "collaboration/searchUserInfo",
  async (data, { rejectWithValue }) => {
    try {
      const { projectID, inviterInfo } = data;
      const res = await getRequest(
        `projects/get-info/${projectID}/${inviterInfo}`
      );
      if (res.status == 200) {
        return res.data;
      }
      if (res.response.status === 400) {
        return rejectWithValue(res.response.data.message);
      }
    } catch (error) {
      return rejectWithValue("Something went wrong.");
    }
  }
);

export const getDSMember = createAsyncThunk(
  "collaboration/getDSMember",
  async (projectID) => {
    try {
      const res = await getRequest(
        `projects/get-all-users-in-project/${projectID}`
      );
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getDSAllMember = createAsyncThunk(
  "collaboration/getDSAllMember",
  async (projectID) => {
    try {
      const res = await getRequest(
        `/projects/get-all-users-in-project/${projectID}`
      );
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const editRole = createAsyncThunk(
  "collaboration/editRole",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      const projectID = sessionStorage.getItem("current_project");
      let { changeeID, role } = values;
      const res = await putRequest(
        `/projects/update-user-role/${projectID}/${changeeID}`,
        role
      );
      if (res.status === 200) {
        return fulfillWithValue(res.data.message);
      }
      if (res.response?.status === 400) {
        const err = res.response.data;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Edit role thất bại!");
    }
  }
);

export const deleteMember = createAsyncThunk(
  "collaboration/deleteMember",
  async (removeID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const projectID = sessionStorage.getItem("current_project");
      const res = await deleteRequest(
        `/projects/remove-user-from-project/${projectID}/${removeID}`
      );
      if (res.status === 200) {
        return fulfillWithValue(res.data.message);
      }
      if (res.response?.status === 400) {
        const err = res.response.data;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Delete member thất bại!");
    }
  }
);
