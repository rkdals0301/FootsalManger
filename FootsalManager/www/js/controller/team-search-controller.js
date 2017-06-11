angular.module('app.main.team.searcb.controller', ['app.location.controller'])
  .config(function($stateProvider){
    $stateProvider
      .state('main.teamsearch',{
        url : '/team/search',
        views : {
          'content': {
            templateUrl: 'templates/team-search.html',
            controller: 'TeamSearchController'
          }
        }
      })

  })



  .controller('TeamSearchController', function($scope, teamManager, toastUtil, $state, $rootScope, loadingUtil, modalUtil){

    $scope.locatonChk = 0;
    $scope.location = {city : '전체', gu : '전체'};

    $scope.team  = {t_name : ''};

    $scope.searchWrapper = {team : null, location : null};

    function Init() {
      $scope.getTeamList();
    };

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('TeamSearchController.js beforeEnter');
      Init();
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('TeamSearchController.js beforeLeave');
      $scope.team  = {t_name : ''};
    });

    $scope.showCity = function(animation, chkClick){
      $scope.locatonChk = chkClick;
      modalUtil.init(animation,'location.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };


    $scope.getTeamList = function () {
      $scope.searchWrapper.team = $scope.team;
      $scope.searchWrapper.location = $scope.location;
      loadingUtil.showLoading();
      teamManager.getTeamList($scope.searchWrapper).then(
        function(data) {
          $scope.teamList = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };

  });
