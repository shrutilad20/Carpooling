// frontend/src/api/fare.js
import axiosInstance from "./axiosInstance";

/**
 * Ask backend to calculate distance & fare for a ride.
 * Backend should use Google Distance Matrix internally.
 *
 * body = {
 *   rideId,
 *   seats,
 *   pickupPoint,   // optional for partial match
 *   dropPoint      // optional for partial match
 * }
 */
export const getEstimatedFare = (body) =>
  axiosInstance.post("/api/fare/estimate", body);

/**
 * Advanced route matching:
 *  - direct matches (same src/dest)
 *  - partial matches (on the way)
 *
 * body = { source, destination, from, to }
 */
export const matchRoutes = (body) =>
  axiosInstance.post("/api/rides/match", body);
