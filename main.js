import fs from "fs";
import express from "express";
import http from "http";
import cors from "cors";
import socket from "./src/socket.js";
import bodyParser from "body-parser";
import noticeController from "./src/rest/noticeController.js";

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8080);
app.set("view engine", "html");

//request body parser middleware 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));

const io = socket(server, app);
const notice = noticeController(app);
// const ioInstance = app.get("io");

app.get("/", (request, response) => {
  fs.readFile("./static/index.html", (err, data) => {
    if (err) {
      response.send("error occured");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
});

server.listen(8088, () => {
  console.log("hello node!");
});
