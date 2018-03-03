var currentProduct;
var api = new API();
var select = document.getElementsByTagName("select")[0];
var date;

function createProduct() {
  this.visibleObj("save", "block");
  this.visibleObj("create", "none");
  this.visibleObj("update", "none");
  this.visibleObj("inform-table", "none");
  this.visibleObj("create-product", "block");
  this.visibleObj("all-products", "none");
  if (select.selectedIndex == 0) {
    currentProduct = new Product();
  } else if (select.selectedIndex == 1) {
    currentProduct = new Milk();
  } else if (select.selectedIndex == 2) {
    currentProduct = new Fish();
  }
}

function setProperties(properties, event) {
  currentProduct["set" + properties](event.target.value);
}

function onChangeProduct() {
  var milkTable = document.getElementById("milk-table");
  var fishTable = document.getElementById("fish-table");
  if (select.selectedIndex == 0) {
    milkTable.style.display = "none";
    fishTable.style.display = "none";
    currentProduct = new Product();
  } else if (select.selectedIndex == 1) {
    milkTable.style.display = "table";
    fishTable.style.display = "none";
    currentProduct = new Milk();
  } else if (select.selectedIndex == 2) {
    milkTable.style.display = "none";
    fishTable.style.display = "table";
    currentProduct = new Fish();
  }
}

function saveProduct() {
  var message = this.checkInputs();
  if (message != null) {
    alert(message);
    return;
  }
  api.post(JSON.stringify(currentProduct), loadProducts);
  this.visibleAllProducts();
  this.clearInputs();
}

function checkSymbol(event) {
    const value = event.key;
    if (event.key === "Delete" || event.key === "Tab" || event.key === "Backspace") {
        return true;
    } else if (isNaN(value)) {
        alert("В данном поле должны быть только числа!");
        event.preventDefault();
        event.stopPropagation();
        return;
    }
}

function checkInputs() {
  var container = document.getElementById("create-product").getElementsByTagName("table")[0];
  var Elements = container.getElementsByClassName("form-control");
  for (var i = 0; i < Elements.length; i++) {
      var el = Elements[i];
      if (el.value === "") {
          return "Все поля должны быть заполнены!";
      }
      if (el.id == "dateMan") {
        var now = new Date();
        var current = new Date(el.value);
        if(now < current) {
          return "Дата должна быть меньше текущей!";
        }
      }
      if (el.value.match(/[A-Za-zА-Яа-я0-9]+/) == null) {
          return "Все поля должны быть заполнены";
      }
  }

  if (currentProduct instanceof Milk) {
      var container = document.getElementById("milk-table");
      var Elements = container.getElementsByClassName("form-control");
      var el = Elements[1];
      if (el.value === "") {
          return "Все поля должны быть заполнены!";
      }
      if (el.value.match(/[A-Za-zА-Яа-я0-9]+/) == null) {
          return "Все поля должны быть заполнены";
      }
  }

  if (currentProduct instanceof Fish) {
      var container = document.getElementById("fish-table");
      var Elements = container.getElementsByClassName("form-control");
      var el = Elements[0];
      if (el.value === "") {
          return "Все поля должны быть заполнены!";
      }
      if (el.value.match(/[A-Za-zА-Яа-я0-9]+/) == null) {
          return "Все поля должны быть заполнены";
      }
  }
  return null;
}

function loadProducts(products) {
  var container = document.getElementById("all-products").getElementsByTagName("table")[0];
  for (var index in products) {
    var product = products[index];
    var tr = document.createElement('tr');
    var name = document.createElement("td");
    name.innerText = product.name;
    tr.appendChild(name);
    var department = document.createElement("td");
    department.innerText = product.department;
    tr.appendChild(department);
    var dateManufacture = document.createElement("td");
    dateManufacture.innerText = product.dateManufacture.substr(0, 10);
    tr.appendChild(dateManufacture);
    var shelfLife = document.createElement("td");
    shelfLife.innerText = product.shelfLife;
    tr.appendChild(shelfLife);
    container.appendChild(tr);
    var price = document.createElement("td");
    price.innerText = product.price;
    tr.appendChild(price);
    var mass = document.createElement("td");
    mass.innerText = product.mass;
    tr.appendChild(mass);
    container.appendChild(tr);
    var td = document.createElement("td");
    var button = document.createElement("input");
    button.setAttribute("type", "button")
    button.addEventListener('click', deleteProduct(product.id));
    button.value = "Удалить";
    td.appendChild(button);
    tr.appendChild(td);
    container.appendChild(tr);
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.addEventListener('click', editProduct(product.id));
    button.value = "Редактировать";
    td.appendChild(button);
    tr.appendChild(td);
    container.appendChild(tr);
    tr.addEventListener('click', show(product));
  }
}

function visibleObj(className, type) {
    var obj = document.getElementById(className);
    obj.style.display = type;
}

function visibleAllProducts() {
  this.visibleObj("all-products", "block");
  this.visibleObj("create-product", "none");
  this.visibleObj("create", "block");
  this.visibleObj("update", "none");
  this.visibleObj("inform-table", "none");
}

function getAllProducts() {
  api.get("", loadProducts);
}

function editProduct(id) {
  return function (event) {
      self.createProduct();
      api.get(id, edit);
      event.preventDefault();
      event.stopPropagation();
  }
}

function show(product) {
    return function (event) {
        self.showDetails(product);
    }
}

function showDetails(product) {
  this.visibleObj("all-products", "none");
  this.visibleObj("create-product", "none");
  this.visibleObj("inform-table", "table");
  var self = this;
  var container = document.getElementById("inform-table").getElementsByTagName("table")[0];
  var tr = document.createElement('tr');
  var label = document.createElement("td");
  label.innerText = "Название";
  tr.appendChild(label);
  var name = document.createElement("td");
  name.innerText = product.name;
  tr.appendChild(name);
  container.appendChild(tr);

  tr = document.createElement('tr');
  var label = document.createElement("td");
  label.innerText = "Отдел";
  tr.appendChild(label);
  var department = document.createElement("td");
  department.innerText = product.department;
  tr.appendChild(department);
  container.appendChild(tr);
  tr = document.createElement('tr');
  var label = document.createElement("td");
  label.innerText = "Дата изготовления";
  tr.appendChild(label);
  var dateManufacture = document.createElement("td");
  dateManufacture.innerText = product.dateManufacture.substr(0, 10);
  tr.appendChild(dateManufacture);
  container.appendChild(tr);
  tr = document.createElement('tr');
  var label = document.createElement("td");
  label.innerText = "Срок хранения";
  tr.appendChild(label);
  var shelfLife = document.createElement("td");
  shelfLife.innerText = product.shelfLife;
  tr.appendChild(shelfLife);
  container.appendChild(tr);
  tr = document.createElement('tr');
  var label = document.createElement("td");
  label.innerText = "Цена";
  tr.appendChild(label);
  var price = document.createElement("td");
  price.innerText = product.price;
  tr.appendChild(price);
  container.appendChild(tr);
  tr = document.createElement('tr');
  var label = document.createElement("td");
  label.innerText = "Масса";
  tr.appendChild(label);
  var mass = document.createElement("td");
  mass.innerText = product.mass;
  tr.appendChild(mass);
  container.appendChild(tr);
  if (product.type == "milk") {
      tr = document.createElement('tr');
      var label = document.createElement("td");
      label.innerText = "Процент жирности";
      tr.appendChild(label);
      var percentFat = document.createElement("td");
      percentFat.innerText = product.percentFat;
      tr.appendChild(percentFat);
      container.appendChild(tr);

      tr = document.createElement('tr');
      var label = document.createElement("td");
      label.innerText = "Объем";
      tr.appendChild(label);
      var volume = document.createElement("td");
      volume.innerText = product.volume;
      tr.appendChild(volume);
      container.appendChild(tr);
  } else if (product.type == "fish") {
      tr = document.createElement('tr');
      var label = document.createElement("td");
      label.innerText = "Разновидность";
      tr.appendChild(label);
      var variety = document.createElement("td");
      variety.innerText = product.variety;
      tr.appendChild(variety);
      container.appendChild(tr);
      tr = document.createElement('tr');
      var label = document.createElement("td");
      label.innerText = "Страна происхождения";
      tr.appendChild(label);
      var countryOrigin = document.createElement("td");
      countryOrigin.innerText = product.countryOrigin;
      tr.appendChild(countryOrigin);
      container.appendChild(tr);
  }
}

function deleteProduct(id) {
  return function (event) {
    if(confirm("Вы уверены?")) {
      self.clearTable(event);
      api.delete(id, getAllProducts);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

function clearTable() {
    var container = document.getElementById("all-products").getElementsByTagName("tr");
    var table = document.getElementById("all-products").getElementsByTagName("table")[0];
    var conLength = container.length;
    for (var i = 1; i < conLength; i++) {
        table.removeChild(container[1]);
    }
}

function back() {
    this.clearInputs();
    this.clearTableInfo();
    this.visibleAllProducts();
}

function editProductInfo(product) {
  var self = this;
  var container = document.getElementById("create-product").getElementsByTagName("table")[0];
  var Elements = container.getElementsByClassName("form-control");
  Elements[1].value = product.name;
  Elements[2].value = product.department;
  Elements[3].value = product.dateManufacture.substr(0,10);
  Elements[4].value = product.shelfLife;
  Elements[5].value = product.price;
  Elements[6].value = product.mass;
  if (product.type == "milk") {
      select.selectedIndex = 1;
      var fishTable = document.getElementById("fish-table");
      var milkTable = document.getElementById("milk-table");
      var Elements = milkTable.getElementsByClassName("form-control");
      fishTable.style.display = "none";
      milkTable.style.display = "table";
      Elements[0].value = product.volume;
      Elements[1].value = product.percentFat;
  } else if (product.type == "fish") {
      select.selectedIndex = 2;
      var fishTable = document.getElementById("fish-table");
      var Elements = fishTable.getElementsByClassName("form-control");
      var milkTable = document.getElementById("milk-table");
      fishTable.style.display = "table";
      milkTable.style.display = "none";
      Elements[1].value = product.variety;
      Elements[0].value = product.countryOrigin;
  }
  this.visibleObj("save", "none");
  this.visibleObj("update", "block");
  var but = document.getElementById("update");
  but.addEventListener('click', function () {
      self.clearTable();
      api.put(JSON.stringify(currentProduct), product.id, getAllProducts);
      self.clearInputs();
      self.visibleAllProducts();

  })
}

function edit(product) {
    this.visibleObj("create-product", "block")
    this.visibleObj("all-products", "none");
    this.editProductInfo(product);
    this.visibleObj("create", "none");
    this.visibleObj("inform-table", "none");
}

function clearInputs() {
    var arrayValue = document.getElementById("create-product").getElementsByClassName("form-control");
    for (var i = 0; i < arrayValue.length; i++) {
        var val = arrayValue[i];
            val.value = "";
    }
}

function clearTableInfo() {
    var arrayValue = document.getElementById("inform-table").getElementsByTagName("table")[0].rows;
    for (var i = 1; i < arrayValue.length; i++) {
        var val = arrayValue[i];
        val.innerText = "";
    }
}
