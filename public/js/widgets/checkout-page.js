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

export default function init(param) {
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
}

init.activate = () => {
  mount.append(widget);
};

init.deactivate = () => {
  if (mount.contains(widget)) mount.removeChild(widget);
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

// Widget event processing:

function messages(event, ...params) {
  switch (event) {
    case "CART_CONTENT_UPDATE":
      cart = params[0];
      updateCheckoutList();
      break;
    case "PRODUCT_ADD_TO_CART":
      break;
  }
}
