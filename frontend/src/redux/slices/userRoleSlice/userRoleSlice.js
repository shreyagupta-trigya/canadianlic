import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

// ✅ Fetch All Leads (only once on first load)
export const fetchUserRoles = createAsyncThunk(
  "user-role/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/get-role-list",{page:1});
      return res.data;
    } catch (error) {
      // Handle API error response
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);



const userRoleSlice = createSlice({
  name: "userRoles",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false, // ✅ flag to prevent refetching
    },
  },
  reducers: {
    // Add Role
    addRoleToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    // Update Role
    updateRoleInList: (state, action) => {
      const index = state.all.data.findIndex(role => role.id === action.payload.id);
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    // Delete Role
    deleteRoleFromList: (state, action) => {
      state.all.data = state.all.data.filter(role => role.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoles.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload.roles;
        state.all.fetched = true;
      })
      .addCase(fetchUserRoles.rejected, (state, action) => {
        state.all.loading = false;
         state.all.error = action.payload || action.error.message;
      });
  },
});


export const {
  addRoleToList,
  updateRoleInList,
  deleteRoleFromList,
} = userRoleSlice.actions;

export default userRoleSlice.reducer;

