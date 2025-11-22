import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch All Policies (only once on first load)
export const fetchPolicies = createAsyncThunk("policies/fetchAll", async () => {
  const res = await axiosInstance.get("crm/get-policies");
  return res.data.policies;
});

// ✅ Fetch All Policies (only once on first load)
export const fetchAllPolicies = async () => {
  const res = await axiosInstance.get("crm/get-policies");
  return res.data;
};

// ✅ Update Policy
export const updatePolicy = createAsyncThunk("policies/update", async ({ id, data }) => {
  const res = await axiosInstance.put(`crm/update-policy/${id}`, data);
  return res.data;
});


const policySlice = createSlice({
  name: "policies",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false,
    },
  },
  reducers: {
    // Add Policy
    addPolicyToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    // Update Policy
    updatePolicyInList: (state, action) => {
      const index = state.all.data.findIndex(policy => policy.ROWID === action.payload.ROWID);
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    // Delete Policy
    deletePolicyFromList: (state, action) => {
      state.all.data = state.all.data.filter(policy => policy.ROWID !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload;
        state.all.fetched = true;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.error.message;
      });
  },
});


export const {
  addPolicyToList,
  updatePolicyInList,
  deletePolicyFromList,
} = policySlice.actions;

export default policySlice.reducer;
