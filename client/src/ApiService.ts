
import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("accessToken") || '',
    'refreshToken': localStorage.getItem("refreshToken") || '',
    'Access-Control-Allow-Private-Network': 'true'
  }
});

export const getUserByUserName = async (userName: string): Promise<AxiosResponse> => {
  return api.get(`/users/${userName}`, { params: { userName } });
}

export const getAllProducts = async (): Promise<AxiosResponse> => {
  return api.get(`/posts`);
};

export const getAllCategories = async (): Promise<AxiosResponse> => {
  return api.get(`/categories`);
}

export const addUser = async (newUser: any): Promise<AxiosResponse> => {
  return api.post(`/users`, { newUser });
}

export const findUser = async (userName: string, password: string): Promise<AxiosResponse> => {
  return api.get(`/users/user`, { params: { userName, password } });
}

export const updateUser = async (newUser: any): Promise<AxiosResponse> => {
  return api.post(`/users/user`, newUser);
}

export const deletePostUser = async (post: any): Promise<AxiosResponse> => {
  return api.post(`/posts/delete`, { post });
}

export const updatePost = async (_id: string, post: any): Promise<AxiosResponse> => {
  return api.post(`/posts/update`, { _id, ...post });
}

export const newPost = async (userName: string, post: any): Promise<AxiosResponse> => {
  return api.post(`/posts`, { userName, post });
}

export const getFile = async (): Promise<AxiosResponse> => {
  return api.post(`file/uploads`);
}

export const newfile = async (formData: FormData): Promise<any> => {
  const apiFile = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Authorization': localStorage.getItem("accessToken") || '',
      'refreshToken': localStorage.getItem("refreshToken") || '',
      'Content-Type': 'multipart/form-data',
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



// import axios from 'axios';
// const api = async () => { 
//     const api = axios.create({
//       baseURL: process.env.REACT_APP_API_URL,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': localStorage.getItem("accessToken"),
//         'refreshToken' : localStorage.getItem("refreshToken"),
//         'Access-Control-Allow-Private-Network': true

//       }
//     });
//     return api;
//   }

//   export const getUserByUserName = async (userName) => {
//     return (await api().then(async (api) => {
//       return api.get(`/users/${userName}` , {
//           userName:userName
//       });
//     }))
//   }

// export const getAllProducts = async () => {
//     return (await api().then(async (api) => {
//       return api.get(`/posts`)
//     }))
//   };



//   export const getAllCategories = async () => {
//     return (await api().then(async (api) => {
//       return api.get(`/categories` , {
//       });
//     }))
//   }
  
//   export const getAllCities = async () => {
//     return (await api().then(async (api) => {
//       return api.get(`/cities` , {
//       });
//     }))
//   }
//   export const addUser = async (newUser) => {
//     return (await api().then(async (api) => {
//       return api.post(`/users` , {
//         newUser:newUser
//       });
//     }))
//   }
//   export const findUser = async (userName, password ,refreshToken) => {
//     return (await api().then(async (api) => {
//       return api.get(`/users/user`, {
//         params: {
//           userName: userName,
//           password: password
//         }
//       });
//     }))
//   }
//   export const updateUser = async (newUser) => {
//     return (await api().then(async (api) => {
//       return api.post(`/users/user`, {
//           userName: newUser.userName,
//           firstName:newUser.firstName,
//           lastName:newUser.lastName,
//           email:newUser.email,
//           password: newUser.password,
//           photo:newUser.photo
//       });
//     }))
//   }

//   export const deletePostUser = async (post) => {
//     return (await api().then(async (api) => {
//       return api.post(`/posts/delete` , {
//         post:post
//       });
//     }))
//   }
  

//   export const updatePost = async (_id,post) => {
//     return (await api().then(async (api) => {
//       return api.post(`/posts/update`, {
//         _id:_id,
//         categoryName: post.categoryName,
//         subCategory:post.subCategory,
//         photo:post.photo,
//         details:post.details,
//         city: post.city,
//         comments: post.comments
//       });
//     }))
//   }
//   export const newPost = async (userName,post) => {
//     return (await api().then(async (api) => {
//       return api.post(`/posts`, {
//         userName:userName,
//         post:post
//       });
//     }))
//   }
//   export const getFile = async () => {
//     debugger
//     return (await api().then(async (api) => {
//       return api.post(`file/uploads`, {
//       });
//     }))
//   }

  
// export const newfile = async (formData) => {
//   const apiFile = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: {
//       'Authorization': localStorage.getItem("accessToken"),
//       'refreshToken': localStorage.getItem("refreshToken"),
//       'Content-Type': 'multipart/form-data',  // Set the Content-Type header for formData
//     }
//   });

//   try {
//     const response = await apiFile.post('/file/upload', formData);
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw error;
//   }
// }