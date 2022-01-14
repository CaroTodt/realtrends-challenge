import * as React from "react";
import SocketIO from "socket.io-client";

import logo from "~/assets/logo.svg";

import styles from "./Home.module.scss";
import {Product, Vote, DataServer} from "../../../../../server/src/types";

const socket = SocketIO.io("http://localhost:5000");

const Home: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [votes, setVotes] = React.useState<Vote[]>([]);
  const [state, setState] = React.useState<"connected" | "disconnected">("connected");
  const [renders, setRender] = React.useState<number>(0);

  const addVote = (key: string) => {
    if (state === "disconnected") return;
    const userNew: string = window.prompt("User") || "";

    if (!userNew) return;
    const reviewNew: string = window.prompt("Review") || "";

    const newVotes = votes.map((vote) => {
      if (vote.user === userNew) {
        vote.review = reviewNew || "";
        vote.product = key;

        return vote;
      } else return vote;
    });

    setVotes(newVotes);

    console.log("subida voto");
    setRender((renders) => renders + 1);
    socket.emit("addvote", {product: key, user: userNew, review: reviewNew} as Vote);
  };

  socket.on("stateServer", (stateServer: "connected" | "disconnected") => {
    setState(stateServer);
  });

  let num = 1;

  socket.on("state", (data: DataServer) => {
    setProducts(data.products);
    setVotes(data.votes);
  });


  React.useEffect(() => {
    setState("connected");
    setRender((render) => render + 1);
    console.log(`use Effect ${num++}`);
  }, []);

  const changeConnection = (status: string) => {
    if (status === "disconnect") {
      socket.emit("stateServer", "disconnected");
      setState("disconnected");

      return socket.disconnect();
    } else if (status === "connect") {
      socket.emit("stateServer", "connected");
      setState("connected");

      return socket.connect();
    } else if (status === "finish") {
      setVotes([]);
      socket.emit("finish", [] as Vote[]);
    }
  };


  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>
          <img alt="RealTrends" src={logo} width={180} />
        </h1>
        <h3>Lets get this party started</h3>
      </header>
     
      <section className={styles.products}>
        {products.length ? (
        products.map(product => {
          const productVotes = votes.filter((vote) => vote.product === product.key)
          const percentage = (productVotes.length * 100) / votes.length;
          return (
            <article key={product.key}>
               <div className={styles.product} onClick={() => addVote(product.key)}>
              <div>
                <h3>   {product.title}</h3>
                <h5>{product.description}</h5>
                <img src={product.image} alt={product.title} />
                <p>{productVotes.length} voto(s)</p>
                <ul>
                  {productVotes.map(vote =>
                    <li key={vote.user}>
                      <b>{vote.user}</b>
                      <span> {vote.review || '-'}</span>
                    </li>
                  )}
                </ul>
              </div>
              <aside style={{ height: `${percentage}%`, backgroundColor: `hsl(${percentage},100%,50%)` }} />
              </div>
            </article>
          )
        })

        ) : (
          <h3>Loading...</h3>
        )}

      </section>

      <footer>
        {state === "connected" ? (
          <button onClick={() => changeConnection("disconnect")}>Stop Voting</button>
        ) : state === "disconnected" ? (
          <button onClick={() => changeConnection("connect")}>Restart Voting</button>
        ) : (
          <h6>Loading..</h6>
        )}
        <button onClick={() => changeConnection("finish")}>End Voting</button>
      </footer>
    </main>
  );
};

export default Home;
