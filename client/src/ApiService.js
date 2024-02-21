import axios from 'axios';

const api = async () => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    return api;
  }

export const getAllProducts = async () => {
    return (await api().then(async (api) => {
      return api.get(`/posts`)
    }))
  };

export const getUserByUserName = async (userName) => {
    return (await api().then(async (api) => {
      return api.get(`/users/${userName}` , {
          userName:userName
      });
    }))
  }

  export const getAllCategories = async () => {
    return (await api().then(async (api) => {
      return api.get(`/categories` , {
      });
    }))
  }