// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { postMessage } from "../api/messageAPI.js";
import response from "../response.js";

dotenv.config();

export default {
  saveMessage: async (_socket, _message) => {
    await postMessage(_socket.jwt, _message.message, _message.roomName)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        response.error(_socket, _socket, "인증에 실패하였습니다");
      });
  },
};
