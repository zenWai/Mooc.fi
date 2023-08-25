import {setNotification} from "../reducers/notificationReducer";

export const errorMiddleware = storeAPI => next => action => {
  let result = next(action);

  if (action.type.endsWith('/rejected')) {
    storeAPI.dispatch(setNotification({
      message: action.error.message || 'An unexpected error occurred.',
      duration: 5
    }));
  }

  return result;
}