// frontend/src/api/auth.js
import axiosInstance from "./axiosInstance";

export const sendSignupOtp = (data) => {
  return axiosInstance.post("/auth/signup", data);
};

export const verifyOtp = (data) => {
  return axiosInstance.post("/auth/verify-otp", data);
};

export const login = (email, password) => {
  return axiosInstance.post("/auth/login", { email, password });
};

const authAPI = {
  sendSignupOtp,
  verifyOtp,
  login,
};

export default authAPI;
