import axiosInstance from "../utils/axiosInstance";

export const loginUser = (body) => {
  return axiosInstance.post("/auth/login", body);
};

export const registerUser = (body) => {
  return axiosInstance.post("/auth/signup", body);
};

// default export only if needed
export default {
  loginUser,
  registerUser,
};
