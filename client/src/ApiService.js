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
  
  export const getAllCities = async () => {
    return (await api().then(async (api) => {
      return api.get(`/cities` , {
      });
    }))
  }
  export const addUser = async (newUser) => {
    return (await api().then(async (api) => {
      return api.post(`/users` , {
        newUser:newUser
      });
    }))
  }
  export const findUser = async (userName, password) => {
    return (await api().then(async (api) => {
      return api.get(`/users/user`, {
        params: {
          userName: userName,
          password: password
        }
      });
    }))
  }
  export const updateUser = async (userName,firstName,lastName,email, password) => {
    return (await api().then(async (api) => {
      return api.get(`/users/user`, {
        params: {
          userName: userName,
          firstName:firstName,
          lastName:lastName,
          email:email,
          password: password
        }
      });
    }))
  }