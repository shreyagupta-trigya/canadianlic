import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Referral Clients
export const fetchReferralClients = createAsyncThunk(
  "referralClient/fetchAll",
  async ({ id, limit = 10, offset = 0 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/canadianlicapi/contact/client/api/v2/get-refferal-contact/${id}`, {
        params: { limit, offset }
      });
      return res.data.response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Create Referral Client
export const createReferralClient = createAsyncThunk(
  "referralClient/create",
  async ({ data, referralLeadId }, { rejectWithValue }) => {
    try {
      const payload = {
        ...data,
        referralLeadId,
      };
      const res = await axiosInstance.put("/canadianlicapi/contact/client/api/v2/create-contact", payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const referralClientSlice = createSlice({
  name: "referralClient",
  initialState: {
    data: [],
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    addReferralClient: (state, action) => {
      state.data.unshift(action.payload);
    },
    updateReferralClient: (state, action) => {
      const index = state.data.findIndex(client => client.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteReferralClient: (state, action) => {
      state.data = state.data.filter(client => client.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferralClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferralClients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.fetched = true;
      })
      .addCase(fetchReferralClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createReferralClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReferralClient.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally add the new client to the list
        // state.data.unshift(action.payload);
      })
      .addCase(createReferralClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  addReferralClient,
  updateReferralClient,
  deleteReferralClient,
} = referralClientSlice.actions;

export default referralClientSlice.reducer;
