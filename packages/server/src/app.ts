import * as io from "socket.io";

interface Product {
  title: string;
  description: string;
  image: string;
  key: string;
}


interface Vote {
  user: string;
  product: Product["key"];
  review: string;
}


const server = new io.Server(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const products: Product[] = [{
  key: 'A',
  description: 'Product A description',
  image: '//placehold.it/256x256',
  title: 'Product A title'
},
{
  key: 'B',
  description: 'Product B description',
  image: '//placehold.it/256x256',
  title: 'Product B title'
}];
const votes: Vote[] = [
  {
    user: 'Carolina Todt',
    product: "A",
    review: "Muy bueno",
  },
  {
    user: 'Juan Perez',
    product: "B",
    review: "Muy bueno",
  },
  {
    user: 'Daniela Lopez',
    product: "A",
    review: "Muy bueno",
  },

];

server.on("connection", (socket) => {
  socket.emit("state", { products, votes });
});
