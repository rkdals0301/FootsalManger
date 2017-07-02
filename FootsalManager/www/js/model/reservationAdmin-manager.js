angular.module('app.reservationAdmin.manager', ['app.http.connector'])

  .service('reservationAdminManager', function($q, httpConnector, ApiEndpoint) {

    this.getReservationAdminList = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/reservationadmins/' + idx;

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


    this.putReservationAdmin = function(reservationAdminList) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/reservationadmins';

      httpConnector.put(url, reservationAdminList).then(
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

  });
