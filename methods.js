var product;
var api = new API();
var select = document.getElementsByTagName("select")[0];

function createProduct() {
  if (select.selectedIndex == 1) {
    product = new Product();
  } else if (select.selectedIndex == 2) {
    product = new Milk();
  } else if (select.selectedIndex == 3) {
    product = new Fish();
  }
}

function setProperties(properties, event) {
  product["set" + type](event.target.value);
}

function error(textError) {
  alert(textError);
}

function onChangeProduct() {
  var milkTable = document.getElementById("milk-table");
  var fishTable = document.getElementById("fish-table");
  if (select.selectedIndex == 1) {
    milkTable.style.display = "none";
    fishTable.style.display = "none";
    product = new Product();
  } else if (select.selectedIndex == 2) {
    milkTable.style.display = "block";
    fishTable.style.display = "none";
    product = new Milk();
  } else if (select.selectedIndex == 3) {
    milkTable.style.display = "none";
    fishTable.style.display = "block";
    product = new Fish();
  }
}

function saveProduct() {
  api.post(JSON.stringify(product), loadProducts, error);
}

function loadProducts(products) {
  var container = document.getElementById("all-products").getElementsByTagName("table")[0];
  for (var index in products) {
    var product = products[index];
  }
}

function visibleObj(className, type) {
    var obj = document.getElementById(className);
    obj.style.display = type;
}

function visibleAllProducts() {
  this.visibleObj("all-products", "block");
  this.visibleObj("create-product", "none");
}
