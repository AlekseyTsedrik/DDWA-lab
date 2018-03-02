function API() {
  var url = "http://localhost:2403/products/";
  var xhr = new XMLHttpRequest();

  this.get = function (parm, callback, error) {
    xhr.open("GET", url + parm, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback([JSON.parse(xhr.response)]);
      }
      else {
        error(xhr.responseText);
      }

    }
  }

  this.post = function(parm, callback, error) {
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(parm);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback([JSON.parse(xhr.response)]);
      } else {
        error(xhr.responseText);
      }
    }
  }

  this.put = function (parm, id, callback, error) {
    xhr.open("PUT", url + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(parm);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback();
      } else {
        error(xhr.responseText);
      }
    }
  }

  this.delete = function (id, callback, error) {
    xhr.open("DELETE", url + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback();
      } else {
        error(xhr.responseText);
      }
    }
  }
}
