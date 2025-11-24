// frontend/src/api/auth.js
import axiosInstance from "./axiosInstance";

export const sendSignupOtp = (data) => {
  // backend: POST /auth/signup
  return axiosInstance.post("/auth/signup", data);
};

export const verifyOtp = (data) => {
  // backend: POST /auth/verify-otp
  return axiosInstance.post("/auth/verify-otp", data);
};

export const login = (email, password) => {
  // backend: POST /auth/login
  return axiosInstance.post("/auth/login", { email, password });
};

// optional default export if you like using authAPI.*
const authAPI = {
  sendSignupOtp,
  verifyOtp,
  login,
};

export default authAPI;
