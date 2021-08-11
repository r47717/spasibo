import homePage from "./pages/home-page.js";
import productPage from "./pages/product-page.js";
import cartPage from "./pages/cart-page.js";
import aboutPage from "./pages/about-page.js";
import notFound from "./pages/404.js";
import { reload } from "../../router.js";

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
  switch (event) {
    case "ROUTER_HOME_PAGE":
    case "ROUTER_PRODUCT_PAGE":
    case "ROUTER_CART_PAGE":
    case "ROUTER_ABOUT_PAGE":
    case "ROUTER_404":
      if (pageMap[event]) {
        activePage = pageMap[event];
        app.cleanUp();
        activePage(app, ...params);
      }
      break;
    case "CART_CONTENT_UPDATE":
    case "PRODUCT_ADD_TO_CART":
      reload();
      break;
  }
}
