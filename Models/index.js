"use strict"

class Product {
  constructor(name, department, dateManufacture, shelfLife, price, mass) {
   this.name = name;
   this.department = department;
   this.dateManufacture = dateManufacture;
   this.shelfLife = shelfLife;
   this.price = price;
   this.mass = mass;
  }

  set Name(name) {
    this.name = name;
  }

  get Name() {
    return this.name;
  }

  set Department(department) {
    this.department = department;
  }

  get Department() {
    return this.department;
  }

  set DateManufacture(dateManufacture) {
    this.dateManufacture = dateManufacture;
  }

  get DateManufacture() {
    return this.dateManufacture;
  }

  set ShelfLife(shelfLife) {
    this.shelfLife = shelfLife;
  }

  get ShelfLife() {
    return this.shelfLife;
  }

  set Price(price) {
    this.price = price;
  }

  get Price() {
    return this.price;
  }

  set Mass(mass) {
    this.mass = mass;
  }

  get Mass() {
    return this.mass;
  }
}

class Milk extends Product {
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

class Fish extends Product{
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
