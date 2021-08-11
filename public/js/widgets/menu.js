import { spaLink } from "../utils/dom-tools.js";

export const menu = document.getElementById("menu");

let cartSize = 0;

menu.cleanUp = () => {
  menu.textContent = "";
};

function cartTitle() {
  return cartSize > 0 ? `Cart (${cartSize})` : "Cart";
}

export default function render(event, ...params) {
  const home = spaLink("/", "Home");
  const cart = spaLink("/cart", cartTitle());
  const about = spaLink("/about", "About");

  const eventHandlers = {
    ROUTER_HOME_PAGE: () => {
      home.classList.add("selected");
    },
    ROUTER_CART_PAGE: () => {
      cart.classList.add("selected");
    },
    ROUTER_ABOUT_PAGE: () => {
      about.classList.add("selected");
    },
    ROUTER_PRODUCT_PAGE: () => {
      /* noop */
    },
    CART_CONTENT_UPDATE: (cartContent) => {
      cartSize = cartContent.length;
      cart.innerHTML = cartTitle();
    },
  };

  if (Object.keys(eventHandlers).includes(event)) {
    menu.cleanUp();
    menu.append(home, cart, about);
    eventHandlers[event](...params);
  }
}
