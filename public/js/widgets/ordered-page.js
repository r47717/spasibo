import { html } from "../utils/dom-tools.js";
import { getHeader, getOrderText } from "../components/ordered.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;

// Widget init:

export default (param) => {
  mount = param;

  widget = html.div();
  widget.append(getHeader(), getOrderText());

  events.subscribeAll(messages);
};

// Widget event loop:

function messages(event, ...params) {
  switch (event) {
    case "ROUTER_ORDERED_PAGE":
      mount.append(widget);
      break;
    case "ROUTER_HOME_PAGE":
    case "ROUTER_PRODUCT_PAGE":
    case "ROUTER_ABOUT_PAGE":
    case "ROUTER_404":
    case "ROUTER_CART_PAGE":
    case "ROUTER_CHECKOUT_PAGE":
      if (mount.contains(widget)) mount.removeChild(widget);
      break;
  }
}
