'use strict'

let worker = new Worker("worker.js");
let countProduct = document.getElementById("countProduct");
let period = 3000;
let remainingTime;
let startTime;
let previousValue;

worker.start = function () {
  startTime = new Date();
  worker.postMessage(period);
  setInterval(saveTime(), 500);
}()

worker.onmessage = function(param){
  remainingTime = period;
  countProduct.value = param.data;
  console.log("Запрос пошел!");
  startTime = new Date();
  worker.postMessage(remainingTime);
}

function saveTime() {
  localStorage.setItem('remainingTime', remainingTime - (new Date() - startTime));
  localStorage.setItem('previousValue', countProduct.value);
}
