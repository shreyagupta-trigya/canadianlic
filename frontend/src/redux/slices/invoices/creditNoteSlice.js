import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axios/axiosInstance";

export const fetchCreditNotes = createAsyncThunk(
  "creditNotes/fetchAll",
  async () => {
    const res = await axiosInstance.get("crm/get-credit-notes");
    console.log("Credit Notes Response:", res);
    return res.data.creditNotes; 
  }
);

const creditNotesSlice = createSlice({
  name: "creditNotes",
  initialState: {
    all: {
      data: [],
      loading: false,
      error: null,
      fetched: false,
    },
  },
  reducers: {
    addCreditNoteToList: (state, action) => {
      state.all.data.unshift(action.payload);
    },

    updateCreditNoteInList: (state, action) => {
      const index = state.all.data.findIndex(
        (creditNote) => creditNote.ROWID === action.payload.ROWID
      );
      if (index !== -1) {
        state.all.data[index] = action.payload;
      }
    },

    deleteCreditNoteFromList: (state, action) => {
      state.all.data = state.all.data.filter(
        (creditNote) => creditNote.ROWID !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreditNotes.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchCreditNotes.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all.data = action.payload;
        state.all.fetched = true;
      })
      .addCase(fetchCreditNotes.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.error.message;
      });
  },
});

export const {
  addCreditNoteToList,
  updateCreditNoteInList,
  deleteCreditNoteFromList,
} = creditNotesSlice.actions;

export default creditNotesSlice.reducer;
