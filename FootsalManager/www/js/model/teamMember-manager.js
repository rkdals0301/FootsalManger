angular.module('app.team.member.manager', ['app.http.connector'])

  .service('teamMemberManager', function($q, httpConnector, ApiEndpoint) {


    this.getTeamMemberTeamNameList = function(id) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams/member/' + id;

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


  });
