import { NextApiRequest, NextApiResponse } from "next";
import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { Socket } from "net";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: HTTPServer & {
      io: SocketServer;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const io = new SocketServer(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("sendMessage", (msg, user) => {
        io.emit("receiveMessage", msg, user);
      });
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }
  res.end();
}
