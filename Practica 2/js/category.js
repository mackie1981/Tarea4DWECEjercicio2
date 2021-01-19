"use strict";

class Category {
  #title;
  #description;
  constructor(title, description) {
    if (title === "") {
      throw new EmptyValueException("title");
    }
    this.#title = title;
    this.#description = description;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    if (title === "") {
      throw new EmptyValueException("title");
    }
    this.#title = title;
  }

  get description() {
    return this.#description;
  }
  set description(description) {
    this.#description = description;
  }
}
Object.defineProperty(Category.prototype, "#title", {enumerable: true});
Object.defineProperty(Category.prototype, "#description", {enumerable: true});
