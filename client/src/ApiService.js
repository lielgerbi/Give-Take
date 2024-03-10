import axios from 'axios';
const api = async () => { 
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("accessToken"),
        'refreshToken' : localStorage.getItem("refreshToken"),
        'Access-Control-Allow-Private-Network': true

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
          password: newUser.password,
          photo:newUser.photo
      });
    }))
  }

  export const deletePostUser = async (post) => {
    return (await api().then(async (api) => {
      return api.post(`/posts/delete` , {
        post:post
      });
    }))
  }
  

  export const updatePost = async (_id,post) => {
    return (await api().then(async (api) => {
      return api.post(`/posts/update`, {
        _id:_id,
        categoryName: post.categoryName,
        subCategory:post.subCategory,
        photo:post.photo,
        details:post.details,
        city: post.city
      });
    }))
  }
  export const newPost = async (userName,post) => {
    return (await api().then(async (api) => {
      return api.post(`/posts`, {
        userName:userName,
        post:post
      });
    }))
  }
  export const getFile = async () => {
    debugger
    return (await api().then(async (api) => {
      return api.post(`file/uploads`, {
      });
    }))
  }

  
export const newfile = async (formData) => {
  const apiFile = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Authorization': localStorage.getItem("accessToken"),
      'refreshToken': localStorage.getItem("refreshToken"),
      'Content-Type': 'multipart/form-data',  // Set the Content-Type header for formData
    }
  });

  try {
    const response = await apiFile.post('/file/upload', formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}