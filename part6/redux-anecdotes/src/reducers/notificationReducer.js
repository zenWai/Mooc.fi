import {createSlice} from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    visible: false
  },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
      state.visible = true;
    },
    clearNotification: (state) => {
      state.visible = false
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;