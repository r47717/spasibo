import { header } from "../components/product.js";
import { products } from "../data/products.js";
import { redirect404 } from "../router.js";

export default (app, [, id]) => {
  app.append(header(id));

  const product = products.find((item) => item.id === +id);
  if (!product) {
    redirect404();
  }
};
