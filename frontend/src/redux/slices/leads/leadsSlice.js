import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch All Leads (only once on first load)
export const fetchLeads = createAsyncThunk("leads/fetchAll", async () => {
  const res = await axiosInstance.get("crm/get-leads");
   return  res.data.leads;
});

// ✅ Fetch All Leads (only once on first load)
export const fetchAllLeads = async () => {
  const res = await axiosInstance.get("crm/get-leads");
  return res.data;
};

// ✅ Update Lead
export const updateLead = createAsyncThunk("leads/update", async ({ id, data }) => {
  const res = await axiosInstance.put(`crm/update-lead/${id}`, data);
  return res.data;
});

    
const leadSlice = createSlice({
  name: "leads",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false,
    },
  },
  reducers: {
    // Add Lead
    addLeadToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    // Update Lead
    updateLeadInList: (state, action) => {
      const index = state.all.data.findIndex(lead => lead.ROWID === action.payload.ROWID);
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    // Delete Lead
    deleteLeadFromList: (state, action) => {
      state.all.data = state.all.data.filter(lead => lead.ROWID !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload;
        state.all.fetched = true;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.error.message;
      });
  },
});


export const {
  addLeadToList,
  updateLeadInList,
  deleteLeadFromList,
} = leadSlice.actions;

export default leadSlice.reducer;

