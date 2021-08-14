import { router } from "./router.js";
import menu from "./widgets/menu.js";
import homePage from "./widgets/home-page.js";
import cardPage from "./widgets/cart-page.js";
import aboutPage from "./widgets/about-page.js";
import productPage from "./widgets/product-page.js";

const activate = [
  [menu, document.getElementById("menu")],
  [homePage, document.getElementById("app")],
  [productPage, document.getElementById("app")],
  [cardPage, document.getElementById("app")],
  [aboutPage, document.getElementById("app")],
];

activate.forEach(([onInit, mount]) => onInit(mount));

window.onpopstate = () => router();
router();
