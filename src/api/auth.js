
import axiosInstance from './AxiosInstance';

export const loginUser = async (form) => {
  try {
    const response = await axiosInstance.post('/login/', form, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const registerUser = (userData) => {
  return axiosInstance.post('/register/', userData);
};