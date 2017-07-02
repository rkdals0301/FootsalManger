angular.module('app.main.team.search.detail.controller', [])

  .controller('Team-DetailController', function($scope, modalUtil, $timeout, loadingUtil, teamManager, teamMemberManager, $rootScope){

    $scope.buttonBar = false;
    $scope.registerName = "가입 신청";
    $scope.registerShow = false;
    $scope.cancelShow = false;
    $scope.stateName = "가입 신청";
    $scope.stateShow = false;
    $scope.chkShowLoading = false;
    $scope.teamMember = {t_name : $scope.sendTeam.t_name , id : $rootScope.localStorage.id , duty : 0};


    $scope.ShowImageDetail = function(animation) {
      $scope.updateImg = '?_ts=' + new Date().getTime();
      $scope.imageUrl = $scope.Team.t_picture + $scope.updateImg;
      modalUtil.init(animation,'img-detail.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };

    $scope.$on('modal.shown', function(){
      $scope.refreshBtn();
      $timeout(function () { // 0.2sec later buttonBar show
        $scope.buttonBar = true;
      }, 200, true );
    });

    $scope.getTeam = function () {
      if($scope.showLoading == true){
      } else if ($scope.showLoading == false){
        loadingUtil.showLoading($scope.chkShowLoading);
      }
      $scope.buttonBar = false;
      teamManager.getTeam($scope.sendTeam.t_name).then(
        function (data) {
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
          $scope.refreshBtn();
          loadingUtil.hideLoading($scope.chkShowLoading);
          $scope.$broadcast('scroll.refreshComplete');
          $timeout(function () { // 0.2sec later buttonBar show
            $scope.buttonBar = true;
          }, 200, true );
        },
        function (error) {
          console.log(error);
        });
    };


    $scope.refreshBtn = function() {
      if($rootScope.localStorage.id == 'null'){
        if($scope.isMyTeam == false){
          $scope.stateShow = true;
          $scope.registerShow = false;
          $scope.cancelShow = false;
        }
      }
      else if ($rootScope.localStorage.id != 'null') {
        if($scope.isMyTeam == false) {
          $scope.stateShow = false;
          $scope.registerShow = true;
          $scope.cancelShow = false;
        } else if ($scope.isMyTeam == true && $scope.isMyDuty == 0){
          $scope.cancelShow = true;
          $scope.stateShow = false;
          $scope.registerShow = false;
        }
      }
    };


    $scope.setTeamMember = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      teamMemberManager.setTeamMember($scope.teamMember).then(
        function (data) {
          $scope.getTeam();
        },
        function (error) {
          console.log(error);
        });
    };



    $scope.PositiveBtn = function() {
      $scope.setTeamMember();
    };

    $scope.negativeBtn = function (){
      $scope.deleteTeamMember($scope.isMyIdx);
    };


    $scope.deleteTeamMember = function (myTeamMemberIdx) {
      loadingUtil.showLoading($scope.chkShowLoading);
      teamMemberManager.deleteTeamMember(myTeamMemberIdx).then(
        function (data) {
          $scope.getTeam();
        },
        function (error) {
          console.log(error);
        });
    };

  });
