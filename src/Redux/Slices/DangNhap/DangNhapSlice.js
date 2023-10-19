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
    name: 'dang_nhap',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.email = action.payload.email;
                //state.imageFile = action.payload.userInfor.imageFile;
            })
    },
})

export const login = createAsyncThunk(
    'dang_nhap/login',
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
)