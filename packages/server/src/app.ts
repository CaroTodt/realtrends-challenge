import * as io from "socket.io";
import {DataServer, Product, Vote} from "./types";
import {product0, product1, vote0, vote1, vote2} from "./data";

const server = new io.Server(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});


const products: Product[] = [product0, product1];
var votes: Vote[] = [vote0, vote1, vote2];


server.on("connection", (socket) => {
  socket.on("addvote", (arg: Vote) => {
    const v = votes.filter((vote) => vote.user === arg.user);
    v[0]
      ? ((v[0].product = arg.product), (v[0].review = arg.review))
      : votes.push({user: arg.user, review: arg.review, product: arg.product} as Vote);
    socket.broadcast.emit("state", {products: products, votes: votes} as DataServer);
    console.log("upload voto");
  });


  server.on("connection", (socket) => {
    socket.on("finish", (arg: Vote[]) => {
      votes = arg;
      socket.broadcast.emit("state", {products, votes});
      console.log("End voting");
    });
  });


  server.on("connection", (socket) => {
    socket.on("stateServer", (state: string) => {
      socket.broadcast.emit("stateServer", state);
      console.log("change server state");
    });
  });
  
  server.on("connection", (socket) => {
    socket.emit("state", {products, votes});
    console.log("one upload");
  });
  






  socket.emit("state", { products, votes });
});
