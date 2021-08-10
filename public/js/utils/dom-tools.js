import { router } from "../router.js";

export const create = document.createElement.bind(document);

export const classes = (elem, classes) => {
  if (typeof classes === "string") {
    classes = classes.split(/\s+/);
  }

  if (Array.isArray(classes)) {
    for (const clazz of classes) {
      if (clazz) {
        elem.classList.add(clazz);
      }
    }
  }
};

export const html = (tag, text, classesList) => {
  const elem = create(tag);
  if (text) {
    elem.innerHTML = text || "";
  }
  classes(elem, classesList);

  return elem;
};

export const link = (href, title) => {
  const a = html("a", title);
  a.setAttribute("href", href);
  return a;
};

export const spaLink = (href, title) => {
  const a = link("#", title);
  a.onclick = (e) => {
    e.preventDefault();
    history.pushState({}, "", href);
    router();
  };

  return a;
};
