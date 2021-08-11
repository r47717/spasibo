import { spaLink } from "../utils/dom-tools.js";

export const menu = document.getElementById("menu");

menu.cleanUp = () => {
  menu.textContent = "";
};

export default function render(event, ...params) {
  menu.cleanUp();

  const home = spaLink("/", "Home");
  const about = spaLink("/about", "About");

  menu.append(home, about);

  switch (event) {
    case "HOME_PAGE":
      home.classList.add("selected");
      break;
    case "ABOUT_PAGE":
      about.classList.add("selected");
      break;
  }
}
