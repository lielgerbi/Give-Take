import axios from 'axios';

import Userfront from "@userfront/react";
const api = async () => {
  console.log(localStorage);  
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("accessToken"),
        'refreshToken' : localStorage.getItem("refreshToken")

      }
    });
    return api;
  }

  export const getUserByUserName = async (userName) => {
    return (await api().then(async (api) => {
      return api.get(`/users/${userName}` , {
          userName:userName
      });
    }))
  }

export const getAllProducts = async () => {
    return (await api().then(async (api) => {
      return api.get(`/posts`)
    }))
  };



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
  export const findUser = async (userName, password ,refreshToken) => {
    return (await api().then(async (api) => {
      return api.get(`/users/user`, {
        params: {
          userName: userName,
          password: password
        }
      });
    }))
  }
  export const updateUser = async (newUser) => {
    return (await api().then(async (api) => {
      return api.post(`/users/user`, {
          userName: newUser.userName,
          firstName:newUser.firstName,
          lastName:newUser.lastName,
          email:newUser.email,
          password: newUser.password
      });
    }))
  }

  export const deletePost = async (postID) => {
    return (await api().then(async (api) => {
      return api.get(`/posts/delete` , {
        postId:postID
      });
    }))
  }
  