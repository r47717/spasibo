import { html } from "../../../utils/dom-tools.js";

// Widget props:

let mount;
let widget;

// Widget init:

const onInit = (mount) => {
  mount = mount;

  widget = html.div();
  widget.append(html.h1("About"));
  widget.append(html.div("template"));
};

// Widget event loop:

export default function render(event, ...params) {
  switch (event) {
    case "ROUTER_ABOUT_PAGE":
      mount.append(widget);
      break;
    case "ROUTER_HOME_PAGE":
    case "ROUTER_PRODUCT_PAGE":
    case "ROUTER_CART_PAGE":
    case "ROUTER_404":
      mount.removeChild(widget);
      break;
    case "CART_CONTENT_UPDATE":
    case "PRODUCT_ADD_TO_CART":
      break;
  }
}
