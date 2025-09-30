import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Get user and token from localStorage if available
const user = JSON.parse(localStorage.getItem("user"));

export const initialState = {
  user: user || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// ✅ REGISTER THUNK
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register-user",
        userData
      );
      return response.data.userDetails;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed!";
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ✅ LOGIN THUNK (fixed shape)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        userData
      );

      // 🧠 Fix: match expected payload structure
      return {
        userDetails: response.data.data,
        token: response.data.token,
      };
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Login failed!";
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ✅ GET SINGLE USER THUNK
export const getSingleUser = createAsyncThunk(
  "auth/getSingleUser",
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/user-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        }
      );
      return response.data.userDetails;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// ✅ AUTH SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthSate: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // 🟦 REGISTER FLOW
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      // 🟩 LOGIN FLOW
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const data = action.payload || {};
        const user = data.userDetails || null;
        const token = data.token || null;

        state.user = user;
        state.token = token;

        if (user && token) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      });
  },
});

export const { clearAuthSate } = authSlice.actions;
export default authSlice.reducer;
