angular.module('app.profile.manager', ['app.http.connector'])

  .service('profileManager', function($q, httpConnector, ApiEndpoint) {

    this.getProfile = function (id) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/profiles/' + id;

      httpConnector.get(url).then(
        function (data) {
          defer.resolve(data.data);
        },
        function (error) {
          console.log(error);
          defer.reject(data.data);
        }
      );
      return defer.promise;
    };

    this.setProfilePicture = function(picture) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/profiles/picture';

      httpConnector.postImage(url, picture).then(
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

    this.putProfile = function (profile) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/profiles';

      httpConnector.put(url, profile).then(
        function (data) {
          defer.resolve(data.data);
        },
        function (error) {
          console.log(error);
          defer.reject(data.data);
        }
      );
      return defer.promise;
    };


  });
