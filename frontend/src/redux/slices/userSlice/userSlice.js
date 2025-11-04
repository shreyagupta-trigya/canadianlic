// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  // Will hold only allowed fields
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Keep only allowed fields
      const { employeeName, email, phoneNumber, rolesName, ROWID } = action.payload;
      state.user = { employeeName, email, phoneNumber, rolesName, ROWID };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
