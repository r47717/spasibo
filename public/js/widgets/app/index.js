import homePage from "./pages/home-page.js";
import productPage from "./pages/product-page.js";
import cartPage, { cart } from "./pages/cart-page.js";
import aboutPage from "./pages/about-page.js";
import notFound from "./pages/404.js";

const app = document.getElementById("app");

let activePage = homePage;

app.cleanUp = () => {
  app.textContent = "";
};

const pageMap = {
  ROUTER_HOME_PAGE: homePage,
  ROUTER_PRODUCT_PAGE: productPage,
  ROUTER_CART_PAGE: cartPage,
  ROUTER_ABOUT_PAGE: aboutPage,
  ROUTER_404: notFound,
};

export default function render(event, ...params) {
  if (pageMap[event]) {
    activePage = pageMap[event];
  }

  if (
    pageMap[event] ||
    (activePage === cartPage && event === "CART_CONTENT_UPDATE")
  ) {
    app.cleanUp();
    activePage(app, ...params);
  }
}
