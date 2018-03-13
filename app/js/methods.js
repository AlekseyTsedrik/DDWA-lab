import * as api from './api.js'
import Product from './product.js'
import Milk from './milk.js'
import Fish from './fish.js'

var currentProduct;
var select = document.getElementsByTagName("select")[0];
var date;
const toLowerText = (text) => text.toLowerCase();
const visibleRow = (row, bool) => {
  row.hidden = bool;
}

export function createProduct() {
  this.visibleElement("save", "block");
  this.visibleElement("create", "none");
  this.visibleElement("update", "none");
  this.visibleElement("inform-table", "none");
  this.visibleElement("create-product", "block");
  this.visibleElement("all-products", "none");
  if (select.selectedIndex == 0) {
    currentProduct = new Product();
  } else if (select.selectedIndex == 1) {
    currentProduct = new Milk();
  } else if (select.selectedIndex == 2) {
    currentProduct = new Fish();
  }
}

export function setProperties(properties, event) {
  currentProduct[properties] = event.target.value;
}

export function onChangeProduct() {
  let milkTable = document.getElementById("milk-table");
  let fishTable = document.getElementById("fish-table");
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

export function saveProduct() {
  let message = this.checkInputs();
  if (message != null) {
    alert(message);
    return;
  }
  api.Post(JSON.stringify(currentProduct));
  this.visibleAllProducts();
  this.clearInputs();
}

export function checkSymbol(event) {
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

export function checkText(event) {
  const value = event.key;
  if (value.match(/[0-9]+/) != null) {
    alert("В данном поле должны быть только буквы!");
    event.preventDefault();
    event.stopPropagation();
    return;
  }
}

function checkInputs() {
  let container = document.getElementById("create-product").getElementsByTagName("table")[0];
  let Elements = container.getElementsByClassName("form-control");
  for (var i = 0; i < Elements.length; i++) {
      var el = Elements[i];
      if (el.value === "") {
          return "Все поля должны быть заполнены!";
      }
      if (el.id == "dateMan") {
        let now = new Date();
        let current = new Date(el.value);
        if(now < current) {
          return `Дата (${el.value}) не корректна! Одолжна быть меньше текущей!`;
        }
      }
      if (el.value.match(/[A-Za-zА-Яа-я0-9]+/) == null) {
          return "Все поля должны быть заполнены";
      }
  }

  if (currentProduct instanceof Milk) {
      let container = document.getElementById("milk-table");
      let Elements = container.getElementsByClassName("form-control");
      let el = Elements[1];
      if (el.value === "") {
          return "Все поля должны быть заполнены!";
      }
      if (el.value.match(/[A-Za-zА-Яа-я0-9]+/) == null) {
          return "Все поля должны быть заполнены";
      }
  }

  if (currentProduct instanceof Fish) {
      let container = document.getElementById("fish-table");
      let Elements = container.getElementsByClassName("form-control");
      let el = Elements[0];
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
  let container = document.getElementById("all-products").getElementsByTagName("table")[0];
  for (let index in products) {
    let product = products[index];
    let tr = document.createElement('tr');
    let name = document.createElement("td");
    name.innerText = product.name;
    tr.appendChild(name);
    let department = document.createElement("td");
    department.innerText = product.department;
    tr.appendChild(department);
    let dateManufacture = document.createElement("td");
    dateManufacture.innerText = product.dateManufacture;
    tr.appendChild(dateManufacture);
    let shelfLife = document.createElement("td");
    shelfLife.innerText = product.shelfLife;
    tr.appendChild(shelfLife);
    container.appendChild(tr);
    let price = document.createElement("td");
    price.innerText = product.price;
    tr.appendChild(price);
    let mass = document.createElement("td");
    mass.innerText = product.mass;
    tr.appendChild(mass);
    container.appendChild(tr);
    let td = document.createElement("td");
    let button = document.createElement("input");
    button.setAttribute("type", "button")
    button.addEventListener('click', deleteProduct(product.id));
    button.value = "Удалить";
    td.appendChild(button);
    tr.appendChild(td);
    container.appendChild(tr);
    let button1 = document.createElement("input");
    button1.setAttribute("type", "button");
    button1.addEventListener('click', editProduct(product.id));
    button1.value = "Редактировать";
    td.appendChild(button1);
    tr.appendChild(td);
    container.appendChild(tr);
    tr.addEventListener('click', show(product));
  }
}

function visibleElement(className, type) {
    let obj = document.getElementById(className);
    obj.style.display = type;
}

export function visibleAllProducts() {
  this.visibleElement("all-products", "block");
  this.visibleElement("create-product", "none");
  this.visibleElement("create", "block");
  this.visibleElement("update", "none");
  this.visibleElement("inform-table", "none");
}

export function getAllProducts() {
  api.Get("", loadProducts);
}

function editProduct(id) {
  return function (event) {
      self.createProduct();
      api.Get(id, edit);
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
  this.visibleElement("all-products", "none");
  this.visibleElement("create-product", "none");
  this.visibleElement("inform-table", "table");
  let self = this;
  let container = document.getElementById("inform-table").getElementsByTagName("table")[0];
  let tr = document.createElement('tr');
  let label = document.createElement("td");
  label.innerText = "Название";
  tr.appendChild(label);
  let name = document.createElement("td");
  name.innerText = product.name;
  tr.appendChild(name);
  container.appendChild(tr);

  tr = document.createElement('tr');
  let label = document.createElement("td");
  label.innerText = "Отдел";
  tr.appendChild(label);
  let department = document.createElement("td");
  department.innerText = product.department;
  tr.appendChild(department);
  container.appendChild(tr);
  tr = document.createElement('tr');
  let label = document.createElement("td");
  label.innerText = "Дата изготовления";
  tr.appendChild(label);
  let dateManufacture = document.createElement("td");
  dateManufacture.innerText = product.dateManufacture.substr(0, 10);
  tr.appendChild(dateManufacture);
  container.appendChild(tr);
  tr = document.createElement('tr');
  let label = document.createElement("td");
  label.innerText = "Срок хранения";
  tr.appendChild(label);
  let shelfLife = document.createElement("td");
  shelfLife.innerText = product.shelfLife;
  tr.appendChild(shelfLife);
  container.appendChild(tr);
  tr = document.createElement('tr');
  let label = document.createElement("td");
  label.innerText = "Цена";
  tr.appendChild(label);
  var price = document.createElement("td");
  price.innerText = product.price;
  tr.appendChild(price);
  container.appendChild(tr);
  tr = document.createElement('tr');
  let label = document.createElement("td");
  label.innerText = "Масса";
  tr.appendChild(label);
  let mass = document.createElement("td");
  mass.innerText = product.mass;
  tr.appendChild(mass);
  container.appendChild(tr);
  if (product.type == "milk") {
      tr = document.createElement('tr');
      let label = document.createElement("td");
      label.innerText = "Процент жирности";
      tr.appendChild(label);
      let percentFat = document.createElement("td");
      percentFat.innerText = product.percentFat;
      tr.appendChild(percentFat);
      container.appendChild(tr);

      tr = document.createElement('tr');
      let label = document.createElement("td");
      label.innerText = "Объем";
      tr.appendChild(label);
      let volume = document.createElement("td");
      volume.innerText = product.volume;
      tr.appendChild(volume);
      container.appendChild(tr);
  } else if (product.type == "fish") {
      tr = document.createElement('tr');
      let label = document.createElement("td");
      label.innerText = "Разновидность";
      tr.appendChild(label);
      let variety = document.createElement("td");
      variety.innerText = product.variety;
      tr.appendChild(variety);
      container.appendChild(tr);
      tr = document.createElement('tr');
      let label = document.createElement("td");
      label.innerText = "Страна происхождения";
      tr.appendChild(label);
      let countryOrigin = document.createElement("td");
      countryOrigin.innerText = product.countryOrigin;
      tr.appendChild(countryOrigin);
      container.appendChild(tr);
  }
}

function deleteProduct(id) {
  return function (event) {
    if(confirm("Вы уверены?")) {
      self.clearTable(event);
      api.Delete(id, getAllProducts);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

function clearTable() {
    let container = document.getElementById("all-products").getElementsByTagName("tr");
    let table = document.getElementById("all-products").getElementsByTagName("table")[0];
    let conLength = container.length;
    for (let i = 1; i < conLength; i++) {
        table.removeChild(container[1]);
    }
}

function back() {
    this.clearInputs();
    this.clearTableInfo();
    this.visibleAllProducts();
}

function editProductInfo(product) {
  let self = this;
  let container = document.getElementById("create-product").getElementsByTagName("table")[0];
  let [select, name, department, dateManufacture, shelfLife, price, mass] = container.getElementsByClassName("form-control");
  name.value = product.name;
  department.value = product.department;
  dateManufacture.value = product.dateManufacture.substr(0,10);
  shelfLife.value = product.shelfLife;
  price.value = product.price;
  mass.value = product.mass;
  if (product.type == "milk") {
      select.selectedIndex = 1;
      let fishTable = document.getElementById("fish-table");
      let milkTable = document.getElementById("milk-table");
      let Elements = milkTable.getElementsByClassName("form-control");
      fishTable.style.display = "none";
      milkTable.style.display = "table";
      Elements[0].value = product.volume;
      Elements[1].value = product.percentFat;
  } else if (product.type == "fish") {
      select.selectedIndex = 2;
      let fishTable = document.getElementById("fish-table");
      let Elements = fishTable.getElementsByClassName("form-control");
      let milkTable = document.getElementById("milk-table");
      fishTable.style.display = "table";
      milkTable.style.display = "none";
      Elements[1].value = product.variety;
      Elements[0].value = product.countryOrigin;
  }
  this.visibleElement("save", "none");
  this.visibleElement("update", "block");
  let but = document.getElementById("update");
  but.addEventListener('click', function () {
      self.clearTable();
      api.Put(JSON.stringify(currentProduct), product.id, getAllProducts);
      self.clearInputs();
      self.visibleAllProducts();

  })
}

function edit(product) {
    this.visibleElement("create-product", "block")
    this.visibleElement("all-products", "none");
    this.editProductInfo(product);
    this.visibleElement("create", "none");
    this.visibleElement("inform-table", "none");
}

export function clearInputs() {
    let arrayValue = document.getElementById("create-product").getElementsByClassName("form-control");
    for (let i = 0; i < arrayValue.length; i++) {
        let val = arrayValue[i];
            val.value = "";
    }
}

function clearTableInfo() {
    let arrayValue = document.getElementById("inform-table").getElementsByTagName("table")[0].rows;
    for (let i = 1; i < arrayValue.length; i++) {
        let val = arrayValue[i];
        val.innerText = "";
    }
}

export function searchProduct(table, searchText) {
  let iterator = new Iterator(table);
  let row = iterator.next();
  while (row.value != null) {
    visibleRow(row.value, searchInRows(searchText, row.value, [0, 1, 2]));
    row = iterator.next();
  }
}

function searchInRows(searchText, row, cellsArray = [0]) {
  for (let cell in cellsArray) {
    if (searchInCell(searchText, row, cell)) {
      return false;
    }
  }
  return true;
}

function searchInCell(searchText, row, cellIndex) {
  let textInCell = row.cells[cellIndex].textContent;
  let lowSearchText = toLowerText(searchText);
  let result = toLowerText(textInCell).includes(lowSearchText);
  return result;
}

function Iterator(table) {
  let current = 1;
  let row = table.rows;
  return {
    next: function() {
      return current < row.length ? {value: row[current++], done: false} : {done: true};
    }
  }
}

export function sortTable(table, e) {
  let type = e.target.getAttribute('data-type');
  let cellIndex = e.target.cellIndex;
  var tbody = table.getElementsByTagName('tbody')[0];
  var rowsArray = [].slice.call(tbody.rows);
  var compare;
      switch (type) {
        case 'number':
          compare = function(rowA, rowB) {
            return rowA.cells[cellIndex].innerHTML - rowB.cells[cellIndex].innerHTML;
          };
          break;
        case 'string':
          compare = function(rowA, rowB) {
            return rowA.cells[cellIndex].innerHTML > rowB.cells[cellIndex].innerHTML;
          };
          break;
      }
  rowsArray.sort(compare);
  table.removeChild(tbody);
  for (let i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
      }
  table.appendChild(tbody);
}
