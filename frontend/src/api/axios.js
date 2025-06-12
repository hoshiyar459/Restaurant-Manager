import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// ✅ Menu APIs
export const fetchAllMenuItems = async () => {
  return axiosInstance.get('/admin/menu/all/products');
};

export const uploadMenuItem = async (formData) => {
  return axiosInstance.post('/admin/menu/upload/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// ✅ Table APIs
export const fetchAllTables = async () => {
  return axiosInstance.get('/api/tables/all');
};

export const createTable = async (table) => {
  return axiosInstance.post('/api/tables/create', table);
};

// ✅ User OTP APIs
export const sendUserOtp = async (user) => {
  return axiosInstance.post('/user/api/send-otp', user);
};

export const verifyUserOtp = async (user) => {
  return axiosInstance.post('/user/api/verify-otp', user);
};

export default axiosInstance;
