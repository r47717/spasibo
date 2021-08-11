import { header, table } from "../../../components/product-list.js";
import { getProducts } from "../../../data/products.js";
import { loading } from "../../../components/loading.js";

export default function (app) {
  const loadingIndicator = loading();
  app.append(loadingIndicator);

  getProducts().then((products) => {
    if (app.contains(loadingIndicator)) {
      app.removeChild(loadingIndicator);
      app.append(header());
      app.append(table(products));
    }
  });
}
