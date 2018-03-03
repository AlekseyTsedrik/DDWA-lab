function API() {
  var url = "http://localhost:2403/products/";
  var xhr = new XMLHttpRequest();

  this.get = function (parm, callback) {
    xhr.open("GET", url + parm, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        callback(JSON.parse(xhr.response));
      }
    }
  }

  this.post = function(parm, callback) {
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(parm);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        callback([JSON.parse(xhr.response)]);
      }
    }
  }

  this.put = function (parm, id, callback) {
    xhr.open("PUT", url + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(parm);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        callback();
      }
    }
  }

  this.delete = function (id, callback) {
    xhr.open("DELETE", url + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        callback();
      }
    }
  }
}
