angular.module('app.reservation.manager', ['app.http.connector'])

  .service('reservationManager', function($q, httpConnector, ApiEndpoint) {

    this.getReservationList = function(location) {
      var locations = {
        'city' : location.city,
        'gu' : location.gu
      };

      var defer = $q.defer();
      var url = ApiEndpoint.url + '/reservations';

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

    this.getReservation = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/reservations/' + idx;

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

    this.setReservation = function(reservation) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/reservations';

      httpConnector.post(url, reservation).then(
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

    this.putReservation = function(reservation) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/reservations';

      httpConnector.put(url, reservation).then(
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

    this.deleteReservation = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/reservations/' + idx;

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
