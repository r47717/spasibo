import { html } from "../utils/dom-tools.js";

export function getHeader(id) {
  return html.h1(`Your Order is done!`);
}

export function getOrderText() {
  return html.div(
    "Your order has been submitted and will be soon processed! Thank you!"
  );
}
