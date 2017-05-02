angular.module('app.location.manager', ['app.http.connector'])

  .service('locationManager', function($q, httpConnector, ApiEndpoint) {

    this.getLocationList = function() {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/locations';

      httpConnector.get(url).then(
        function(data) {
          defer.resolve(data.data);
        },
        function(error) {
          console.log(error);
          defer.reject(data.data);
        }
      );
      return defer.promise;
    };

    this.getLocation = function(city) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/locations/' + city;

      httpConnector.get(url).then(
        function(data) {
          defer.resolve(data.data);
        },
        function(error) {
          console.log(error);
          defer.reject(data.data);
        }
      );
      return defer.promise;
    };

    this.setLocation = function(location) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/locations';

      httpConnector.post(url, location).then(
        function(data) {
          defer.resolve(data.data);
        },
        function(error) {
          console.log(error);
          defer.reject(data.data);
        }
      );
      return defer.promise;
    };

    this.putLocation = function(location) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/locations';

      httpConnector.put(url, location).then(
        function(data) {
          defer.resolve(data.data);
        },
        function(error) {
          console.log(error);
          defer.reject(data.data);
        }
      );
      return defer.promise;
    };

    this.deleteLocation = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/locations/' + idx;

      httpConnector.delete(url).then(
        function(data) {
          defer.resolve(data.data); // personList
        },
        function(error) {
          console.log(error);
          defer.reject(data.data);
        }
      );
      return defer.promise;
    };

  });
