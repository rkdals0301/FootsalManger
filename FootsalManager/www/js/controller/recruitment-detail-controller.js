angular.module('app.main.recruitment.detail.controller', ['app.team.member.manager'])

  .controller('Recruitment-DetailController', function($scope, recruitmentManager, $rootScope, popupUtil, loadingUtil, $timeout, teamMemberManager){

    $scope.team = {t_name : ''};
    $scope.buttonBar = false;
    $scope.registerName = "신청";
    $scope.registerShow = false;
    $scope.cancelShow = false;
    $scope.stateName = "용병 모집 중";
    $scope.stateShow = false;
    $scope.chkShowLoading = false;

    $scope.$on('modal.shown', function(){
      $scope.refreshBtn();
      $timeout(function () { // 0.2sec later buttonBar show
        $scope.buttonBar = true;
      }, 200, true );
      if($scope.recruitment.opp_YN == 0){
        $scope.getTeamMemberTeamNameList();
      }
    });

    $scope.getRecruitment = function (){
      if($scope.showLoading == true){
      } else if ($scope.showLoading == false){
        loadingUtil.showLoading($scope.chkShowLoading);
      }
      $scope.buttonBar = false;
      recruitmentManager.getRecruitment($scope.recruitment.idx).then(
        function(data) {
          $scope.recruitment = data;
          $scope.refreshBtn();
          loadingUtil.hideLoading($scope.chkShowLoading);
          $timeout(function () { // 0.2sec later buttonBar show
            $scope.buttonBar = true;
          }, 200, true );
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.putRecruitment  = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      recruitmentManager.putRecruitment($scope.recruitment).then(
        function (data) {
          $scope.getRecruitment();
        },
        function (error) {
          console.log(error);
        });
    };


    $scope.deleteRecruitment = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      recruitmentManager.deleteRecruitment($scope.recruitment.idx).then(
        function (data) {
          loadingUtil.hideLoading($scope.chkShowLoading);
          $scope.modalA.remove();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.refreshBtn = function() {
      if($rootScope.localStorage.id == 'null'){
        if($scope.recruitment.opp_YN != 1){
          $scope.stateName = "용병 대기 중";
          $scope.stateShow = true;
          $scope.registerShow = false;
          $scope.cancelShow = false;
        } else {
          if($scope.recruitment.reg_YN == 1){
            $scope.stateName = "용병 모집 완료";
            $scope.stateShow = true;
            $scope.registerShow = false;
            $scope.cancelShow = false;
          } else {
            $scope.stateName = "용병 모집 중";
            $scope.stateShow = true;
            $scope.registerShow = false;
            $scope.cancelShow = false;
          }
        }
      }
      else if($scope.recruitment.regid ==  $rootScope.localStorage.id){
        if($scope.recruitment.opp_YN != 1){ //용병대기
          //신청 x 취소 x
          $scope.registerShow = false;
          $scope.cancelShow = false;
          $scope.stateName = "용병 대기 중";
          $scope.stateShow = true;
        } else if ($scope.recruitment.opp_YN == 1){ //용벙 모집중
          //수락O 취소 O
          if ($scope.recruitment.reg_YN == 1){ //용병 모집 완료
            //취소 O
            $scope.registerShow = false;
            $scope.cancelShow = false;
            $scope.stateName = "용병 모집 완료";
            $scope.stateShow = true;
          } else { //매칭 중
            //수락 O 취소 O
            $scope.registerName = "수락";
            $scope.cancelShow = true;
            $scope.registerShow = true;
            $scope.stateShow = false;
          }
        }
      }
      else if ($scope.recruitment.regid != $rootScope.localStorage.id){ // 등록한게시글 아이디와  내아이디가 같지않을때,
        if($scope.recruitment.opp_YN != 1){
          //신청 ㅇ
          $scope.cancelShow = false;
          $scope.registerName = "신청";
          $scope.registerShow = true;
          $scope.stateShow = false;
        }
        else if($scope.recruitment.opp_YN == 1){
          if($scope.recruitment.oppid == $rootScope.localStorage.id){
            //취소 ㅇ
            if($scope.recruitment.reg_YN == 1){
              $scope.registerShow = false;
              $scope.cancelShow = false;
              $scope.stateShow = true;
              $scope.stateName = "용병 모집 완료";
              $scope.stateShow = true;
            } else {
              $scope.registerShow = false;
              $scope.cancelShow = true;
              $scope.stateShow = false;
            }
          }
          else {
            $scope.cancelShow = false;
            $scope.registerShow = false;

            if($scope.recruitment.reg_YN == 1){
              $scope.stateName = "용병 모집 완료";
              $scope.stateShow = true;
            } else{
              $scope.stateName = "용병 모집 중";
              $scope.stateShow = true;
            }
          }
        }
      }
    };

    $scope.PositiveBtn = function() {
      if($scope.recruitment.regid ==  $rootScope.localStorage.id){
        $scope.recruitment.reg_YN = 1;
      }
      else if ($scope.recruitment.regid != $rootScope.localStorage.id){
        $scope.recruitment.oppid = $rootScope.localStorage.id;
        $scope.recruitment.oppt_name = $scope.team.t_name;
        $scope.recruitment.opp_YN = 1;
      }
      $scope.putRecruitment();
    };

    $scope.negativeBtn = function (){

      $scope.recruitment.oppid = null;
      $scope.recruitment.oppphone = null;
      $scope.recruitment.opp_YN = 0;
      $scope.recruitment.oppt_name = null;
      $scope.recruitment.oppt_picture = null;
      $scope.registerShow = false;
      $scope.cancelShow = false;
      $scope.stateShow = false;
      $scope.getTeamMemberTeamNameList();

      $scope.putRecruitment();
    };

    $scope.showDeletePopup = function () {
      popupUtil.showDeletePopup($scope, "recruitment");
    };


    $scope.getTeamMemberTeamNameList = function () {
      if($scope.showLoading == true){
      } else if ($scope.showLoading == false){
        loadingUtil.showLoading($scope.chkShowLoading);
      }
      teamMemberManager.getTeamMemberTeamNameList($rootScope.localStorage.id).then(
        function(data) {
          $scope.myTeamNameList = data;
          $scope.team.t_name = $scope.myTeamNameList[0];
          if($scope.myTeamNameList == ''){
            $scope.stateShow = true;
            $scope.stateName = "팀이 없습니다.";
            $scope.registerShow = false;
            $scope.cancelShow = false;
          }
          loadingUtil.hideLoading($scope.chkShowLoading);
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };

  });
