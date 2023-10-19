import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../../services/httpMethod";

const initialState = {
    id: "",
    name: "",
    email: "",
    accessToken: "",
    imageFile: "",
};

export const DangNhapSlice = createSlice({
    name: 'dang_nhap',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.imageFile = action.payload.userInfor.imageFile;
            })
    },
})

export const authenticate = createAsyncThunk(
    'dang_nhap/authenticate',
    async (data, { rejectWithValue }) => {
        try {
            const { email, password } = data;
            const res = await postRequest(`User/authenticate`, { email, password });
            if (res.data) {
                return res.data;
            }
            if (res.data.status === 400) {
                return rejectWithValue(res.data.error);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)