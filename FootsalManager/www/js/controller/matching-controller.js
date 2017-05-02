  angular.module('app.main.matching.controller', ['app.main.matching.create.controller','app.main.matching.detail.controller',
    'app.matching.manager','app.location.controller', 'app.modal.util','app.popup.util','app.loading.util']) //'app.main.matching.detail.controller'

  .config(function($stateProvider){
    $stateProvider
      .state('main.matching',{
        url : '/matching',
        views: {
          'content': {
            templateUrl: 'templates/matching.html',
            controller: 'MatchingController'
          }
        }
      });
  })

  .controller('MatchingController', function($scope, matchingManager, modalUtil, popupUtil, loadingUtil){
    // 0 : city, 1 : gu
    $scope.locatonChk = 0;
    $scope.location = {city : '전체', gu : '전체'};
    $scope.matchingSelect = {};

    function Init(){
        $scope.getMatchingListData();
    };

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('matching.js beforeEnter');
      Init();
    });

    $scope.$on('$ionicView.leave', function(){
      console.log('matching.js leave');
      $scope.location = {city : '전체', gu : '전체'};

    });

    $scope.getMatchingListData = function (){
      loadingUtil.showLoading();
      matchingManager.getMatchingList($scope.location).then(
        function(data) {
          $scope.matchingList = data;
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getMatchingData = function (animation, idx){
      loadingUtil.showLoading();

      matchingManager.getMatchingSelect(idx).then(
        function(data) {
          $scope.matchingSelect = data;
          modalUtil.showModal(animation, 'matching-detail.html', $scope);
          loadingUtil.hideLoading();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.showDetail = function(animation, idx){
      $scope.getMatchingData(animation, idx);
    };

    $scope.showCreate = function(animation){
      modalUtil.showModal(animation, 'matching-create.html', $scope);
    };

    $scope.showCity = function(animation, chkClick){
      $scope.locatonChk = chkClick;
      modalUtil.showModal(animation, 'location.html', $scope);
    };

    $scope.$on('modal.removed', function() {
      $scope.getMatchingListData();
    });

    $scope.doRefresh = function() {
      $scope.getMatchingListData();
    };

  });

