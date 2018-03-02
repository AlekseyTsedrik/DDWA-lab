function Product() {
  this.name = name;
  this.department = department;
  this.dateManufacture = dateManufacture;
  this.shelfLife = shelfLife;
  this.price = price;
  this.weight = weight;

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

  this.setDepartament = function (department) {
    this.department = department;
  }

  this.getDepartment = function () {
    return this.department;
  }

  this.setDateManufacture = function (dateManufacture) {
    this.dateManufacture = dateManufacture;
  }

  this.getDateManufacture = function () {
    return this.dateManufacture;
  }

  this.setShelfLife = function () {
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

  this.setWeight = function (weight) {
    this.weight = weight;
  }

  this.getWeight = function () {
    return this.weight;
  }
}

function Milk() {
  this.volume = volume;
  this.percentFat = percentFat;

  Product.call(this);

  this.setVolume = function (percentVolume) {
    this.percentVolume = percentVolume;
  }

  this.getVolume = function () {
    return this.percentVolume;
  }

  this.setPercentFat = function (percentFat) {
    this.percentFat = percentFat;
  }

  this.getPercentFat = function (percentFat) {
    return this.percentFat;
  }
}

function Fish() {
  this.variety = variety;
  this.сountryOrigin = countryOrigin;

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
