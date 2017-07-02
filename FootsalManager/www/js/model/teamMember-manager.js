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

    this.setTeamMember = function(teamMember) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams/member';

      httpConnector.post(url, teamMember).then(
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


    this.putTeamMemberPosition = function(teamMember) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams/member/position';

      httpConnector.put(url, teamMember).then(
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

    this.putTeamMemberDuty = function(teamMemberDuty) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams/member/duty';

      httpConnector.put(url, teamMemberDuty).then(
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

    this.putTeamMemberDutyList = function(teamMemberDutyList) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams/member/duty/list';

      httpConnector.put(url, teamMemberDutyList).then(
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

    this.deleteTeamMember = function(idx) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/teams/member/' + idx;

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
