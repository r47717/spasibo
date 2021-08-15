import { html } from "../utils/dom-tools.js";
import { header, table } from "../components/product-list.js";
import { getProducts } from "../data/products.js";
import { loading } from "../components/loading.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;

// Widget init:

export default (param) => {
  mount = param;

  widget = html.div();

  const loadingIndicator = loading();
  widget.append(loadingIndicator);

  getProducts().then((products) => {
    if (widget.contains(loadingIndicator)) {
      widget.removeChild(loadingIndicator);
      widget.append(header());
      widget.append(table(products));
    }
  });

  events.subscribeAll(messages);
};

// Widget event loop:

function messages(event, ...params) {
  switch (event) {
    case "ROUTER_HOME_PAGE":
      mount.append(widget);
      break;
    case "ROUTER_ABOUT_PAGE":
    case "ROUTER_PRODUCT_PAGE":
    case "ROUTER_CART_PAGE":
    case "ROUTER_404":
    case "ROUTER_CHECKOUT_PAGE":
    case "ROUTER_ORDERED_PAGE":
      if (mount.contains(widget)) mount.removeChild(widget);
      break;

    case "CART_CONTENT_UPDATE":
    case "PRODUCT_ADD_TO_CART":
      break;
  }
}
