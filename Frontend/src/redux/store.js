import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import jobReducer from "./slices/jobSlice.js";
import trackerReducer from "./slices/trackerSlice.js";
import bookmarkReducer from "./slices/bookmarkSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    tracker: trackerReducer,
    bookmark: bookmarkReducer,
  },
});

export default store;