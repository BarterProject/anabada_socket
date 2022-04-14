import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosService = axios.create({
  baseURL: process.env.REST_API_URL,
});

const getUserInfo = (_token) => {
  return axiosService.get("/api/user", {
    headers: {
      Authorization: `Bearer ${_token}`,
    },
  });
};

export { getUserInfo };
