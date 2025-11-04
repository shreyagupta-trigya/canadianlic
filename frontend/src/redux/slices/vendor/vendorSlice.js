import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchVendors = createAsyncThunk(
    "vendors/fetchAll",
    async (page = 1, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/finance/get-vendor-list", { page });
            return { page, vendor: res.data.vendor }
        } catch (error) {
            // Handle API error response
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);



const vendorSlice = createSlice({
    name: "vendors",
    initialState: {
        all: {
            data: [],
            loading: false,
            error: null,
            fetched: false, // ✅ flag to prevent refetching
        },
    },
    reducers: {
        // Add vendor Item
        addVendorToList: (state, action) => {
            state.all.data.unshift(action.payload);
        },

        // Update vendor Item
        updateVendorToList: (state, action) => {
            const index = state.all.data.findIndex(item => item.ROWID === action.payload.ROWID);
            if (index !== -1) {
                state.all.data[index] = action.payload;
            }
        },

        // Delete vendor Item
        deleteVendorToList: (state, action) => {
            state.all.data = state.all.data.filter(item => item.ROWID !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendors.pending, (state) => {
                state.all.loading = true;
                state.all.error = null;
            })
            .addCase(fetchVendors.fulfilled, (state, action) => {
                state.all.loading = false;
                if (action.payload.page === 1) {
                    // First page = replace data
                    state.all.data = action.payload.vendor || [];
                } else {
                    // Append other pages
                    state.all.data = [...state.all.data, ...(action.payload.vendor || [])];
                }
                state.all.fetched = true;
            })
            .addCase(fetchVendors.rejected, (state, action) => {
                state.all.loading = false;
                state.all.error = action.payload || action.error.message;
            });
    },
});


export const {
    addVendorToList,
    updateVendorToList,
    deleteVendorToList,
} = vendorSlice.actions;

export default vendorSlice.reducer;

