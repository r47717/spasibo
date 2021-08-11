import { html } from "../utils/dom-tools.js";

export function header(id) {
  return html("h1", `Cart`);
}

export function cartList(cart, { remove }) {
  if (!cart || cart.length === 0) {
    return html.div("No products in cart");
  }

  const ul = html.ul();
  for (const product of cart) {
    const li = html.li(`${product.name}, $${product.price}`);
    const removeButton = html.button("Remove");
    removeButton.onclick = () => remove(product.id);
    li.append(removeButton);
    ul.append(li);
  }

  return ul;
}
