import {removeUser, setUser} from "../features/user/userSlice.js";

let getToken = () => {
  const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
  if (!loggedInUserJSON) return null;

  const { token } = JSON.parse(loggedInUserJSON);
  return token ? `Bearer ${token}` : null;
};

let getExpirationTimeToken = () => {
  const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
  if (!loggedInUserJSON) return null;

  const { expiration } = JSON.parse(loggedInUserJSON);
  return expiration
};

let isUserLoggedIn = () => {
  const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
  return !!loggedInUserJSON;
}

let extractUserDataForStore = () => {
  const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
  if (!loggedInUserJSON) return null;

  const { id, name, expiration } = JSON.parse(loggedInUserJSON);
  return { id, name, expiration };
}

const isTokenExpired = () => {
  const expiration = getExpirationTimeToken();
  if (!expiration) return true;

  return Date.now() >= expiration;
}

const initializeUser = async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(removeUser());
    return;
  }
  if (!isUserLoggedIn()) return;

  const userStoring = extractUserDataForStore();
  dispatch(setUser(userStoring));
};

export default { getToken, getExpirationTimeToken, isUserLoggedIn, extractUserDataForStore, isTokenExpired, initializeUser };