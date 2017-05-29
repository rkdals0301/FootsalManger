angular.module('app.community.manager', ['app.http.connector'])

  .service('communityManager', function($q, httpConnector, ApiEndpoint) {

    this.getCommunityList = function(c_category) {
      var param_c_category = {
        'c_category' : c_category
      };
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/communitys';

      httpConnector.getData(url, {params: param_c_category}).then(
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


    this.getCommunity = function(c_no) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/communitys/' + c_no;

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

    this.getCommunityreplyCount = function(c_no) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/communitys/' + c_no + '/replycount';

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

    this.setCommunity = function(Community) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/communitys';

      httpConnector.post(url, Community).then(
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


    this.deleteCommunity = function(c_no) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/communitys/' + c_no;

      httpConnector.delete(url).then(
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
