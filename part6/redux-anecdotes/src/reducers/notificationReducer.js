import {createSlice} from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    visible: false,
    duration: 5000
  },
  reducers: {
    // object {message: ''} mandatory
    setNotification: (state, action) => {
      state.message = action.payload;
      state.visible = true;
      state.duration = action.payload.duration * 1000 || 5000;
    },
    clearNotification: (state) => {
      state.visible = false;
      state.message = null;
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;