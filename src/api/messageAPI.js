import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosService = axios.create({
  baseURL: process.env.REST_API_URL,
});

const postMessage = (_token, _message, _roomName) => {
  return axiosService.post(
    "/api/rooms/messages",
    {
      content: _message,
      room: {
        name: _roomName,
      },
    },

    {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    }
  );
};

export { postMessage };
