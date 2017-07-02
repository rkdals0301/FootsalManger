angular.module('app.main.profile.update.controller', [])

  .controller('Profile-UpdateController', function($scope, profileManager){

    $scope.putProfile = function () {
      profileManager.putProfile($scope.profile).then(
        function (data) {
          $scope.modalA.remove();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.$watch("profile.p_name", function(newValue, oldValue){
      if (newValue.length > 5){
        $scope.profile.p_name = oldValue;
      }
    });
    $scope.$watch("profile.nickname", function(newValue, oldValue){
      if (newValue.length > 10){
        $scope.profile.nickname = oldValue;
      }
    });
    $scope.$watch("profile.age", function(newValue, oldValue){
      if (newValue.length > 2){
        $scope.profile.age = oldValue;
      }
    });
    $scope.$watch("profile.live_location", function(newValue, oldValue){
      if (newValue.length > 20){
        $scope.profile.live_location = oldValue;
      }
    });
    $scope.$watch("profile.phone", function(newValue, oldValue){
      if (newValue.length > 11){
        $scope.profile.phone = oldValue;
      }
    });
    $scope.$watch("profile.height", function(newValue, oldValue){
      if (newValue.length > 3){
        $scope.profile.height = oldValue;
      }
    });
    $scope.$watch("profile.weight", function(newValue, oldValue){
      if (newValue.length > 3){
        $scope.profile.weight = oldValue;
      }
    });

  });
