import { Server } from "socket.io";
import response from "./response.js";
import userService from "./services/userService.js";
import roomService from "./services/roomService.js";
import messageService from "./services/messageService.js";

export default (server, app) => {
  const io = new Server(server, {
    path: "/socket.io",
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  app.set("io", io);
  const room = io.of("/socket");

  room.on("connection", async (socket) => {
    let jwt = socket.handshake.query.jwt;
    if (jwt === undefined)
      response.error(socket, socket, "인증에 실패하였습니다");

    await userService.setUser(jwt, socket);
    await roomService.setRooms(socket);

    socket.on("message", async (data) => {
      await messageService.saveMessage(socket, data);
      response.message(socket, room.to(data.roomName), data);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};

//room에 연결된 socket 개수 확인 (본인 포함)
// let roomSocketSize =
//   room.adapter.rooms.get(roomID) && room.adapter.rooms.get(roomID).size;
