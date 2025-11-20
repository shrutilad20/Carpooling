import axiosInstance from "../utils/axiosInstance";

const bookingAPI = {
  bookRide: (passengerEmail, body) =>
    axiosInstance.post(`/bookings/book?passengerEmail=${passengerEmail}`, body),

  getBookingById: (id) =>
    axiosInstance.get(`/bookings/${id}`),
};

export default bookingAPI;
