// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getRooms } from "../api/roomAPI.js";
import response from "../response.js";

dotenv.config();

export default {
  setRooms: async (_socket) => {
    await getRooms(_socket.jwt)
      .then((res) => {
        _socket.roomList = res.data;
        res.data.map((i) => {
          _socket.join(i.name);
        });
      })
      .catch((err) => {
        response.error(_socket, _socket, "인증에 실패하였습니다");
      });
  },
};
