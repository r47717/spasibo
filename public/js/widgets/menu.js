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

  switch (event) {
    case "ROUTER_HOME_PAGE":
      home.classList.add("selected");
      break;
    case "ROUTER_CART_PAGE":
      cart.classList.add("selected");
      break;
    case "ROUTER_ABOUT_PAGE":
      about.classList.add("selected");
      break;
    case "ROUTER_PRODUCT_PAGE":
      /* no action */
      break;
    case "CART_CONTENT_UPDATE":
      const cartContent = params[0];
      cartSize = cartContent.length;
      console.log(cartSize);
      cart.innerHTML = cartTitle();
      break;
  }

  if (
    [
      "ROUTER_HOME_PAGE",
      "ROUTER_CART_PAGE",
      "ROUTER_ABOUT_PAGE",
      "ROUTER_PRODUCT_PAGE",
      "CART_CONTENT_UPDATE",
    ].includes(event)
  ) {
    menu.cleanUp();
    menu.append(home, cart, about);
  }
}
