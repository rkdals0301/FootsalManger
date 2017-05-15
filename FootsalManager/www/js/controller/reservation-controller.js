angular.module('app.main.reservation.controller', ['app.location.controller'
  ,'app.modal.util'
  ,'app.reservation.manager'])

  .config(function($stateProvider){
    $stateProvider
      .state('main.reservation',{
        url : '/reservation',
        views: {
          'content': {
            templateUrl: 'templates/reservation.html',
            controller: 'ReservationController'
          }
        }
      });
  })

  .controller('ReservationController', function($scope, reservationManager, modalUtil, popupUtil, loadingUtil){

    $scope.locatonChk = 0;
    $scope.location = {city : '전체', gu : '전체'};

    function Init() {
      $scope.getReservationListData();
    };

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('reservation.js beforeEnter');
      Init();
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('reservation.js beforeLeave');
    });

    $scope.getReservationListData = function (){
      loadingUtil.showLoading();
      reservationManager.getReservationList($scope.location).then(
        function(data) {
          $scope.reservationList = data;
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          loadingUtil.hideLoading();
          console.log(error);
        }
      );
    };

    $scope.showDetail = function(animation, idx){
      $scope.idx = idx;
      // modalUtil.showModal(animation, 'matching-detail.html', $scope);
    };

    $scope.showCity = function(animation, chkClick){
      $scope.locatonChk = chkClick;
      modalUtil.showModal(animation, 'location.html', $scope);
    };

    $scope.$on('modal.removed', function() {
      console.log('remove');
      $scope.getReservationListData();
    });

    $scope.doRefresh = function() {
      $scope.getReservationListData();
    };

  });
