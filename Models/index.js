"use strict"

function Product(name, department, dateManufacture, shelfLife, price, mass) {
  this.name = name;
  this.department = department;
  this.dateManufacture = dateManufacture;
  this.shelfLife = shelfLife;
  this.price = price;
  this.mass = mass;

  this.setId = function (id) {
    this.id = id;
  }

  this.getId = function () {
    return this.id;
  }

  this.setName = function (name) {
    this.name = name;
  }

  this.getName = function () {
    return this.name;
  }

  this.setDepartment = function (department) {
    this.department = department;
  }

  this.getDepartment = function () {
    return this.department;
  }

  this.setDateManufacture = function (dateManufacture) {
    this.dateManufacture = dateManufacture.substr(0, 10);
  }

  this.getDateManufacture = function () {
    return this.dateManufacture;
  }

  this.setShelfLife = function (shelfLife) {
    this.shelfLife = shelfLife;
  }

  this.getShelfLife = function () {
    return this.shelfLife;
  }

  this.setPrice = function (price) {
    this.price = price;
  }

  this.getPrice = function () {
    return this.price;
  }

  this.setMass = function (mass) {
    this.mass = mass;
  }

  this.getMass = function () {
    return this.mass;
  }
}

function Milk(volume, percentFat) {
  this.volume = volume;
  this.percentFat = percentFat;
  this.type = "milk";

  Product.call(this);

  this.setVolume = function (volume) {
    this.volume = volume;
  }

  this.getVolume = function () {
    return this.volume;
  }

  this.setPercentFat = function (percentFat) {
    this.percentFat = percentFat;
  }

  this.getPercentFat = function (percentFat) {
    return this.percentFat;
  }
}

function Fish(variety, countryOrigin) {
  this.variety = variety;
  this.countryOrigin = countryOrigin;
  this.type = "fish";

  Product.call(this);

  this.setVariety = function (variety) {
    this.variety = variety;
  }

  this.getVariety = function () {
    return variety;
  }

  this.setCountryOrigin = function (countryOrigin) {
    this.countryOrigin = countryOrigin;
  }

  this.getCountryOrigin = function () {
    return this.countryOrigin;
  }
}
