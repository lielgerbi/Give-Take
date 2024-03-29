
import axios, { AxiosResponse } from 'axios';
import https from 'https'

function api() {
return axios.create({
    baseURL: "https://193.106.55.226:443",
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("accessToken") || '',
      'refreshToken': localStorage.getItem("refreshToken") || '',
      'Access-Control-Allow-Private-Network': 'true'
    },
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });

  // return axios.create({
  //   baseURL: "https://10.10.248.226:443",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'authorization': localStorage.getItem("accessToken") || '',
  //     'refreshToken': localStorage.getItem("refreshToken") || '',
  //     'Access-Control-Allow-Private-Network': 'true'
  //   }
  // });
}

export const getUserByUserName = async (userName: string): Promise<AxiosResponse> => {
  return api().get(`/users/${userName}`, { params: { userName } });
}

export const getAllProducts = async (): Promise<AxiosResponse> => {
  return api().get(`/posts`);
};

export const getAllCategories = async (): Promise<AxiosResponse> => {
  return api().get(`/categories`);
}

export const addUser = async (newUser: any): Promise<AxiosResponse> => {
  return api().post(`/users`, { newUser });
}

export const findUser = async (userName: string, password: string): Promise<AxiosResponse> => {
  return api().get(`/users/user`, { params: { userName, password } });
}

export const updateUser = async (newUser: any): Promise<AxiosResponse> => {
  return api().post(`/users/user`, newUser);
}

export const deletePostUser = async (post: any): Promise<AxiosResponse> => {
  return api().post(`/posts/delete`, { post });
}

export const updatePost = async (_id: string, post: any): Promise<AxiosResponse> => {
  return api().post(`/posts/update`, { _id, ...post });
}

export const newPost = async (userName: string, post: any): Promise<AxiosResponse> => {
  return api().post(`/posts`, { userName, post });
}

export const getFile = async (): Promise<AxiosResponse> => {
  return api().post(`file/uploads`);
}

export const newfile = async (formData: FormData): Promise<any> => {
  const apiFile = axios.create({
    baseURL: process.env.REACT_APP_API_REMOTE_URL,
    headers: {
      'authorization': localStorage.getItem("accessToken") || '',
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