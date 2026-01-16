import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        searchedQuery: "",
        loading: false,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setJobLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setAllJobs, setSearchedQuery, setJobLoading } = jobSlice.actions;

export default jobSlice.reducer;