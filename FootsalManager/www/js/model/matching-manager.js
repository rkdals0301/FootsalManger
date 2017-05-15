angular.module('app.matching.manager', ['app.http.connector'])

  .service('matchingManager', function($q, httpConnector, ApiEndpoint) {

    this.getMatchingLocationList = function(location) {
      var locations = {
        'city' : location.city,
        'gu' : location.gu
      };

      var defer = $q.defer();
      var url = ApiEndpoint.url +'/matches/location';

      httpConnector.getData(url, {params: locations}).then(
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


    this.getMatchingIdList = function(id) {

      var defer = $q.defer();
      var url = ApiEndpoint.url +'/matches/'+ id + '/list';

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

    this.getMatching = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/matches/' + idx;

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

    this.setMatching = function(Matching) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/matches';

      httpConnector.post(url, Matching).then(
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

    this.putMatching = function(MatchingSelect) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/matches';

      httpConnector.put(url, MatchingSelect).then(
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

    this.deleteMatching = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/matches/' + idx;

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
