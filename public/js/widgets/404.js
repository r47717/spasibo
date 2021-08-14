export default function (app) {
  app.append(html("div", "404 - Not Found"));
}

import { html } from "../../../utils/dom-tools.js";

// Widget props:

let mount;
let widget;

// Widget init:

export const onInit = (mount) => {
  mount = mount;

  widget = html.div();
  widget.append(html("div", "404 - Not Found"));
};

// Widget event loop:

export default function render(event, ...params) {
  switch (event) {
    case "ROUTER_404":
      mount.append(widget);
    case "ROUTER_ABOUT_PAGE":
    case "ROUTER_HOME_PAGE":
    case "ROUTER_PRODUCT_PAGE":
    case "ROUTER_CART_PAGE":
      mount.removeChild(widget);
      break;
    case "CART_CONTENT_UPDATE":
    case "PRODUCT_ADD_TO_CART":
      break;
  }
}
