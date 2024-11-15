import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginstart: (state) => {
      state.loading = true;
    },
    //after we've fetched the data
    loginsuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginfailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatestart: (state) => {
      state.loading = true;
    },
    updatesuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updatefailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginstart, loginsuccess, loginfailure ,updatestart,updatesuccess,updatefailure} = userSlice.actions;

export default userSlice.reducer;
