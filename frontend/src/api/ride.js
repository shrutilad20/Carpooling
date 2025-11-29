// frontend/src/api/ride.js

import axiosInstance from "./axiosInstance";
import { getToken } from "../utils/storage";

const postRide = (rideData) => {
  return axiosInstance.post("/api/rides/post", rideData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getMyRides = () => {
  return axiosInstance.get("/api/rides/my", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export default {
  postRide,
  getMyRides
};
