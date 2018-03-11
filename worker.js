var url = "http://localhost:2403/products/";

function getCountProduct(response) {
  let func = function(response) {
    postMessage(response.length);
  }
  getAllProducts(func);
}

onmessage = function(param) {
  setTimeout(getCountProduct, param.data);
}

async function getAllProducts(callback) {
  let responseJson = await fetch(url);
  let resp = await responseJson.json();
  return await callback(resp);
}
