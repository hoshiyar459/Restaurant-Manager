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
  const restaurantName = localStorage.getItem('restaurantName') || '';

  // Replace multiple spaces with single dash and encode URI
  const formattedName = encodeURIComponent(restaurantName.trim());

  return axiosInstance.get(`/admin/menu/all/${formattedName}/products`);
};


export const uploadMenuItem = async (formData) => {
  const restaurantName = localStorage.getItem('restaurantName') || '';

  // Format: replace multiple spaces with a dash and encode for URL
const formattedName = encodeURIComponent(restaurantName.trim());

  return axiosInstance.post(
    `/admin/menu/upload/product/${formattedName}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};


// ✅ Table APIs
export const fetchAllTables = async () => {
  const restaurantName = localStorage.getItem('restaurantName') || '';
  const formattedName = encodeURIComponent(restaurantName.trim());
  return axiosInstance.get(`/admin/table/all/${formattedName}`);
};

export const createTable = async (table) => {
  const restaurantName = localStorage.getItem('restaurantName') || '';
  const formattedName = encodeURIComponent(restaurantName.trim());
  return axiosInstance.post(`/admin/table/create/${formattedName}`, table);
};

// ✅ User OTP APIs
export const sendUserOtp = async (user) => {
  return axiosInstance.post('/user/api/send-otp', user);
};

export const verifyUserOtp = async (user) => {
  return axiosInstance.post('/user/api/verify-otp', user);
};


export const fetchAllRestaurants = async () => {
  return axiosInstance.get('/restro/api/all'); // This matches your Spring Boot controller path
};


export const addToCart = async (userId, menuId) => {
  return axiosInstance.post(`/cart/api/create/${userId}/${menuId}`);
};

export const fetchUserCart = async (userId) => {
  return axiosInstance.get(`cart/api/get/${userId}/cart`);
};

export default axiosInstance;
