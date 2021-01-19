"use strict";

class Coords {
  #latitude;
  #longitude;
  constructor(latitude, longitude) {
    if (latitude === "") {
      throw new EmptyValueException("latitude");
    }

    if (longitude === "") {
      throw new EmptyValueException("longitude");
    }
    this.#latitude = latitude;
    this.#longitude = longitude;
  }

  get latitude() {
    return this.#latitude;
  }

  set latitude(latitude) {
    this.#latitude = latitude;
  }

  get longitude() {
    return this.#longitude;
  }

  set longitude(longitude) {
    this.#longitude = longitude;
  }
}
Object.defineProperty(Coords.prototype, "#latitude", {enumerable: true});
Object.defineProperty(Coords.prototype, "#longitude", {enumerable: true});
