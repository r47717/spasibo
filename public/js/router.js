import { EventEmitter } from "./utils/events.js";
import components from "./widgets.js";

const events = new EventEmitter();

for (const component of components) {
  events.subscribeAll(component);
}

const routes = [
  {
    pattern: "/",
    regex: /^\/$/g,
    event: "HOME_PAGE",
  },
  {
    pattern: "/products/:id",
    regex: /^\/products\/(\w+)$/,
    event: "PRODUCT_PAGE",
  },
  {
    pattern: "/about",
    regex: /^\/about$/,
    event: "ABOUT_PAGE",
  },
];

export function router() {
  const { pathname } = window.location;

  for (const route of routes) {
    const match = pathname.match(route.regex);
    if (match) {
      events.execute(route.event, match);
      return;
    }
  }

  redirect404();
}

export function redirect(url) {
  history.pushState({}, "", url);
}

export function redirect404() {
  events.execute("404");
}
