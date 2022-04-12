import fs from "fs";
import express from "express";
import http from "http";
import cors from "cors";
import socket from "./src/socket.js";
const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8080);
app.set("view engine", "html");

app.use(cors());
app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));

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

const io = socket(server, app);

server.listen(8080, () => {
  console.log("hello node!");
});
