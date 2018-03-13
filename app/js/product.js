"use strict"

export default class Product {
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
