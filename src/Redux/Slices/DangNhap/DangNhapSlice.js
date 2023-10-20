import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../../Services/HttpMethods";

const initialState = {
  id: "",
  name: "",
  email: "",
  accessToken: "",
  //imageFile: "",
};

export const DangNhapSlice = createSlice({
  name: "dang_nhap",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      //state.imageFile = action.payload.userInfor.imageFile;
    });
  },
});

export const login = createAsyncThunk(
  "dang_nhap/login",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const res = await postRequest(`User/authenticate`, { email, password });
      if (res.status === 200) {
        console.log("🚀 ~ Đăng Nhập Thành Công ~ :", res);
        return res.data;
      }
      if (res.status === 400) {
        return rejectWithValue(res.error);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const create = createAsyncThunk(
  "dang_nhap/create",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      let { name, email, password, confirmPassword } = values;
      const res = await postRequest(`User/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
      console.log("Status api: ", res);
      if (res.data?.status === 200) {
        return fulfillWithValue("Đăng ký thành công", 1.5);
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        console.log("loi", err);
        return rejectWithValue(err);
      }
    } catch (error) { 
      return rejectWithValue("Đăng ký không thành công!", 1.5);
    }
  }
);

export const otp = createAsyncThunk(
  "dang_nhap/otp",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      let { email, otp } = values;
      const res = await postRequest(`User/verify-email/${email}/${otp}`);
      console.log("Status api: ", res.data);
      if (res.data?.status === 200) {
        return fulfillWithValue("Đăng ký thành công", 1.5);
      }
    } catch (error) {
      return rejectWithValue("Đăng ký không thành công!", 1.5);
    }
  }
);
