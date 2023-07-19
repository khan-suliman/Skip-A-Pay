import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import axios from "util/axios";

const initialState = {
  user: null,
  token: null,
  accountsCount: 0,
  submittedFormsCount: [0, 0],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response?.data?.error || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await authService.logout();
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.submittedFormsCount = [0, 0];
      state.accountsCount = 0;
      state.message = "";
    },
    setSubmittedFormsCount: (state, action) => {
      return {
        ...state,
        submittedFormsCount: [
          action.payload.count || state.submittedFormsCount[0],
          action.payload.daysCount || state.submittedFormsCount[1],
        ],
      };
    },
    setAccountsCount: (state, action) => {
      return { ...state, accountsCount: action.payload };
    },
    logout: (state) => {
      delete axios.defaults.headers.common.Authorization;
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: null,
        accountsCount: 0,
        submittedFormsCount: [0, 0],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = { ...action.payload.admin };
        state.token = action.payload.token;
        axios.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        delete axios.defaults.headers.common.Authorization;
      });
  },
});

export const { reset, logout, setSubmittedFormsCount, setAccountsCount } =
  authSlice.actions;
export default authSlice.reducer;
