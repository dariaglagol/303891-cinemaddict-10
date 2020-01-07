import {RenderPosition} from "../mocks/constants";

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const render = (container, template, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(template);
      break;
    case RenderPosition.BEFORE_END:
      container.append(template);
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replaceElement = (parentElement, replacementElement, replaceableElement) => {
  console.log(parentElement, replacementElement, replaceableElement);
  parentElement.replaceChild(replacementElement.getElement(), replaceableElement.getElement());
};

export {createElement, render, remove, replaceElement};
