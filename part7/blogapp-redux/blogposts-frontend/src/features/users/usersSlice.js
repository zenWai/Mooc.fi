import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userService from '../../services/users.js';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await userService.getAll();
})

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      });
  }
});

export default usersSlice.reducer;