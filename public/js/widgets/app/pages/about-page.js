import { html } from "../../../utils/dom-tools.js";

export default function (app) {
  app.append(html.h1("About"));
  app.append(
    html.div(
      "ESM based Vanilla JavaScript single page application with zero node_modules and no webpack"
    )
  );
}
