import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axios/axiosInstance";

export const fetchPayments = createAsyncThunk(
  "payments/fetchAll",
  async () => {
    const res = await axiosInstance.get("crm/get-payments");
    console.log("Payments Response:", res);
    return res.data.payments; 
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false,
    },
  },
  reducers: {
    addPaymentToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    updatePaymentInList: (state, action) => {
      const index = state.all.data.findIndex(
        (payment) => payment.ROWID === action.payload.ROWID
      );
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    deletePaymentFromList: (state, action) => {
      state.all.data = state.all.data.filter(
        (payment) => payment.ROWID !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload;
        state.all.fetched = true;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.error.message;
      });
  },
});

export const {
  addPaymentToList,
  updatePaymentInList,
  deletePaymentFromList,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
