angular.module('app.location.controller', ['app.location.manager'])

  .controller('LocationController', function($scope, locationManager, loadingUtil){
    $scope.choiceLocation = {city : null, gu : null};

    $scope.$on('modal.shown', function(){
      // 0 : city, 1 : gu
      if($scope.locatonChk == 0){
        $scope.getLocationCityListData();
      } else if ($scope.locatonChk == 1) {
        $scope.getLocationGuListData($scope.location.city);
      }
    });

    $scope.getLocationCityListData = function() {
      loadingUtil.showLoading();
      locationManager.getLocationCityList().then(
        function(data) {
          $scope.LocationList  = data;
          loadingUtil.hideLoading();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getLocationGuListData = function(city) {
      loadingUtil.showLoading();
      locationManager.getLocationGuList(city).then(
        function(data) {
          $scope.LocationList  = data;
          loadingUtil.hideLoading();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.ChoiceCity = function () {
      if($scope.locatonChk == 0){
        $scope.location.city = $scope.choiceLocation.city;
        $scope.location.gu = '전체';
      } else if ($scope.locatonChk == 1){
        $scope.location.gu = $scope.choiceLocation.gu;
      }
      $scope.modal.remove();
    };

  });

