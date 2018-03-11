var url = "http://localhost:2403/products/";

async function Get(parm, callback) {
  let responseJson = await fetch(url + parm);
  let resp = await responseJson.json();
  return await callback(resp);
}

async function Post(parm) {
  let options = {method: 'Post', headers: {'Content-Type': 'application/json'}, body: parm};
  let resp = await fetch(url, options);
}

async function Put(parm, id, callback) {
  let options = {method: 'Put', headers: {'Content-Type': 'application/json'}, body: parm};
  let resp = await fetch(url + id, options);
  return callback(resp);
}

async function Delete(id, callback) {
  let options = {method: 'Delete'};
  let resp = await fetch(url + id, options);
  return callback(resp);
}
