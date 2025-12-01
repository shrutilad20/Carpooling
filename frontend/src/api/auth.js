import axiosInstance from "./axiosInstance";

export const sendSignupOtp = (data) => {
  return axiosInstance.post("/auth/send-signup-otp", data);
};

export const verifySignupOtp = (data) => {
  return axiosInstance.post("/auth/verify-signup-otp", data);
};

export const login = (email, password) => {
  return axiosInstance.post("/auth/login", { email, password });
};

export const verifyLoginOtp = (data) => {
  return axiosInstance.post("/auth/verify-login-otp", data);
};

const authAPI = {
  sendSignupOtp,
  verifySignupOtp,
  login,
};

export default authAPI;
