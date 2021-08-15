import { html } from "../../../utils/dom-tools.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;

// Widget init:

export default function (param) {
  mount = param;

  widget = html.div();
  widget.append(html.h1("About"));
  widget.append(html.div("template"));

  events.subscribeAll(messages)
};

init.activate = () => {
  mount.append(widget);
}

init.deactivate = () => {
  if (mount.contains(widget)) mount.removeChild(widget);
}

// Widget event processing:

export default function messages(event, ...params) {
  switch (event) {
    case "CART_CONTENT_UPDATE":
    case "PRODUCT_ADD_TO_CART":
      break;
  }
}
