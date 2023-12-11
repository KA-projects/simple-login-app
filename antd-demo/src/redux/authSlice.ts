import { createSlice } from "@reduxjs/toolkit";

type State = {
  isAuth: boolean;
};

const initialState: State = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    haveAuth(state) {
      state.isAuth = true;
    },
    notAuth(state) {
      state.isAuth = false;
    },
  },
});

export const { haveAuth, notAuth } = authSlice.actions;

export default authSlice.reducer;
