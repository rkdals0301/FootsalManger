angular.module('app.location.controller', ['app.location.manager','app.loading.util'])


  .controller('LocationController', function($scope, locationManager, loadingUtil){
    $scope.choiceLocation = {city : null, gu : null};

    function init(){
      // 0 : city, 1 : gu
      if($scope.locatonChk == 0){
        $scope.getLocationListData();
      } else if ($scope.locatonChk == 1) {
        $scope.getLocationData($scope.location.city);
      }
    };

    $scope.getLocationListData = function() {
      loadingUtil.showLoading();
      locationManager.getLocationList().then(
        function(data) {
          $scope.LocationList  = data;
          loadingUtil.hideLoading();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getLocationData = function(city) {
      loadingUtil.showLoading();
      locationManager.getLocation(city).then(
        function(data) {
          $scope.LocationList  = data;
          loadingUtil.hideLoading();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    init();


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

