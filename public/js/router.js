import { app } from "./components/app.js";
import homePage from "./pages/home-page.js";
import productPage from "./pages/product-page.js";
import aboutPage from "./pages/about-page.js";
import notFound from "./pages/404.js";

export function router() {
  const { pathname } = window.location;

  app.cleanUp();

  const routes = [
    {
      pattern: "/",
      regex: /^\/$/g,
      page: homePage,
    },
    {
      pattern: "/products/:id",
      regex: /^\/products\/(\w+)$/,
      page: productPage,
    },

    {
      pattern: "/about",
      regex: /^\/about$/,
      page: aboutPage,
    },
  ];

  for (const route of routes) {
    const match = pathname.match(route.regex);
    if (match) {
      route.page(app, match);
      return;
    }
  }

  notFound(app);
}

export function redirect(url) {
  history.pushState({}, "", url);
}

export function redirect404() {
  app.cleanUp();
  notFound(app);
}
