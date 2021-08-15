import { router } from "./router.js";
import menu from "./widgets/menu.js";
import homePage from "./widgets/home-page.js";
import cartPage from "./widgets/cart-page.js";
import checkoutPage from "./widgets/checkout-page.js";
import orderedPage from "./widgets/ordered-page.js";
import aboutPage from "./widgets/about-page.js";
import productPage from "./widgets/product-page.js";
import { events } from "./events.js";

const widgets = [
  [menu, document.getElementById("menu"), ["*"]],
  [homePage, document.getElementById("app"), ["ROUTER_HOME_PAGE"]],
  [productPage, document.getElementById("app"), ["ROUTER_PRODUCT_PAGE"]],
  [cartPage, document.getElementById("app"), ["ROUTER_CART_PAGE"]],
  [checkoutPage, document.getElementById("app"), ["ROUTER_CHECKOUT_PAGE"]],
  [orderedPage, document.getElementById("app"), ["ROUTER_ORDERED_PAGE"]],
  [aboutPage, document.getElementById("app"), ["ROUTER_ABOUT_PAGE"]],
];

widgets.forEach(([init, mount]) => init(mount));

events.subscribeAll((event) => {
  if (!event.startsWith("ROUTER_")) return;

  widgets.forEach((widget) => {
    const routes = widget[2];
    if (routes) {
      if (routes.includes(event) || routes.includes("*")) {
        widget[0].activate();
      } else {
        widget[0].deactivate();
      }
    }
  });
});

window.onpopstate = () => router();
router();
