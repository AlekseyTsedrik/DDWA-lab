function API() {
  var url = "http://localhost:2403/products/";

  this.get = function (parm, callback) {
    fetch(url + parm)
    .then(function(response) {
    return response.json();
  })
  .then(callback);
  }

  this.post = function(parm, callback) {
    let options = {method: 'Post', headers: {'Content-Type': 'application/json'}, body: parm};
    fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
  }

  this.put = function (parm, id, callback) {
    let options = {method: 'Put', headers: {'Content-Type': 'application/json'}, body: parm};
    fetch(url + id, options)
    .then(callback);
  }

  this.delete = function (id, callback) {
    let options = {method: 'Delete'};
    fetch(url + id, options)
    .then(callback);
  }
}
