import axios from 'axios';
import authHelper from '../helpers/authHelpers.js'
const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = async () => {
  const config = {
    headers: { Authorization: authHelper.getToken() }
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: authHelper.getToken() }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const updateLike = async id => {
  const config = {
    headers: { Authorization: authHelper.getToken() }
  };

  const response = await axios.put(`${baseUrl}/${id}/like`, {}, config);
  return response.data;
};

const remove = async id => {
  const config = {
    headers: { Authorization: authHelper.getToken() }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: authHelper.getToken() }
  };
  console.log('comment',comment);
  console.log('id',id);

  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
  return response.data;
};

export default { getAll, create, update, updateLike, remove, addComment };
