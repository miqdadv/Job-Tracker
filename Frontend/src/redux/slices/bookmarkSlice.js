import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmarkedJobs: [], // Array of full job objects
  },
  reducers: {
    addBookmark: (state, action) => {
      const job = action.payload;
      if (!state.bookmarkedJobs.find((j) => j._id === job._id)) {
        state.bookmarkedJobs.push(job);
      }
    },
    removeBookmark: (state, action) => {
      const jobId = action.payload;
      state.bookmarkedJobs = state.bookmarkedJobs.filter((j) => j._id !== jobId);
    },
    toggleBookmark: (state, action) => {
      const job = action.payload;
      const exists = state.bookmarkedJobs.find((j) => j._id === job._id);
      if (exists) {
        state.bookmarkedJobs = state.bookmarkedJobs.filter((j) => j._id !== job._id);
      } else {
        state.bookmarkedJobs.push(job);
      }
    },
    clearAllBookmarks: (state) => {
      state.bookmarkedJobs = [];
    },
  },
});

export const { addBookmark, removeBookmark, toggleBookmark, clearAllBookmarks } =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;
