angular.module('app.main.matching.create.controller', ['app.matching.manager'])

  .controller('Matching-createController', function($scope, matchingManager){

    $scope.Matching = {};
    $scope.Matching.regid = "dlrkdalsdl";    //$localstorage.get('id')
    $scope.Matching.reghopeTime = "2017.4.17";    //$localstorage.get('id')
    $scope.Matching.reglive_location = "대구 동구";    //$localstorage.get('id')
    $scope.Matching.regcontent = "안녕";
    $scope.Matching.regcity = "부산광역시";
    $scope.Matching.reggu = "중구";
    $scope.Matching.regteamnum = 6;

    $scope.setData = function () {
      matchingManager.setMatching($scope.Matching).then(
        function (data) {
          $scope.modal.remove();
        },
        function (error) {
          console.log(error);
        });
    };
  });
