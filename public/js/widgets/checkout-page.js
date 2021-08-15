import { html } from "../utils/dom-tools.js";
import {
  getHeader,
  getCheckoutList,
  getSubmitOrderButton,
} from "../components/checkout.js";
import { events } from "../events.js";
import { redirect } from "../router.js";

// Widget props:

let mount;
let widget;
let checkoutList;
let submitOrderButton;
let cart = [];

// Widget init:

export default (param) => {
  mount = param;

  widget = html.div();
  checkoutList = getCheckoutList(cart);
  submitOrderButton = getSubmitOrderButton();
  submitOrderButton.onclick = () => {
    events.emit("CLEAR_CART");
    redirect("/ordered");
  };

  widget.append(getHeader(), checkoutList, submitOrderButton);

  events.subscribeAll(messages);
};

function updateCheckoutList() {
  if (widget.contains(checkoutList)) {
    widget.removeChild(checkoutList);
  }

  if (widget.contains(submitOrderButton)) {
    widget.removeChild(submitOrderButton);
  }

  checkoutList = getCheckoutList(cart);
  widget.append(checkoutList, submitOrderButton);
}

// Widget event loop:

function messages(event, ...params) {
  switch (event) {
    case "ROUTER_CHECKOUT_PAGE":
      mount.append(widget);
      break;
    case "ROUTER_CART_PAGE":
    case "ROUTER_HOME_PAGE":
    case "ROUTER_PRODUCT_PAGE":
    case "ROUTER_ABOUT_PAGE":
    case "ROUTER_404":
    case "ROUTER_ORDERED_PAGE":
      if (mount.contains(widget)) mount.removeChild(widget);
      break;

    case "CART_CONTENT_UPDATE":
      cart = params[0];
      updateCheckoutList();
      break;
    case "PRODUCT_ADD_TO_CART":
      break;
  }
}
