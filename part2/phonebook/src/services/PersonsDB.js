import axios from "axios";

const baseURL = 'http://localhost:3001/persons'
const getAll = () => {
    return axios.get(baseURL)
        .then(response => response.data)
        .catch(error => {
            console.log('error is getAll', error);
            throw error;
        });
}

const create = newObject => {
    return axios.post(baseURL, newObject)
        .then(response => response.data)
        .catch(error => {
            console.log('error in create', error);
            throw error;
        })
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
        .then(response => response.data)
        .catch(error => {
            console.log('error in update', error);
            throw error;
        })
}

const deleteById = (id) => {
    return axios.delete(`${baseURL}/${id}`)
        .then(response => {
            console.log('Delete Success ID - ', id)
            return response.data
        })
        .catch(error => {
            console.log('Error deleting ID', id, error);
            throw error;
        })
}

export default {getAll, create, update, deleteById};
