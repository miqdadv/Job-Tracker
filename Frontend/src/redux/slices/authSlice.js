import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage on initial load
const loadUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error loading user from storage:", error);
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: loadUserFromStorage(),
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // Persist to localStorage
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;