// frontend/src/api/payment.js
import axiosInstance from "./axiosInstance";

/**
 * Backend should:
 *  - create Razorpay order
 *  - return { orderId, amount, currency, key }
 */
export const createOrder = (body) =>
  axiosInstance.post("/api/payments/create-order", body);

/**
 * Backend should verify Razorpay signature and
 * confirm booking/payment server-side.
 */
export const verifyPayment = (body) =>
  axiosInstance.post("/api/payments/verify", body);
