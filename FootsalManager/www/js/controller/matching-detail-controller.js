angular.module('app.main.matching.detail.controller', ['app.team.member.manager'])

  .controller('Matching-DetailController', function($scope, $rootScope, matchingManager, popupUtil, loadingUtil, $timeout, teamMemberManager){

    $scope.team = {t_name : ''};
    $scope.buttonBar = false;
    $scope.registerName = "신청";
    $scope.registerShow = false;
    $scope.cancelShow = false;
    $scope.stateName = "매칭 중";
    $scope.stateShow = false;
    $scope.chkShowLoading = false;

    $scope.$on('modal.shown', function(){
      $scope.refreshBtn();
      $timeout(function () { // 0.2sec later buttonBar show
        $scope.buttonBar = true;
      }, 200, true );
      if($scope.matching.opp_YN == 0){
        $scope.getTeamMemberTeamNameList();
      }
    });

    $scope.getMatching = function (){
      if($scope.showLoading == true){
      } else if ($scope.showLoading == false){
        loadingUtil.showLoading($scope.chkShowLoading);
      }
      $scope.buttonBar = false;
      matchingManager.getMatching($scope.matching.idx).then(
        function(data) {
          $scope.matching = data;
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

   $scope.putMatching  = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      matchingManager.putMatching($scope.matching).then(
        function (data) {
          $scope.getMatching();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.deleteMatching = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      matchingManager.deleteMatching($scope.matching.idx).then(
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
        if($scope.matching.opp_YN != 1){
          $scope.stateName = "매칭 대기 중";
          $scope.stateShow = true;
          $scope.registerShow = false;
          $scope.cancelShow = false;
        } else {
          if($scope.matching.reg_YN == 1){
            $scope.stateName = "매칭 완료";
            $scope.stateShow = true;
            $scope.registerShow = false;
            $scope.cancelShow = false;
          } else {
            $scope.stateName = "매칭 중";
            $scope.stateShow = true;
            $scope.registerShow = false;
            $scope.cancelShow = false;
          }
        }
      }
      else if($scope.matching.regid ==  $rootScope.localStorage.id){
        if($scope.matching.opp_YN != 1){ //매칭대기
          //신청 x 취소 x
          $scope.stateName = "매칭 대기 중";
          $scope.stateShow = true;
          $scope.registerShow = false;
          $scope.cancelShow = false;
        } else if ($scope.matching.opp_YN == 1){ //매칭중
          //수락O 취소 O
            if ($scope.matching.reg_YN == 1){ //매칭완료
              //취소 O
              $scope.registerShow = false;
              $scope.cancelShow = true;
              $scope.stateShow = false;
            } else { //매칭 중
              //수락 O 취소 O
              $scope.registerName = "수락";
              $scope.cancelShow = true;
              $scope.registerShow = true;
              $scope.stateShow = false;
            }
        }
      }
      else if ($scope.matching.regid != $rootScope.localStorage.id){ // 등록한게시글 아이디와  내아이디가 같지않을때,
        if($scope.matching.opp_YN != 1){
          //신청 ㅇ
          $scope.registerName = "신청";
          $scope.registerShow = true;
          $scope.cancelShow = false;
          $scope.stateShow = false;
        }
        else if($scope.matching.opp_YN == 1){
          if($scope.matching.oppid == $rootScope.localStorage.id){
            //취소 ㅇ
            $scope.registerShow = false;
            $scope.cancelShow = true;
            $scope.stateShow = false;
          }
          else {
            if($scope.matching.reg_YN == 1){
              $scope.stateName = "매칭 완료";
            } else{
              $scope.stateName = "매칭 중";
            }
            $scope.cancelShow = false;
            $scope.registerShow = false;
            $scope.stateShow = true;
          }
        }
      }
    };

    $scope.PositiveBtn = function() {
      if($scope.matching.regid ==  $rootScope.localStorage.id){
          $scope.matching.reg_YN = 1;
      } else if ($scope.matching.regid != $rootScope.localStorage.id){
          $scope.matching.oppid = $rootScope.localStorage.id;
          $scope.matching.oppt_name = $scope.team.t_name;
          $scope.matching.opp_YN = 1;
          $scope.registerShow = false;
          $scope.cancelShow = false;
          $scope.stateShow = false;
      }

      $scope.putMatching();
    };

    $scope.negativeBtn = function (){
      $scope.matching.oppt_name= null;
      $scope.matching.oppid = null;
      $scope.matching.opp_YN = 0;
      $scope.matching.reg_YN = 0;
      $scope.matching.oppphone = null;
      $scope.matching.oppt_picture = null;
      $scope.registerShow = false;
      $scope.cancelShow = false;
      $scope.stateShow = false;
      $scope.getTeamMemberTeamNameList();

      $scope.putMatching();
    };

    $scope.showDeletePopup = function () {
      popupUtil.showDeletePopup($scope, "matching");
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
