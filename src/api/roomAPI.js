import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosService = axios.create({
  baseURL: process.env.REST_API_URL,
});

const getRooms = (_token) => {
  return axiosService.get("/api/rooms", {
    headers: {
      Authorization: `Bearer ${_token}`,
    },
  });
};

export { getRooms };
