import { header, productInfo } from "../../../components/product.js";
import { getProducts } from "../../../data/products.js";
import { redirect404 } from "../../../router.js";
import { loading } from "../../../components/loading.js";

export default (app, [, id]) => {
  const loadingIndicator = loading();
  app.append(loadingIndicator);

  getProducts().then((products) => {
    if (app.contains(loadingIndicator)) {
      app.removeChild(loadingIndicator);
      const product = products.find((item) => item.id === +id);
      if (!product) {
        redirect404();
      } else {
        app.append(header(id));
        app.append(productInfo(product));
      }
    }
  });
};
