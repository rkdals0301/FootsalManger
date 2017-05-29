angular.module('app.community.reply.manager', ['app.http.connector'])

  .service('communityReplyManager', function($q, httpConnector, ApiEndpoint) {

    this.getCommunityReplyList = function(c_no) {
      var param_c_no = {
        'c_no' : c_no
      };
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/communitys/reply';

      httpConnector.getData(url, {params: param_c_no}).then(
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

    this.setCommunityReply = function(communityReply) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/communitys/reply';

      httpConnector.post(url, communityReply).then(
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
