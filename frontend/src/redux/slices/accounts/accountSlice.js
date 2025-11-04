import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch All Leads (only once on first load)
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/crm/get-company",{page:1});
      return res.data;
    } catch (error) {
      // Handle API error response
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);



const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false, // ✅ flag to prevent refetching
    },
  },
  reducers: {
    // Add Account
    addAccountToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    // Update Account
    updateAccountInList: (state, action) => {
      const index = state.all.data.findIndex(account => account.ROWID === action.payload.ROWID);
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    // Delete Account
    deleteAccountFromList: (state, action) => {
      state.all.data = state.all.data.filter(account => account.ROWID !== action.payload);
    },

    // Reorder Accounts
    reorderAccounts: (state, action) => {
      state.all.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload.companies;
        state.all.fetched = true;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.all.loading = false;
         state.all.error = action.payload || action.error.message;
      });
  },
});


export const {
  addAccountToList,
  updateAccountInList,
  deleteAccountFromList,
  reorderAccounts,
} = accountSlice.actions;

export default accountSlice.reducer;
