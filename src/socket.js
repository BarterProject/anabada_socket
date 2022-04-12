import { Server } from "socket.io";
import response from "./response.js";
import jwtFilter from "./jwtFilter";

export default (server, app) => {
  const io = new Server(server, {
    path: "/socket.io",
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  app.set("io", io);
  const room = io.of("/socket");

  //소켓 연결
  room.on("connection", (socket) => {
    let jwt = socket.handshake.query.jwt;
    if (jwt === undefined) response.error(socket, "토큰이 없네요");

    jwtFilter.verifyJWT(jwt);

    // socket.join(roomID);
    // response.setRoomId(roomID);

    //room에 연결된 socket 개수 확인 (본인 포함)
    // let roomSocketSize =
    //   room.adapter.rooms.get(roomID) && room.adapter.rooms.get(roomID).size;

    //mode
    //0: 기본, 대기모드
    //1: 카페 메뉴
    //2: 카페 이용수칙
    //3: POS기 사용실습
    //4: 고객응대 가이드
    //5: 고객응대 실습

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};
