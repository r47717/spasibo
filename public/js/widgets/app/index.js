import homePage from "./pages/home-page.js";
import productPage from "./pages/product-page.js";
import aboutPage from "./pages/about-page.js";
import notFound from "./pages/404.js";

const app = document.getElementById("app");

app.cleanUp = () => {
  app.textContent = "";
};

const pageMap = {
  HOME_PAGE: homePage,
  PRODUCT_PAGE: productPage,
  ABOUT_PAGE: aboutPage,
  404: notFound,
};

export default function render(event, ...params) {
  app.cleanUp();
  pageMap[event](app, ...params);
}
