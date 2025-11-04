import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch All Advisors (only once on first load)
export const fetchAdvisors = createAsyncThunk(
  "advisors/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/v1/getalladvisors", { page: 1, limit: 30 });
      return res.data;
    } catch (error) {
      // Handle API error response
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const advisorSlice = createSlice({
  name: "advisors",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetchedAdvisors: false, // ✅ flag to prevent refetching
    },
  },
  reducers: {
    // Add Advisor
    addAdvisorToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    // Update Advisor
    updateAdvisorInList: (state, action) => {
      const index = state.all.data.findIndex(advisor => advisor.ROWID === action.payload.ROWID);
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    // Delete Advisor
    deleteAdvisorFromList: (state, action) => {
      state.all.data = state.all.data.filter(advisor => advisor.ROWID !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvisors.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchAdvisors.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload.adv || [];
        state.all.fetchedAdvisors = true;
      })
      .addCase(fetchAdvisors.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload || action.error.message;
      });
  },
});

export const {
  addAdvisorToList,
  updateAdvisorInList,
  deleteAdvisorFromList,
} = advisorSlice.actions;

export default advisorSlice.reducer;
