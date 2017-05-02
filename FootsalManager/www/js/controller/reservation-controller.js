angular.module('app.main.reservation.controller', ['app.reservation.manager','app.location.controller'])

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

  .controller('ReservationController', function($scope, reservationManager, modalUtil, popupUtil, loadingUtil, $cordovaDatePicker){

    $scope.locatonChk = 0;
    $scope.location = {city : '전체', gu : '전체'};

    $scope.$on('$ionicView.loaded', function() { //initialize
      console.log('reservation.js loaded');
    });
    //
    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('reservation.js beforeEnter');
      Init();
    });
    $scope.$on('$ionicView.enter', function() { //initialize
      console.log('reservation.js enter');
    });
    // $scope.$on('$ionicView.afterEnter', function(){ //initialize
    //   console.log('reservation.js afterEnter');
    // });
    //
    // $scope.$on('$ionicView.beforeLeave', function(){
    //   console.log('reservation.js beforeLeave');
    // });
    $scope.$on('$ionicView.leave', function(){
      console.log('reservation.js leave');
    });
    // $scope.$on('$ionicView.afterLeave', function(){
    //   console.log('reservation.js afterLeave');
    // });
    //
    $scope.$on('$ionicView.unloaded', function(){
      console.log('reservation.js unloaded');
    });

    function Init() {
      $scope.getReservationListData();
    };

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


    var options = {
      date: new Date(),
      mode: 'date', // or 'time'
      minDate: new Date(),
      allowOldDates: true,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };

    document.addEventListener("deviceready", function () {

      $cordovaDatePicker.show(options).then(function(date){
        alert(date);
      });

    }, false);
  });
