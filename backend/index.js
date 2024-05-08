import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import { userRouter } from "./routes/users.js";

import { errorHandler } from "./middlewares/errorHandler.js";

import { adminRouter } from "./routes/adminRoutes.js";

import { createServer } from "http";
import { Server } from "socket.io";
import {
  JoinAuction,
  MiseAndUpdateSolde,
  unJoinAuction,
} from "./utils/Auctions.js";

const app = express();

const httpServer = createServer(app);

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use("/uploads", express.static("uploads"));
app.use("/auth", userRouter);

app.use("/admin", adminRouter);

//error handler
app.use(errorHandler);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});
const connectedUsers = {};

io.on("connection", (socket) => {
  console.log(`New client connected with socket ID ${socket.id}`);

  socket.on("joinAuction", async (data) => {
    //socket.join(data);
    console.log(`user with id: ${socket.id} joined room :${data.nickname}`);
    await JoinAuction({ idSocket: socket.id, ...data });
    io.emit("joinAuction", { idSocket: socket.id, ...data });
  });

  socket.on("dannosBet", async (data) => {
    await MiseAndUpdateSolde(data);
    console.log(data);
    io.emit("resetMise", data);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
    const userId = Object.keys(connectedUsers).find(
      (key) => connectedUsers[key] === socket.id
    );

    if (userId) {
      console.log(
        `User ${userId} disconnected from the socket id ${socket.id}`
      );
      delete connectedUsers[userId];
    }
    unJoinAuction(socket.id);
    io.emit("UnjoinAuction", socket.id);
  });
});

var password = encodeURIComponent("dbAdminPass");
// mongoose
//   .connect(
//     `mongodb://admin:${password}@141.94.223.33:27017/dannos_database?authSource=admin`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     httpServer.listen(3001, "0.0.0.0", () => console.log("Server started !"));
//   });

mongoose
  .connect("mongodb://localhost:27017/TestDataBase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(3001, "0.0.0.0", () => console.log("Server started !"));
  });
