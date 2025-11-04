import axiosInstance from "@/services/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch All Leads (only once on first load)
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/crm/get-contact",{page:1});
      return res.data;
    } catch (error) {
      // Handle API error response
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);



const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetchedContacts: false, // ✅ flag to prevent refetching
    },
  },
  reducers: {
    // Add Contact
    addContactToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    // Update Contact
    updateContactInList: (state, action) => {
      const index = state.all.data.findIndex(contact => contact.ROWID === action.payload.ROWID);
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    // Delete Contact
    deleteContactFromList: (state, action) => {
      state.all.data = state.all.data.filter(contact => contact.ROWID !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload.contact;
        state.all.fetchedContacts = true;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.all.loading = false;
         state.all.error = action.payload || action.error.message;
      });
  },
});


export const {
  addContactToList,
  updateContactInList,
  deleteContactFromList,
} = contactSlice.actions;

export default contactSlice.reducer;

