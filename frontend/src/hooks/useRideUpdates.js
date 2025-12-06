// frontend/src/hooks/useRideUpdates.js
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

/**
 * Subscribes to backend STOMP endpoint and listens for ride updates.
 * Backend side: 
 *  - endpoint: /ws
 *  - topic: /topic/rides/{rideId}
 */
export default function useRideUpdates(rideId, onMessage) {
  useEffect(() => {
    if (!rideId) return;

    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: () => {},
    });

    client.onConnect = () => {
      client.subscribe(`/topic/rides/${rideId}`, (msg) => {
        try {
          const body = JSON.parse(msg.body);
          onMessage && onMessage(body);
        } catch (e) {
          console.error("Ride update parse error", e);
        }
      });
    };

    client.activate();

    return () => {
      try {
        client.deactivate();
      } catch (e) {
        console.error(e);
      }
    };
  }, [rideId, onMessage]);
}
