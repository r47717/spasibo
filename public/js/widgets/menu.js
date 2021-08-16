import { html, spaLink, classes } from "../utils/dom-tools.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;
let home;
let cart;
let about;
let favoriteElements = [];

let favoriteDelimiter;
let favoriteProducts = [];
let cartSize = 0;

// Widget init:

export default function init(param) {
  mount = param;

  home = spaLink("/", "Home");
  cart = spaLink("/cart", cartTitle());
  about = spaLink("/about", "About");

  favoriteDelimiter = html.div("", "delimiter");

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

function updateFavorites() {
  favoriteElements.forEach((favorite) => {
    if (widget.contains(favorite)) {
      widget.removeChild(favorite);
    }
  });

  if (widget.contains(favoriteDelimiter)) {
    widget.removeChild(favoriteDelimiter);
  }

  favoriteElements = [];
  favoriteProducts.forEach((favorite) => {
    if (favorite.favorite) {
      const elem = spaLink(`/products/${favorite.id}`, favorite.name);
      favoriteElements.push(elem);
    }
  });

  if (favoriteElements.length > 0) {
    widget.append(favoriteDelimiter, ...favoriteElements);
  }
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
      const newCart = params[0];
      cartSize = newCart.length;
      cart.innerHTML = cartTitle();
    case "PRODUCT_ADD_TO_CART":
      break;
    case "PRODUCT_CHANGE_FAVORITE":
      const [product] = params;
      const found = favoriteProducts.find((pr) => pr.id === product.id);
      if (found) {
        found.favorite = product.favorite;
      } else {
        favoriteProducts.push({ ...product });
      }
      console.log(favoriteProducts);
      updateFavorites();
      break;
  }
}
