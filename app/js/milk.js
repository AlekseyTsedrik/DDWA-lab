"use strict"

import Product from "./product.js"

export default class Milk extends Product {
  constructor(volume, percentFat) {
    super();
    this.volume = volume;
    this.percentFat = percentFat;
    this.type = "milk";
  }

  set Volume(volume) {
    this.volume = volume;
  }

  get Volume() {
    return this.volume;
  }

  set PercentFat(percentFat) {
    this.percentFat = percentFat;
  }

  get PercentFat() {
    return this.percentFat;
  }
}
