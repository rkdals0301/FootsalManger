angular.module('app.main.reservation.detail.controller', [])

  .controller('Reservation-DetailController', function($scope, $rootScope, popupUtil, loadingUtil, $timeout ){

    // $scope.team = {t_name : ''};
    // $scope.buttonBar = false;
    // $scope.registerName = "신청";
    // $scope.registerShow = false;
    // $scope.cancelShow = false;
    // $scope.stateName = "용병 모집 중";
    // $scope.stateShow = false;
    // $scope.chkShowLoading = false;
    //
    // $scope.$on('modal.shown', function(){
    //   $scope.refreshBtn();
    //   $timeout(function () { // 0.2sec later buttonBar show
    //     $scope.buttonBar = true;
    //   }, 200, true );
    //   if($scope.recruitment.opp_YN == 0){
    //     $scope.getTeamMemberTeamNameList();
    //   }
    // });
    //
    // $scope.getRecruitment = function (){
    //   if($scope.showLoading == true){
    //   } else if ($scope.showLoading == false){
    //     loadingUtil.showLoading($scope.chkShowLoading);
    //   }
    //   $scope.buttonBar = false;
    //   recruitmentManager.getRecruitment($scope.recruitment.idx).then(
    //     function(data) {
    //       $scope.recruitment = data;
    //       $scope.refreshBtn();
    //       loadingUtil.hideLoading($scope.chkShowLoading);
    //       $timeout(function () { // 0.2sec later buttonBar show
    //         $scope.buttonBar = true;
    //       }, 200, true );
    //     },
    //     function(error) {
    //       console.log(error);
    //     }
    //   );
    // };
    //
    // $scope.putRecruitment  = function () {
    //   loadingUtil.showLoading($scope.chkShowLoading);
    //   recruitmentManager.putRecruitment($scope.recruitment).then(
    //     function (data) {
    //       $scope.getRecruitment();
    //     },
    //     function (error) {
    //       console.log(error);
    //     });
    // };
    //
    //
    // $scope.deleteRecruitment = function () {
    //   loadingUtil.showLoading($scope.chkShowLoading);
    //   recruitmentManager.deleteRecruitment($scope.recruitment.idx).then(
    //     function (data) {
    //       loadingUtil.hideLoading($scope.chkShowLoading);
    //       $scope.modalA.remove();
    //     },
    //     function (error) {
    //       console.log(error);
    //     });
    // };
    //
    //
    //
    // $scope.PositiveBtn = function() {
    //   if($scope.recruitment.regid ==  $rootScope.localStorage.id){
    //     $scope.recruitment.reg_YN = 1;
    //   }
    //   else if ($scope.recruitment.regid != $rootScope.localStorage.id){
    //     $scope.recruitment.oppid = $rootScope.localStorage.id;
    //     $scope.recruitment.oppt_name = $scope.team.t_name;
    //     $scope.recruitment.opp_YN = 1;
    //   }
    //   $scope.putRecruitment();
    // };
    //
    // $scope.getTeamMemberTeamNameList = function () {
    //   if($scope.showLoading == true){
    //   } else if ($scope.showLoading == false){
    //     loadingUtil.showLoading($scope.chkShowLoading);
    //   }
    //   teamMemberManager.getTeamMemberTeamNameList($rootScope.localStorage.id).then(
    //     function(data) {
    //       $scope.myTeamNameList = data;
    //       $scope.team.t_name = $scope.myTeamNameList[0];
    //       if($scope.myTeamNameList == ''){
    //         $scope.stateShow = true;
    //         $scope.stateName = "팀이 없습니다.";
    //         $scope.registerShow = false;
    //         $scope.cancelShow = false;
    //       }
    //       loadingUtil.hideLoading($scope.chkShowLoading);
    //       $scope.$broadcast('scroll.refreshComplete');
    //     },
    //     function(error) {
    //       console.log(error);
    //     }
    //   );
    // };

  });
