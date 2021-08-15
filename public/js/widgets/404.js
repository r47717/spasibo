import { html } from "../utils/dom-tools.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;

// Widget init:

export default function init(param) {
  mount = param;

  widget = html.div();
  widget.append(html("div", "404 - Not Found"));

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
