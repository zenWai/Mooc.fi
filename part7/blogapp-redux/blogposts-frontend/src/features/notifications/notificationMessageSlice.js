import {createSlice} from "@reduxjs/toolkit";

export const notificationMessageSlice = createSlice({
  name: 'notificationMessage',
  initialState: {
    visible: false,
    message: '',
    type: 'success'
  },
  reducers: {
    showNotificationMessage: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotificationMessage: (state) => {
      state.visible = false;
      state.message = '';
    },
  },
});

export const {
  showNotificationMessage,
  hideNotificationMessage
} = notificationMessageSlice.actions;
export default notificationMessageSlice.reducer;