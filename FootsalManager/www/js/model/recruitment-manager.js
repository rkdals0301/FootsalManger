angular.module('app.recruitment.manager', ['app.http.connector'])

  .service('recruitmentManager', function($q, httpConnector, ApiEndpoint) {

    this.getRecruitmentLocationList = function(location) {
      var locations = {
        'city' : location.city,
        'gu' : location.gu
      };

      var defer = $q.defer();
      var url = ApiEndpoint.url + '/recruitments/location';

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

    this.getRecruitment = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/recruitments/' + idx;

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

    this.setRecruitment = function(recruitment) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/recruitments';

      httpConnector.post(url, recruitment).then(
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

    this.putRecruitment = function(recruitment) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/recruitments';

      httpConnector.put(url, recruitment).then(
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

    this.deleteRecruitment = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/recruitments/' + idx;

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
