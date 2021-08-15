import { html } from "../utils/dom-tools.js";
import { header, cartList, buildCheckoutButton } from "../components/cart.js";
import { events } from "../events.js";
import { redirect } from "../router.js";

// Widget props:

let mount;
let widget;
let cartContent;
let checkoutButton;
let cart = [];

// Widget init:

export default (param) => {
  mount = param;

  widget = html.div();
  widget.append(header());
  cartContent = getCartContent();
  widget.append(cartContent);

  checkoutButton = buildCheckoutButton();
  checkoutButton.onclick = () => redirect("/checkout");

  events.subscribeAll(messages);
};

function getCartContent() {
  return cartList(cart, {
    remove: (id) => {
      const index = cart.findIndex((item) => item.id === id);

      if (index >= 0) {
        cart.splice(index, 1);
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

function updateCheckoutButton() {
  if (widget.contains(checkoutButton)) widget.removeChild(checkoutButton);

  if (cart.length !== 0) {
    widget.append(checkoutButton);
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
    case "ROUTER_CHECKOUT_PAGE":
    case "ROUTER_ORDERED_PAGE":
      if (mount.contains(widget)) mount.removeChild(widget);
      break;

    case "CART_CONTENT_UPDATE":
      updateCartContent();
      updateCheckoutButton();
      break;
    case "PRODUCT_ADD_TO_CART":
      const product = params[0];
      cart.push(product);
      events.emit("CART_CONTENT_UPDATE", cart);
      break;
    case "CLEAR_CART":
      cart = [];
      events.emit("CART_CONTENT_UPDATE", cart);
      break;
  }
}
