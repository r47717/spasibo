import { html } from "../utils/dom-tools.js";
import { events } from "../events.js";

// Widget props:

let mount;
let widget;

// Widget init:

export default function init(param) {
  console.log("about page widget initialized");
  mount = param;

  widget = html.div();
  widget.append(html.h1("About"));
  widget.append(
    html.div(
      "ESM based Vanilla JavaScript single page application with zero node_modules and no webpack"
    )
  );

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
