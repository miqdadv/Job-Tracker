import { createSlice } from "@reduxjs/toolkit";

const trackerSlice = createSlice({
  name: "tracker",
  initialState: {
    trackedApplications: [],
    filters: {
      status: "",
      search: "",
    },
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  },
  reducers: {
    setTrackedApplications: (state, action) => {
      state.trackedApplications = action.payload;
    },
    addTrackedApplication: (state, action) => {
      state.trackedApplications.unshift(action.payload);
    },
    // Replace temp ID with real ID after successful API response
    replaceTempApplication: (state, action) => {
      const { tempId, realApplication } = action.payload;
      const index = state.trackedApplications.findIndex(
        (app) => app._id === tempId
      );
      if (index !== -1) {
        state.trackedApplications[index] = realApplication;
      }
    },
    updateTrackedApplication: (state, action) => {
      const index = state.trackedApplications.findIndex(
        (app) => app._id === action.payload._id
      );
      if (index !== -1) {
        state.trackedApplications[index] = action.payload;
      }
    },
    removeTrackedApplication: (state, action) => {
      state.trackedApplications = state.trackedApplications.filter(
        (app) => app._id !== action.payload
      );
    },
    // Restore application on failed delete (optimistic rollback)
    restoreTrackedApplication: (state, action) => {
      const { application, index } = action.payload;
      state.trackedApplications.splice(index, 0, application);
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.pagination.page = 1; // Reset to first page when filter changes
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.page = 1; // Reset to first page when search changes
    },
    clearFilters: (state) => {
      state.filters = { status: "", search: "" };
      state.pagination.page = 1; // Reset to first page when filters cleared
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTrackedApplications,
  addTrackedApplication,
  replaceTempApplication,
  updateTrackedApplication,
  removeTrackedApplication,
  restoreTrackedApplication,
  setPagination,
  setPage,
  setStatusFilter,
  setSearchFilter,
  clearFilters,
  setLoading,
  setError,
} = trackerSlice.actions;

export default trackerSlice.reducer;
