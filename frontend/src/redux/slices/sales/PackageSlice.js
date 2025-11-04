import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPackages = createAsyncThunk("packages/fetchAll", async () => {
  const res = await axiosInstance.post("finance/get-package-list");
  return res.data.package;
});


export const fetchAllPackages = async () => {
  const res = await axiosInstance.get("finance/get-package-list");
  return res.data;
};

const packageSlice = createSlice({
  name: "packages",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false,
    },
  },
  reducers: {

    addPackageToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    updatePackageInList: (state, action) => {
      const index = state.all.data.findIndex(pkg => pkg.ROWID === action.payload.ROWID);
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    deletePackageFromList: (state, action) => {
      state.all.data = state.all.data.filter(pkg => pkg.ROWID !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload;
        state.all.fetched = true;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.error.message;
      });
  },
});

export const {
  addPackageToList,
  updatePackageInList,
  deletePackageFromList,
} = packageSlice.actions;

export default packageSlice.reducer;
