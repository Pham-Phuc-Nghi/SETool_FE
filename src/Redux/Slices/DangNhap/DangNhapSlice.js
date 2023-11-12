import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../../Services/HttpMethods";
import { handleDangNhap } from "../../../config/AxiosInstance";

const initialState = {
  id: "",
  name: "",
  email: "",
  accessToken: "",
  emailConfirmOtp: null,
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
    builder.addCase(verifyVsLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      //state.imageFile = action.payload.userInfor.imageFile;
    });
  },
});

export const verifyVsLogin = createAsyncThunk(
  "dang_nhap/verifyVsLogin",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { email, otp } = data;
      const res = await postRequest(
        `User/verify-email-in-email-url/${email}/${otp}`
      );
      console.log(res);

      if (res.status === 200) {
        handleDangNhap(res.data.accessToken);
        sessionStorage.setItem("name_current", res.data.name);
        return fulfillWithValue(res.data.message);
      } else {
        return rejectWithValue(res.response.data.message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  "dang_nhap/login",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const res = await postRequest(`User/authenticate`, { email, password });
      if (res.status === 200) {
        //console.log("🚀 ~ Đăng Nhập Thành Công ~ :", res);
        sessionStorage.setItem("id_current", res.data.id);
        sessionStorage.setItem("email_current", res.data.email);
        return res.data;
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;

        return rejectWithValue(err);
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
      // console.log("Status api: ", res);
      if (res.data?.status === 200) {
        return fulfillWithValue(res.data.message);
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        // console.log("loi", err);
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Đăng ký không thành công!");
    }
  }
);

export const changePassword = createAsyncThunk(
  "dang_nhap/changePassword",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      let { password, newPassword } = values;
      const res = await postRequest(`/User/change-password`, {
        password,
        newPassword,
      });
      if (res.status === 200) {
        return fulfillWithValue(res.data.message);
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Đăng ký không thành công!");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "dang_nhap/forgotPassword",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      let { email } = values;
      const res = await postRequest(`/User/forgot-password/${email}`);
      if (res.status === 200) {
        return fulfillWithValue(res.data.message);
      }
      if (res.response?.status === 400) {
        const err = res.response.data.error;
        return rejectWithValue(err);
      }
    } catch (error) {
      return rejectWithValue("Submit không thành công!");
    }
  }
);
