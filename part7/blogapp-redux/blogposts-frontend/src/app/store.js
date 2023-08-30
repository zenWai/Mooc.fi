import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import notificationMessageMiddleware from "../middlewares/notificationMessageMiddleware.js";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notificationMessageMiddleware)
});

export default store;