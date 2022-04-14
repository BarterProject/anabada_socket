import dotenv from "dotenv";
import { getUserInfo } from "../api/userAPI.js";
import response from "../response.js";

dotenv.config();

export default {
  setUser: async (_token, _socket) => {
    await getUserInfo(_token)
      .then((res) => {
        _socket.jwt = _token;
        _socket.user = res.data;
        _socket.join(_socket.user.email);
      })
      .catch((err) => {
        response.error(_socket, _socket, "인증에 실패하였습니다");
      });
  },
};
