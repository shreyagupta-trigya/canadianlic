import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axios/axiosInstance";

export const fetchDeals = createAsyncThunk("deals/fetchAll", async () => {
  const res = await axiosInstance.get("crm/get-deals");
  console.log("resssss",res);
  return res.data.deals;
});

const dealsSlice = createSlice({
  name: "deals",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false,
    },
  },          
  reducers: {
    addDealToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    updateDealInList: (state, action) => {
      const index = state.all.data.findIndex(
        (deal) => deal.ROWID === action.payload.ROWID
      );
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    deleteDealFromList: (state, action) => {
      state.all.data = state.all.data.filter(
        (deal) => deal.ROWID !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload;
        state.all.fetched = true;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.error.message;
      });
  },
});

export const {
  addDealToList,
  updateDealInList,
  deleteDealFromList,
} = dealsSlice.actions;

export default dealsSlice.reducer;
