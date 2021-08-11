import widgets from "./widgets.js";
import { events } from "./events.js";

for (const widget of widgets) {
  events.subscribeAll(widget);
}

const routes = [
  {
    pattern: "/",
    regex: /^\/$/g,
    event: "ROUTER_HOME_PAGE",
  },
  {
    pattern: "/products/:id",
    regex: /^\/products\/(\w+)$/,
    event: "ROUTER_PRODUCT_PAGE",
  },
  {
    pattern: "/cart",
    regex: /^\/cart$/,
    event: "ROUTER_CART_PAGE",
  },
  {
    pattern: "/about",
    regex: /^\/about$/,
    event: "ROUTER_ABOUT_PAGE",
  },
];

export function router() {
  const { pathname } = window.location;

  for (const route of routes) {
    const match = pathname.match(route.regex);
    if (match) {
      events.emit(route.event, match);
      return;
    }
  }

  redirect404();
}

export function redirect(url) {
  history.pushState({}, "", url);
}

export function redirect404() {
  events.emit("ROUTER_404");
}
