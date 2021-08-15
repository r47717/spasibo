import { html } from "../utils/dom-tools.js";

export function getHeader(id) {
  return html.h1(`Checkout`);
}

export function getCheckoutList(cart) {
  const ul = html.ul();
  for (const product of cart) {
    const li = html.li(`${product.name}, $${product.price}`);
    ul.append(li);
  }

  return ul;
}

export function getSubmitOrderButton() {
  return html.button("Submit Order");
}
