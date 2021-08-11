import { html } from "../utils/dom-tools.js";

export function header(id) {
  return html("h1", `Product ${id}`);
}

export function productInfo(product) {
  const ul = html.ul();
  ul.append(
    html.li(`ID: ${product.id}`),
    html.li(`Name: ${product.name}`),
    html.li(`Price: ${product.price}`)
  );

  return ul;
}

export function addToCardButton(onclick) {
  const elem = html.button("Add to Cart");
  elem.onclick = onclick;

  return elem;
}

export function goToCardButton(onclick) {
  const elem = html.button("Go to Cart");
  elem.onclick = onclick;

  return elem;
}
