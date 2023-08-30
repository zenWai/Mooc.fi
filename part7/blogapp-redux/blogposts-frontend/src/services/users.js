import axios from "axios";
import authHelper from "../helpers/authHelpers.js";
const baseUrl = 'http://localhost:3003/api/users';

const getAll = () => {
  const config = {
    headers: { Authorization: authHelper.getToken() }
  };
  const request = axios.get(baseUrl, config);
  return request.then(response => response.data);
}

export default {getAll}
