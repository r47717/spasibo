import { html } from "../utils/dom-tools.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;

// Widget init:

export default (param) => {
  console.log("about page widget initialized");
  mount = param;

  widget = html.div();
  widget.append(html.h1("About"));
  widget.append(
    html.div(
      "ESM based Vanilla JavaScript single page application with zero node_modules and no webpack"
    )
  );

  events.subscribeAll(render);
};

// Widget event loop:

function render(event, ...params) {
  switch (event) {
    case "ROUTER_ABOUT_PAGE":
      mount.append(widget);
      break;
    case "ROUTER_HOME_PAGE":
    case "ROUTER_PRODUCT_PAGE":
    case "ROUTER_CART_PAGE":
    case "ROUTER_404":
      if (mount.contains(widget)) mount.removeChild(widget);
      break;
  }
}
