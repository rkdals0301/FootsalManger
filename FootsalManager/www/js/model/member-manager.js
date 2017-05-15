angular.module('app.member.manager', ['app.http.connector'])

  .service('memberManager', function($q, httpConnector, ApiEndpoint) {

    this.getMemberList = function () {

      var defer = $q.defer();
      var url = ApiEndpoint.url + '/members';

      httpConnector.getData(url).then(
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

    this.getMember = function (id) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/members/' + id;

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

    this.setMember = function (register) {
      var sendRegister = JSON.stringify (register);

      var defer = $q.defer();
      var url = ApiEndpoint.url + '/members';

      httpConnector.post(url, sendRegister).then(
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

    this.putMember = function (member) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/members';

      httpConnector.put(url, member).then(
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

    this.deleteMember = function (id) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/members/' + id;

      httpConnector.delete(url).then(
        function (data) {
          defer.resolve(data.data); // personList
        },
        function (error) {
          console.log(error);
          defer.reject(data.data);
        }
      );
      return defer.promise;
    };

    this.checkLoginMember = function (member) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/members/login';

      httpConnector.post(url, member).then(
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

    this.UpdateTokenMember = function (member) {
      var defer = $q.defer();
      var url = ApiEndpoint.url + '/members/token';

      httpConnector.put(url, member).then(
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
