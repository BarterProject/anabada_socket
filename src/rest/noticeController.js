import fs from "fs";
import response from "../response.js";

//NoticeController
export default (app) => {
  const ioInstance = app.get("io");
  //   ioInstance.of("/socket").to("hello22332222@naver.com").emit("message", "wow");

  app.post("/notice", (req, res) => {
    response.notice(ioInstance.of("/socket").to(req.body.user[0]), req.body);

    res.end();
  });
};
