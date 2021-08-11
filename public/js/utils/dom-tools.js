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

const tags = [
  "div",
  "ul",
  "li",
  "a",
  "table",
  "tbody",
  "thead",
  "tr",
  "th",
  "td",
  "h1",
  "h2",
  "h3",
  "button",
];

tags.forEach((tag) => {
  html[tag] = (text, classesList) => html(tag, text, classesList);
});

export const link = (href, title) => {
  const a = html.a(title);
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
