import {
  addToCardButton,
  goToCardButton,
  header,
  productInfo,
} from "../../../components/product.js";
import { getProducts } from "../../../data/products.js";
import { redirect, redirect404 } from "../../../router.js";
import { loading } from "../../../components/loading.js";
import { events } from "../../../events.js";
import { cart } from "./cart-page.js";

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
        console.log(cart);
        if (cart.some((product) => product.id === +id)) {
          app.append(
            goToCardButton(() => {
              redirect("/cart");
            })
          );
        } else {
          app.append(
            addToCardButton(() => {
              events.emit("PRODUCT_ADD_TO_CART", { ...product });
            })
          );
        }
      }
    }
  });
};
