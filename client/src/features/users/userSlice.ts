import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../../types/userTypes';
import userService from '../../services/userAPI.ts';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Thunks for user operations
export const createUser = createAsyncThunk<User, Omit<User, 'id' | 'createdAt' | 'updatedAt'>>(
  'users/createUser',
  async (userData) => {
    return await userService.createUser(userData);
  }
);

export const loginUser = createAsyncThunk<User, { email: string; password: string }>(
  'users/loginUser',
  async (credentials) => {
    return await userService.loginUser(credentials);
  }
);

export const fetchAllUsers = createAsyncThunk<User[], void>(
  'users/fetchAllUsers',
  async () => {
    return await userService.fetchAllUsers();
  }
);

export const getAUser = createAsyncThunk<User, string>(
  'users/getAUser',
  async (id) => {
    return await userService.getAUser(id);
  }
);

export const deleteAUser = createAsyncThunk<string, string>(
  'users/deleteAUser',
  async (id) => {
    return await userService.deleteAUser(id);
  }
);

export const updateUser = createAsyncThunk<User, Omit<User, 'id' | 'createdAt' | 'updatedAt'>>(
  'users/updateUser',
  async (userData) => {
    return await userService.updateUser(userData);
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers(state) {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      })
      .addCase(getAUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index === -1) {
          state.users.push(action.payload);
        } else {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteAUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
