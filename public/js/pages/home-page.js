import { header, table } from "../components/product-list.js";
import { products } from "../data/products.js";

export default function (app) {
  app.append(header());
  app.append(table(products));
}
