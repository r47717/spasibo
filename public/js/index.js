import { router } from "./router.js";

window.onpopstate = () => router();

router();
