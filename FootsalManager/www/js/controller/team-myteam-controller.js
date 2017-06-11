angular.module('app.main.team.myteam.controller', ['app.team.member.manager'])
  .config(function($stateProvider){
    $stateProvider
      .state('main.teammyteam',{
        url : '/team/myteam',
        views : {
          'content': {
            templateUrl: 'templates/team-myteam.html',
            controller: 'TeamMyteamController'
          }
        }
      })

  })



  .controller('TeamMyteamController', function($scope, teamManager, toastUtil, $state, $rootScope, loadingUtil, teamMemberManager){

  $scope.team  = {t_name : ''};
  $scope.isTrigger = true; // 처음 실행

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('teamMyteam.js beforeEnter');
      $scope.getTeamMemberTeamNameList();
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('teamMyteam.js beforeLeave');
    });


    $scope.getTeamMemberTeamNameList = function () {
      loadingUtil.showLoading();
      teamMemberManager.getTeamMemberTeamNameList($rootScope.localStorage.id).then(
        function(data) {
          $scope.myTeamNameList = data;
          if($scope.isTrigger){
            $scope.team.t_name = $scope.myTeamNameList[0];
            $scope.isTrigger = false;
            $scope.getTeam();
          }
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getTeam = function () {
      loadingUtil.showLoading();
      teamManager.getTeam($scope.team.t_name).then(
        function (data) {
          $scope.myTeam = data.team;
          $scope.myTeamMemberList = data.teamMemberList;
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function (error) {
          console.log(error);
        });
    };


    $scope.changeTeam = function () {
      console.log($scope.team.t_name);
      $scope.getTeam();
    }

  });
