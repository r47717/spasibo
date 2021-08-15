import { html, spaLink, classes } from "../utils/dom-tools.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;
let home;
let cart;
let about;

let cartSize = 0;

// Widget init:

export default function init(param) {
  mount = param;

  home = spaLink("/", "Home");
  cart = spaLink("/cart", cartTitle());
  about = spaLink("/about", "About");

  widget = html.div("", "menu-widget");
  widget.append(home, cart, about);

  mount.append(widget);

  events.subscribeAll(messages);
}

init.activate = () => {
  mount.append(widget);
};

init.deactivate = () => {
  if (mount.contains(widget)) mount.removeChild(widget);
};

function cartTitle() {
  return cartSize > 0 ? `Cart (${cartSize})` : "Cart";
}

// Widget event processing:

function messages(event, ...params) {
  switch (event) {
    case "ROUTER_ABOUT_PAGE":
      [home, cart].forEach((page) => page.classList.remove("selected"));
      about.classList.add("selected");
      break;
    case "ROUTER_HOME_PAGE":
      [cart, about].forEach((page) => page.classList.remove("selected"));
      home.classList.add("selected");
      break;
    case "ROUTER_CART_PAGE":
      [home, about].forEach((page) => page.classList.remove("selected"));
      cart.classList.add("selected");
      break;
    case "ROUTER_PRODUCT_PAGE":
    case "ROUTER_404":
    case "ROUTER_CHECKOUT_PAGE":
    case "ROUTER_ORDERED_PAGE":
      [home, cart, about].forEach((page) => page.classList.remove("selected"));
      break;

    case "CART_CONTENT_UPDATE":
      cartSize = params[0].length;
      cart.innerHTML = cartTitle();
    case "PRODUCT_ADD_TO_CART":
      break;
  }
}
