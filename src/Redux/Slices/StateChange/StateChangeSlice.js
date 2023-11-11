import { createSlice } from "@reduxjs/toolkit";

const StateChangeSlice = createSlice({
  name: "key",
  initialState: {
    keyId: null,
    showForm2:false,
    imageURL: "",
  },
  reducers: {
    setKeyId: (state, action) => {
      state.keyId = action.payload;
    },
    setShowForm2: (state, action) => {
      state.showForm2 = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
  },
});

export const { setKeyId,setShowForm2,setImageURL } = StateChangeSlice.actions;

export default StateChangeSlice;
