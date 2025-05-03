import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, AuthState } from "../../types/authTypes";


// const API_URL = import.meta.env.MODE === "development"
//   ? "http://localhost:5000/api/auth"
//   : "/api/auth";

const API_URL = "http://localhost:5000/api/user" 


axios.defaults.withCredentials = true;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  message: null,
};


// --- Async Thunks ---

export const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password, firstName, lastName }: { email: string; password: string; firstName: string; lastName: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, firstName, lastName });
      return response.data.user as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error signing up");
    }
  }
);


export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data.user as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error logging in");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout", 
  async (_, thunkAPI) => {
  try {
    await axios.post(`${API_URL}/logout`);
    return null;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Error logging out");
  }
});


// export const fetchAllUsers = createAsyncThunk<User[], void>(
//   'users/fetchAllUsers',
//   async () => {
//     return await userService.fetchAllUsers();
//   }
// );  We don't need this for user, it's for admin.

// export const getAUser = createAsyncThunk<User, string>(
//   'users/getAUser',
//   async (id) => {
//     return await userService.getAUser(id);
//   }
// );   We don't need this for user, it's for admin.

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (code: string, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      return response.data.user as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error verifying email");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth", 
  async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`);
    return response.data.user as User;
  } catch {
    return thunkAPI.rejectWithValue(null);
  }
});

// export const deleteUser = createAsyncThunk<string, string>(
//   'user/deleteUser',
//   async (id) => {
//     return await userService.deleteAUser(id);
//   }
// ); Sleeping

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data.message as string;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error sending email");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }: { token: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      return response.data.message as string;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error resetting password");
    }
  }
);

// export const updateUser = createAsyncThunk<User, Omit<User, 'id' | 'createdAt' | 'updatedAt'>>(
//   'user/updateUser',
//   async (userData) => {
//     return await userService.updateUser(userData);
//   }
// );  Sleeping

// --- Slice ---
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      .addCase(verifyEmail.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
      })

      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { clearError, clearMessage } = userSlice.actions;
export default userSlice.reducer;