import io from "socket.io-client";
import { getAuthToken } from "./auth";
import { SERVER_URL } from "../API/config";

const socket = io(SERVER_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 5000,
  auth: (cb) => {
    cb({
      token: getAuthToken(),
    });
  },
});

export default socket;
