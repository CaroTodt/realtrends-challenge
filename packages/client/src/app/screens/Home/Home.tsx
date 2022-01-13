import * as React from "react";
import SocketIO from "socket.io-client";

import logo from "~/assets/logo.svg";

import styles from "./Home.module.scss";


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


interface State {
  products: Product[];
  votes: Vote[];
}

const socket = SocketIO.io("http://localhost:5000");

const Home: React.FC = () => {
  const [state, setState] = React.useState<State>({ products: [], votes: [] });

  React.useEffect(() => {
    socket.on("state", (state: State) => setState(state));
  }, []);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>
          <img alt="RealTrends" src={logo} width={180} />
        </h1>
        <h3>Lets get this party started</h3>
      </header>
      <section className={styles.products}>
        {state.products.map(product => {
          const productVotes = state.votes.filter((vote) => vote.product === product.key)
          const percentage = (productVotes.length * 100) / state.votes.length;
          return (
            <article key={product.key}>
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
            </article>
          )
        })}

      </section>
    </main>
  );
};

export default Home;
