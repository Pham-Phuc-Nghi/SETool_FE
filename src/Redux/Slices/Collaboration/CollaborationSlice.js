import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  putRequest,
} from "../../../Services/HttpMethods";

const initialState = {
  dsMember: [],
  dsMemberList: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
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
  },
});

export const getDSMember = createAsyncThunk(
  "collaboration/getDSMember",
  async (projectID) => {
    try {
      console.log("ProjectID current: ", projectID);
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
        return fulfillWithValue("Edit role thành công");
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
        return fulfillWithValue("Delete member thành công");
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
