const products = [
  {
    id: 1,
    name: "Product 1",
    price: 1000,
  },
  {
    id: 2,
    name: "Product 2",
    price: 2000,
  },
  {
    id: 3,
    name: "Product 3",
    price: 3000,
  },
  {
    id: 4,
    name: "Product 4",
    price: 4000,
  },
  {
    id: 5,
    name: "Product 5",
    price: 5000,
  },
];

export function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 1000);
  });
}
