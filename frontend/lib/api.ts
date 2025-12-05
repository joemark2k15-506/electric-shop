import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
})

// Auth API
export const registerUser = async (userData: any) => {
  const response = await api.post("/auth/register", userData)
  return response.data
}

export const loginUser = async (userData: any) => {
  const response = await api.post("/auth/login", userData)
  return response.data
}

export const logoutUser = async () => {
  const response = await api.get("/auth/logout")
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me")
  return response.data
}

// Products API
export const getProducts = async (params = {}) => {
  const response = await api.get("/products", { params })
  return response.data
}

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export const createProduct = async (productData: any) => {
  const response = await api.post("/products", productData)
  return response.data
}

export const updateProduct = async (id: string, productData: any) => {
  const response = await api.put(`/products/${id}`, productData)
  return response.data
}

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}

// Orders API
export const createOrder = async (orderData: any) => {
  const response = await api.post("/orders", orderData)
  return response.data
}

export const getMyOrders = async () => {
  const response = await api.get("/orders/myorders")
  return response.data
}

export const getOrderDetails = async (id: string) => {
  const response = await api.get(`/orders/${id}`)
  return response.data
}

export const updateOrderStatus = async (id: string, status: string) => {
  const response = await api.put(`/orders/${id}/status`, { status })
  return response.data
}

// User API
export const updateUserProfile = async (userData: any) => {
  const response = await api.put("/users/profile", userData)
  return response.data
}

export const addUserAddress = async (addressData: any) => {
  const response = await api.post("/users/addresses", addressData)
  return response.data
}

export const updateUserAddress = async (id: string, addressData: any) => {
  const response = await api.put(`/users/addresses/${id}`, addressData)
  return response.data
}

export const deleteUserAddress = async (id: string) => {
  const response = await api.delete(`/users/addresses/${id}`)
  return response.data
}

// Cart API
export const getCart = async () => {
  const response = await api.get("/cart")
  return response.data
}

export const addToCart = async (productId: string, quantity: number) => {
  const response = await api.post("/cart", { productId, quantity })
  return response.data
}

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await api.put(`/cart/${productId}`, { quantity })
  return response.data
}

export const removeFromCart = async (productId: string) => {
  const response = await api.delete(`/cart/${productId}`)
  return response.data
}

export const clearCart = async () => {
  const response = await api.delete("/cart")
  return response.data
}

// Admin API
export const getAdminStats = async () => {
  const response = await api.get("/admin/stats")
  return response.data
}

export const getAdminProducts = async () => {
  const response = await api.get("/admin/products")
  return response.data
}

export const getAdminOrders = async () => {
  const response = await api.get("/admin/orders")
  return response.data
}

export const getAdminUsers = async () => {
  const response = await api.get("/admin/users")
  return response.data
}

export const updateUser = async (id: string, userData: any) => {
  const response = await api.put(`/admin/users/${id}`, userData)
  return response.data
}

export default api




// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // Important for cookies
// });

// // Auth API
// export const registerUser = async (userData: any) => {
//   const response = await api.post('/auth/register', userData);
//   return response.data;
// };

// export const loginUser = async (userData: any) => {
//   const response = await api.post('/auth/login', userData);
//   return response.data;
// };

// export const logoutUser = async () => {
//   const response = await api.get('/auth/logout');
//   return response.data;
// };

// export const getCurrentUser = async () => {
//   const response = await api.get('/auth/me');
//   return response.data;
// };

// // Products API
// export const getProducts = async (params = {}) => {
//   const response = await api.get('/products', { params });
//   return response.data;
// };

// export const getProduct = async (id: string) => {
//   const response = await api.get(`/products/${id}`);
//   return response.data;
// };

// // Orders API
// export const createOrder = async (orderData: any) => {
//   const response = await api.post('/orders', orderData);
//   return response.data;
// };

// export const getMyOrders = async () => {
//   const response = await api.get('/orders/myorders');
//   return response.data;
// };

// export const getOrderDetails = async (id: string) => {
//   const response = await api.get(`/orders/${id}`);
//   return response.data;
// };

// // User API
// export const updateUserProfile = async (userData: any) => {
//   const response = await api.put('/users/profile', userData);
//   return response.data;
// };

// export const addUserAddress = async (addressData: any) => {
//   const response = await api.post('/users/addresses', addressData);
//   return response.data;
// };

// export const updateUserAddress = async (id: string, addressData: any) => {
//   const response = await api.put(`/users/addresses/${id}`, addressData);
//   return response.data;
// };

// export const deleteUserAddress = async (id: string) => {
//   const response = await api.delete(`/users/addresses/${id}`);
//   return response.data;
// };

// export default api;