import { create, html, spaLink as link } from "../utils/dom-tools.js";

export function header() {
  return html.h1("Product List");
}

export function table(products, setFavorite) {
  const table = html.table("", "product-table");

  const thead = table.appendChild(create("thead"));
  const tr = thead.appendChild(create("tr"));

  tr.append(
    html.th("ID"),
    html.th("Name"),
    html.th("Price"),
    html.th("Favorite")
  );

  for (const product of products) {
    const tr = create("tr");
    const productLink = html.td();
    productLink.appendChild(link(`/products/${product.id}`, product.name));

    const favTD = html.td();
    const checkbox = html.checkbox(!!product.favorite);
    checkbox.onchange = () => {
      setFavorite(product.id, !product.favorite);
    };
    favTD.appendChild(checkbox);

    tr.append(html.td(product.id), productLink, html.td(product.price), favTD);
    table.appendChild(tr);
  }

  return table;
}
