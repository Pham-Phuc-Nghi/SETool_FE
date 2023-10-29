import { createSlice } from "@reduxjs/toolkit";

const StateChangeSlice = createSlice({
  name: "key",
  initialState: {
    keyId: null,
  },
  reducers: {
    setKeyId: (state, action) => {
      state.keyId = action.payload;
    },
  },
});

export const { setKeyId } = StateChangeSlice.actions;

export default StateChangeSlice;
