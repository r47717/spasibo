import { create, html, spaLink as link } from "../utils/dom-tools.js";

export function header() {
  return html.h1("Product List");
}

export function table(products) {
  const table = html.table("", "product-table");

  const thead = table.appendChild(create("thead"));
  const tr = thead.appendChild(create("tr"));

  tr.append(html.th("ID"), html.th("Name"), html.th("Price"));

  for (const product of products) {
    const tr = create("tr");
    const productLink = html.td();
    productLink.appendChild(link(`/products/${product.id}`, product.name));

    tr.append(html.td(product.id), productLink, html.td(product.price));
    table.appendChild(tr);
  }

  return table;
}
