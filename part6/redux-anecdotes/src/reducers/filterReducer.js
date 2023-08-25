import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilterAction: (state, action) => action.payload,
  },
});

export const { setFilterAction } = filterSlice.actions;
export default filterSlice.reducer;