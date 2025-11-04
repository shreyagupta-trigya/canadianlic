import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchShipments = createAsyncThunk(
    "shipments/fetchAll",
    async (page = 1, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/finance/get-shipment-list", { page });
            return { page, shipment: res.data.shipment }
        } catch (error) {
            // Handle API error response
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);



const shipmentSlice = createSlice({
    name: "shipments",
    initialState: {
        all: {
            data: [],
            loading: false,
            error: null,
            fetched: false, // ✅ flag to prevent refetching
        },
    },
    reducers: {
        // Add Shipment Item
        addShipmentToList: (state, action) => {
            state.all.data.unshift(action.payload);
        },

        // Update Shipment Item
        updateShipmentToList: (state, action) => {
            const index = state.all.data.findIndex(item => item.ROWID === action.payload.ROWID);
            if (index !== -1) {
                state.all.data[index] = action.payload;
            }
        },

        // Delete Shipment Item
        deleteShipmentToList: (state, action) => {
            state.all.data = state.all.data.filter(item => item.ROWID !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShipments.pending, (state) => {
                state.all.loading = true;
                state.all.error = null;
            })
            .addCase(fetchShipments.fulfilled, (state, action) => {
                state.all.loading = false;
                if (action.payload.page === 1) {
                    // First page = replace data
                    state.all.data = action.payload.shipment || [];
                } else {
                    // Append other pages
                    state.all.data = [...state.all.data, ...(action.payload.shipment || [])];
                }
                state.all.fetched = true;
            })
            .addCase(fetchShipments.rejected, (state, action) => {
                state.all.loading = false;
                state.all.error = action.payload || action.error.message;
            });
    },
});


export const {
    addShipmentToList,
    updateShipmentToList,
    deleteShipmentToList,
} = shipmentSlice.actions;

export default shipmentSlice.reducer;

