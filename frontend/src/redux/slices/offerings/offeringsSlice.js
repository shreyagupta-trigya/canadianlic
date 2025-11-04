import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch All Offerings (only once on first load)
export const fetchOfferings = createAsyncThunk("offerings/fetchAll", async () => {
  const res = await axiosInstance.get("ProductFunction/getallofferings");
  return res.data.offerings;
});

// ✅ Fetch Single Offering
export const fetchSingleOffering = createAsyncThunk("offerings/fetchSingle", async (id) => {
  const res = await axiosInstance.get(`ProductFunction/getsingleproduct/${id}`);
  return res.data.offering;
});

const offeringSlice = createSlice({
  name: "offerings",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false,
    },
    single: {
      data: null,
      loading: false,
      error: null,
    },
  },
  reducers: {
    // Add Offering
    addOfferingToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    // Update Offering
    updateOfferingInList: (state, action) => {
      const index = state.all.data.findIndex(offering => offering.ROWID === action.payload.ROWID);
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    // Delete Offering
    deleteOfferingFromList: (state, action) => {
      state.all.data = state.all.data.filter(offering => offering.ROWID !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferings.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchOfferings.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload;
        state.all.fetched = true;
      })
      .addCase(fetchOfferings.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.error.message;
      })
      .addCase(fetchSingleOffering.pending, (state) => {
        state.single.loading = true;
        state.single.error = null;
      })
      .addCase(fetchSingleOffering.fulfilled, (state, action) => {
        state.single.loading = false;
        state.single.data = action.payload;
      })
      .addCase(fetchSingleOffering.rejected, (state, action) => {
        state.single.loading = false;
        state.single.error = action.error.message;
      });
  },
});

export const {
  addOfferingToList,
  updateOfferingInList,
  deleteOfferingFromList,
} = offeringSlice.actions;

export default offeringSlice.reducer;
