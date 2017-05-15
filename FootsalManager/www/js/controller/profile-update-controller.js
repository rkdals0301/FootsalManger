angular.module('app.main.profile.update.controller', [])

  .controller('Profile-UpdateController', function($scope, profileManager){

    $scope.putProfile = function () {
      profileManager.putProfile($scope.profile).then(
        function (data) {
          $scope.modal.remove();
        },
        function (error) {
          console.log(error);
        });
    };


  });