"use strict"
var url = "http://localhost:2403/products/";

export async function Get(parm, callback) {
  let responseJson = await fetch(url + parm);
  let resp = await responseJson.json();
  return await callback(resp);
}

export async function Post(parm) {
  let options = {method: 'Post', headers: {'Content-Type': 'application/json'}, body: parm};
  let resp = await fetch(url, options);
}

export async function Put(parm, id, callback) {
  let options = {method: 'Put', headers: {'Content-Type': 'application/json'}, body: parm};
  let resp = await fetch(url + id, options);
  return callback(resp);
}

export async function Delete(id, callback) {
  let options = {method: 'Delete'};
  let resp = await fetch(url + id, options);
  return callback(resp);
}
