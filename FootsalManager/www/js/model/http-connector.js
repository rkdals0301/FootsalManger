angular.module('app.http.connector', [])

  .service('httpConnector', function($http) {
    this.get = function(url) {
      // console.log('url request : ' + url);
      return $http.get(url);
    };

    this.getData = function(url, data) {
      // console.log('url request : ' + url);
      return $http.get(url, data);
    };

    this.post = function(url, data) {
      // console.log('url request : ' + url + 'data : ' + data);
      return $http.post(url, data);
    };

    this.put = function(url, data) {
      // console.log('url request : ' + url);
      return $http.put(url, data);
    };

    this.postImage = function(url, data) {
      // console.log('url request : ' + url);
      return $http.post(url, data, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      });
    };

    this.delete = function(url) {
      // console.log('url request : ' + url);
      return $http.delete(url);
    };

  });
