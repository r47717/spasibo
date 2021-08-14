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
// import { cart } from "./cart-page.js";
import { html } from "../utils/dom-tools.js";

// Widget props:

let mount;
let widget;

// Widget init:

export default (param) => {
  mount = param;

  widget = html.div("test");
  events.subscribeAll(messages);
};

function loadProduct(data) {
  const id = data[1];

  const loadingIndicator = loading();

  widget = html.div();
  widget.append(loadingIndicator);
  mount.append(widget);

  getProducts().then((products) => {
    if (widget.contains(loadingIndicator)) {
      widget.removeChild(loadingIndicator);
      const product = products.find((item) => item.id === +id);
      if (!product) {
        redirect404();
      } else {
        widget.append(header(id));
        widget.append(productInfo(product));
        // console.log(cart);
        // if (cart.some((product) => product.id === +id)) {
        //   widget.append(
        //     goToCardButton(() => {
        //       redirect("/cart");
        //     })
        //   );
        // } else {
        widget.append(
          addToCardButton(() => {
            events.emit("PRODUCT_ADD_TO_CART", { ...product });
          })
        );
        // }
      }
    }
  });
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
      if (mount.contains(widget)) mount.removeChild(widget);
      break;
    case "CART_CONTENT_UPDATE":
    case "PRODUCT_ADD_TO_CART":
      break;
  }
}
