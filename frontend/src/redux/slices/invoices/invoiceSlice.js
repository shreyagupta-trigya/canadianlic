import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axios/axiosInstance";

export const fetchInvoices = createAsyncThunk("invoices/fetchAll", async () => {
  const res = await axiosInstance.post("finance/get-invoice-list",{page:1});
  console.log("Invoices Response:", res);
  return res.data.invoice; 
});

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false,
    },
  },
  reducers: {
    addInvoiceToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    updateInvoiceInList: (state, action) => {
      const index = state.all.data.findIndex(
        (invoice) => invoice.ROWID === action.payload.ROWID
      );
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    deleteInvoiceFromList: (state, action) => {
      state.all.data = state.all.data.filter(
        (invoice) => invoice.ROWID !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload;
        state.all.fetched = true;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.error.message;
      });
  },
});

export const {
  addInvoiceToList,
  updateInvoiceInList,
  deleteInvoiceFromList,
} = invoicesSlice.actions;

export default invoicesSlice.reducer;
