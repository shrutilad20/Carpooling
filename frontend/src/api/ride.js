import axiosInstance from "../utils/axiosInstance";

const rideAPI = {
  postRide: (driverEmail, body) =>
    axiosInstance.post(`/rides/post?driverEmail=${driverEmail}`, body),

  searchRides: (body) =>
    axiosInstance.post("/rides/search", body),

  getRideById: (id) =>
    axiosInstance.get(`/rides/${id}`),
};

export default rideAPI;
