import {configureStore} from '@reduxjs/toolkit';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';
import notificationReducer from "./notificationReducer";
import {errorMiddleware} from "../middleware/errorMiddleware";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware)
});

export default store;