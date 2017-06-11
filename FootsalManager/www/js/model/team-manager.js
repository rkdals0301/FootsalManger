angular.module('app.team.manager', ['app.http.connector'])

  .service('teamManager', function($q, httpConnector, ApiEndpoint) {

    this.getTeamList = function(searchWrapper) {

      var sendSearchWrapper = JSON.stringify (searchWrapper);

      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams/list';

      httpConnector.post(url, sendSearchWrapper).then(
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

    this.getTeam = function(t_name) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams/' + t_name;

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

    this.setTeam = function(teamWrapper) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams';

      httpConnector.post(url, teamWrapper).then(
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

    this.putTeam = function(reservation) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams';

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

    this.deleteTeam = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams/' + idx;

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
