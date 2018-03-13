"use strict"

import Product from "./product.js"

export default class Fish extends Product{
  constructor(variety, countryOrigin) {
    super();
    this.variety = variety;
    this.countryOrigin = countryOrigin;
    this.type = "fish";
  }

  set Variety(variety) {
    this.variety = variety;
  }

  get Variety() {
    return this.variety;
  }

  set CountryOrigin(countryOrigin) {
    this.countryOrigin = countryOrigin;
  }

  get CountryOrigin() {
    return this.countryOrigin;
  }
}
