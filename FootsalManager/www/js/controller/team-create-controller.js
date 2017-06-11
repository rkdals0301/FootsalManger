angular.module('app.main.team.create.controller', [])
  .config(function($stateProvider){
    $stateProvider
      .state('main.teamcreate',{
        url : '/team/create',
        views : {
          'content': {
            templateUrl: 'templates/team-create.html',
            controller: 'TeamCreateController'
          }
        }
      })

  })



  .controller('TeamCreateController', function($scope, teamManager, toastUtil, $state, $rootScope, loadingUtil){

    $scope.team = {t_name : '',  t_city : '', t_gu : ''};
    $scope.teamMember = {t_name : '', id : $rootScope.localStorage.id, duty : 1 };
    $scope.teamWrapper = {team : null, teamMember : null};

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('teamCreate.js beforeEnter');
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('teamCreate.js beforeLeave');
    });


    $scope.SubmitTeam = function (){
      if ($scope.team.t_name == ''){
        toastUtil.showShortBottomToast('팀이름을 입력하세요.');
      } else {
        $scope.getTeam();
      }
    };

    $scope.getTeam = function () {

      loadingUtil.showLoading();
      teamManager.getTeam($scope.team.t_name).then(
        function (data) {
          $scope.existteam = data;
          if($scope.existteam.team == null){
            $scope.setTeam();
          } else {
            toastUtil.showShortBottomToast('존재하는 팀 입니다.');
            loadingUtil.hideLoading();
          }
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.setTeam = function () {
      $scope.teamMember.t_name = $scope.team.t_name;
      $scope.teamWrapper.team = $scope.team;
      $scope.teamWrapper.teamMember = $scope.teamMember;
      teamManager.setTeam($scope.teamWrapper).then(
        function (data) {
          toastUtil.showShortBottomToast('팀생성 되었습니다.');
          loadingUtil.hideLoading();
          $state.go('main.team');
        },
        function (error) {
          console.log(error);
        });
    };

  });
