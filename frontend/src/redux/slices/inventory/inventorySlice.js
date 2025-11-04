import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch All Leads (only once on first load)
export const fetchInventory = createAsyncThunk(
    "inventory/fetchAll",
    async (page = 1, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/finance/get-inventory", { page: page });
            return { page, inventory: res.data.inventory }
        } catch (error) {
            // Handle API error response
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);



const inventorySlice = createSlice({
    name: "inventory",
    initialState: {
        all: {
            data: [],
            loading: false,
            error: null,
            fetched: false, // ✅ flag to prevent refetching
        },
    },
    reducers: {
        // Add Inventory Item
        addInventoryItem: (state, action) => {
            state.all.data.unshift(action.payload);
        },

        // Update Inventory Item
        updateInventoryItem: (state, action) => {
            const index = state.all.data.findIndex(item => item.ROWID === action.payload.ROWID);
            if (index !== -1) {
                state.all.data[index] = action.payload;
            }
        },

        // Delete Inventory Item
        deleteInventoryItem: (state, action) => {
            state.all.data = state.all.data.filter(item => item.ROWID !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => {
                state.all.loading = true;
                state.all.error = null;
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.all.loading = false;
                if (action.payload.page === 1) {
                    // First page = replace data
                    state.all.data = action.payload.inventory || [];
                } else {
                    // Append other pages
                    state.all.data = [...state.all.data, ...(action.payload.inventory || [])];
                }
                state.all.fetched = true;
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.all.loading = false;
                state.all.error = action.payload || action.error.message;
            });
    },
});


export const {
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
} = inventorySlice.actions;

export default inventorySlice.reducer;

