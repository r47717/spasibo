import { html, spaLink as link } from "../utils/dom-tools.js";

export function header(id) {
  return html("h1", `Product ${id}`);
}
