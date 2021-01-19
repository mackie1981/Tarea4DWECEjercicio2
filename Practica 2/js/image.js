"use strict";

class Image {
  #title;
  #descripcion;
  #url;
  #coordenadas;
  constructor(title, descripcion, url, coordenadas) {
    if (title === "") {
      throw new EmptyValueException("title");
    }

    if (url === "") {
      throw new EmptyValueException("url");
    }
    this.#title = title;
    this.#descripcion = descripcion;
    this.#url = url;
    this.#coordenadas = coordenadas;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    if (title !== "") {
      this.#title = title;
    }
  }

  get descripcion() {
    return this.#descripcion;
  }

  set descripcion(description) {
    this.#descripcion = description;
  }

  get url() {
    return this.#url;
  }

  set url(url) {
    if (url !== "") {
      this.#url = url;
    }
  }

  get coordenadas() {
    return this.#coordenadas;
  }

  set coordenadas(coordenadas) {
    this.#coordenadas = coordenadas;
  }
}
