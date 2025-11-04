import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchSalesOrders = createAsyncThunk(
  "salesOrders/fetchAll",
  async () => {
    const response = await axiosInstance.post("finance/get-sales-order-list",{page:1});
    return response.data.salesOrders; 
  }
);

const salesOrderSlice = createSlice({
  name: "salesOrders",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false,
    },
  },
  reducers: {
  
    addSalesOrderToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },


    updateSalesOrderInList: (state, action) => {
      const index = state.all.data.findIndex(
        (order) => order.ROWID === action.payload.ROWID);
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    deleteSalesOrderFromList: (state, action) => {
      state.all.data = state.all.data.filter(
        (order) => order.ROWID !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesOrders.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchSalesOrders.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload;
        state.all.fetched = true;
      })
      .addCase(fetchSalesOrders.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.error.message;
      });
  },
});

export const {
  addSalesOrderToList,
  updateSalesOrderInList,
  deleteSalesOrderFromList,
} = salesOrderSlice.actions;

export default salesOrderSlice.reducer;
