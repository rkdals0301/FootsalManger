angular.module('app.main.team.search.controller', ['app.location.controller', 'app.main.team.search.detail.controller'])
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



  .controller('TeamSearchController', function($scope, teamManager, toastUtil, $state, $rootScope, loadingUtil, modalUtil, $timeout){

    $scope.locatonChk = 0;
    $scope.location = {city : '전체', gu : '전체'};

    $scope.team  = {t_name : ''};

    $scope.searchWrapper = {team : null, location : null};

    $scope.sendTeam = {t_name : ''};

    $scope.isMyTeam = false;

    $scope.isMyDuty = -1;
    $scope.isMyIdx = -1;

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

    $scope.$watch("team.t_name", function(newValue, oldValue){
      if (newValue.length > 5){
        $scope.team.t_name = oldValue;
      }
    });

    $scope.$on('modal.removed', function() {
      $scope.getTeamList();
    });

    $scope.showDetail = function(animation, t_name){
      $scope.getTeam(animation, t_name);
    };

    $scope.getTeam = function (animation, t_name) {
      if($scope.showLoading == true){
      } else if ($scope.showLoading == false){
        loadingUtil.showLoading($scope.chkShowLoading);
      }
      teamManager.getTeam(t_name).then(
        function (data) {
          $scope.sendTeam.t_name = t_name;
          $scope.Team = data.team;
          $scope.TeamMemberList = data.teamMemberList;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          for(var i = 0 ; i < data.teamMemberList.length ; i++){
            if((data.teamMemberList[i].id) == ($rootScope.localStorage.id)){
              $scope.isMyTeam = true;
              $scope.isMyDuty = data.teamMemberList[i].duty;
              $scope.isMyIdx = data.teamMemberList[i].idx;
              break;
            } else {
              $scope.isMyTeam = false;
              $scope.isMyDuty = -1;
            }
          };
          $timeout(function () {
            modalUtil.init(animation,'team-detail.html', $scope).then(function(modal) {
              modal.show();
              $scope.modalB = modal;
            });
          }, 200, true );
          loadingUtil.hideLoading($scope.chkShowLoading);
          $scope.$broadcast('scroll.refreshComplete');
        },
        function (error) {
          console.log(error);
        });
    };


  });
