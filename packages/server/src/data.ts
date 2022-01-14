import {Product, Vote} from "./types";

  export const product0: Product = {
    key: 'A',
    description: 'Smartphone made by Apple',
    image: 'https://images.unsplash.com/photo-1506757144316-2ff47151133b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fHByb2R1Y3RzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=256&h=256&q=60',
    title: 'Apple Phone'
  };
  export const product1: Product = {
    key: 'B',
    description: 'Tablet made by Apple',
    image: 'https://images.unsplash.com/photo-1630331528526-7d04c6eb463f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fHByb2R1Y3RzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=256&h=256&q=60',
    title: 'Apple Tablet'
  };
  export const vote0: Vote = {
    user: 'Carolina Todt',
      product: "A",
      review: "Good Product",
  };
  export const vote1: Vote = {
    user: 'Juan Perez',
      product: "B",
      review: "Great Product",
  };
  export const vote2: Vote = {
    user: 'Daniela Lopez',
    product: "A",
    review: "Is the best Smartphone",
  };