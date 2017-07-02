angular.module('app.main.reservation.controller', ['app.location.controller','app.main.reservation.detail.controller'
  ,'app.reservation.manager', 'app.reservationAdmin.manager'])

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

  .controller('ReservationController', function($scope, reservationManager, modalUtil, popupUtil, loadingUtil, $timeout, reservationAdminManager){

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
          $scope.updateImg = '?_ts=' + new Date().getTime();
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getReservation = function (animation,idx) {
      reservationManager.getReservation(idx).then(
        function (data) {
          $scope.reservation = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          $timeout(function () {
            modalUtil.init(animation,'reservation-detail.html', $scope).then(function(modal) {
              modal.show();
              $scope.modalA = modal;
            });
          }, 200, true );
          loadingUtil.hideLoading();
        },
        function (error) {
          console.log(error);
        }
      );
    };

    $scope.getReservationAdminList = function (animation, idx) {
      loadingUtil.showLoading();
      reservationAdminManager.getReservationAdminList(idx).then(
        function (data) {
          $scope.reservationAdminList = data;
          $scope.getReservation(animation, idx);
        },
        function (error) {
          console.log(error);
        }
      );
    };


    $scope.showDetail = function(animation, idx){
      $scope.getReservationAdminList(animation, idx);
    };

    $scope.showCity = function(animation, chkClick){
      $scope.locatonChk = chkClick;
      modalUtil.init(animation,'location.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };

    $scope.$on('modal.removed', function() {
      console.log('remove');
      $scope.getReservationListData();
    });

    $scope.doRefresh = function() {
      $scope.getReservationListData();
    };

  });
