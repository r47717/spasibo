import { header, cartList } from "../../../components/cart.js";
import { events } from "../../../events.js";

export const cart = [];

events.subscribe("PRODUCT_ADD_TO_CART", (event, product) => {
  console.log("Cart: new product added");
  cart.push(product);
  events.emit("CART_CONTENT_UPDATE", cart);
});

export default function (app) {
  app.append(header());
  app.append(
    cartList(cart, {
      remove: (id) => {
        const index = cart.findIndex((item) => item.id === id);

        if (index >= 0) {
          cart.splice(index, 1);
          console.log("Cart: product removed");
          events.emit("CART_CONTENT_UPDATE", cart);
        }
      },
    })
  );
}
