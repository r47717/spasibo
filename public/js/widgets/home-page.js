import { html } from "../utils/dom-tools.js";
import { header, table } from "../components/product-list.js";
import { getProducts } from "../data/products.js";
import { loading } from "../components/loading.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;

// Widget init:

export default function init(param) {
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
}

init.activate = () => {
  mount.append(widget);
};

init.deactivate = () => {
  if (mount.contains(widget)) mount.removeChild(widget);
};

// Widget event processing:

function messages(event, ...params) {}
