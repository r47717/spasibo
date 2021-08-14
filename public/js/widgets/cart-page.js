import { html } from "../utils/dom-tools.js";
import { header, cartList } from "../components/cart.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;
let cartContent;
const cart = [];

// Widget init:

export default (param) => {
  mount = param;

  widget = html.div();
  widget.append(header());
  cartContent = getCartContent();
  widget.append(cartContent);

  events.subscribeAll(messages);
};

function getCartContent() {
  return cartList(cart, {
    remove: (id) => {
      const index = cart.findIndex((item) => item.id === id);

      if (index >= 0) {
        cart.splice(index, 1);
        console.log("Cart: product removed");
        events.emit("CART_CONTENT_UPDATE", cart);
      }
    },
  });
}

function updateCartContent() {
  if (widget.contains(cartContent)) {
    widget.removeChild(cartContent);
    cartContent = getCartContent();
    widget.append(cartContent);
  }
}

// Widget event loop:

function messages(event, ...params) {
  switch (event) {
    case "ROUTER_CART_PAGE":
      mount.append(widget);
      break;
    case "ROUTER_HOME_PAGE":
    case "ROUTER_PRODUCT_PAGE":
    case "ROUTER_ABOUT_PAGE":
    case "ROUTER_404":
      if (mount.contains(widget)) mount.removeChild(widget);
      break;

    case "CART_CONTENT_UPDATE":
      updateCartContent();
      break;
    case "PRODUCT_ADD_TO_CART":
      const product = params[0];
      cart.push(product);
      console.log("Cart: new product added", cart);
      events.emit("CART_CONTENT_UPDATE", cart);
      break;
  }
}
