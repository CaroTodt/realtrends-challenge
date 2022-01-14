export interface Product {
  title: string;
  description: string;
  image: string;
  key: string;
}

export interface Vote {
  user: string;
  product: Product["key"];
  review: string;
}

export interface DataServer {
  products: Product[];
  votes: Vote[];
}
