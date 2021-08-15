import {
  addToCardButton,
  goToCardButton,
  header,
  productInfo,
} from "../components/product.js";
import { getProducts } from "../data/products.js";
import { redirect, redirect404 } from "../router.js";
import { loading } from "../components/loading.js";
import { events } from "../events.js";
import { html } from "../utils/dom-tools.js";

// Widget props:

let mount;
let widget;
let id;
let product;
let button;

const buttonGoToCart = goToCardButton(() => {
  redirect("/cart");
});

const buttonAddToCart = addToCardButton(() => {
  events.emit("PRODUCT_ADD_TO_CART", { ...product });
});

let cart = [];

// Widget init:

export default (param) => {
  mount = param;

  widget = html.div("test");
  events.subscribeAll(messages);
};

function loadProduct(data) {
  const productId = +data[1];

  const loadingIndicator = loading();

  widget = html.div();
  widget.append(loadingIndicator);
  mount.append(widget);

  getProducts().then((products) => {
    if (widget.contains(loadingIndicator)) {
      widget.removeChild(loadingIndicator);
      const foundProduct = products.find((item) => item.id === productId);
      if (!foundProduct) {
        redirect404();
      } else {
        id = productId;
        product = foundProduct;
        widget.append(header(id));
        widget.append(productInfo(product));

        button = cart.some((product) => product.id === +id)
          ? buttonGoToCart
          : buttonAddToCart;

        widget.append(button);
      }
    }
  });
}

function updateButton() {
  if (widget.contains(button)) {
    widget.removeChild(button);

    button = cart.some((product) => product.id === +id)
      ? buttonGoToCart
      : buttonAddToCart;

    widget.append(button);
  }
}

// Widget event loop:

function messages(event, ...params) {
  switch (event) {
    case "ROUTER_PRODUCT_PAGE":
      loadProduct(...params);
      break;
    case "ROUTER_HOME_PAGE":
    case "ROUTER_CART_PAGE":
    case "ROUTER_404":
    case "ROUTER_ABOUT_PAGE":
    case "ROUTER_CHECKOUT_PAGE":
    case "ROUTER_ORDERED_PAGE":
      if (mount.contains(widget)) mount.removeChild(widget);
      break;
    case "CART_CONTENT_UPDATE":
      cart = params[0];
      updateButton();

    case "PRODUCT_ADD_TO_CART":
      break;
  }
}
