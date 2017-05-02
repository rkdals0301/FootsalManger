angular.module('app.main.recruitment.detail.controller', ['app.recruitment.manager', 'app.popup.util','app.loading.util'])

  .controller('Recruitment-detailController', function($scope, recruitmentManager, $localstorage, $ionicPopup, popupUtil, loadingUtil){

    $scope.registerName = "신청";
    $scope.cancelShow = false;
    $scope.registerShow = false;
    $scope.stateName = "매칭 중";
    $scope.stateShow = false;
    $scope.localStorage = {};
    $scope.localStorage.id = $localstorage.get("id");

    function Init() {
      $scope.getRecruitmentData();
    };

    $scope.getRecruitmentData = function (){
      loadingUtil.showLoading();
      recruitmentManager.getRecruitment($scope.idx).then(
        function(data) {
          $scope.recruitment = data;
          loadingUtil.hideLoading();
          $scope.refreashBtn();
        },
        function(error) {
          loadingUtil.hideLoading();
          console.log(error);
        }
      );
    };

    Init();

    $scope.putRecruitmentData  = function () {
      loadingUtil.showLoading();
      recruitmentManager.putRecruitment($scope.recruitment).then(
        function (data) {
          $scope.getRecruitmentData();
          loadingUtil.hideLoading();
        },
        function (error) {
          loadingUtil.hideLoading();
          console.log(error);
        });
    };


    $scope.deleteRecruitmentData = function () {
      loadingUtil.showLoading();
      recruitmentManager.deleteRecruitment($scope.recruitment.idx).then(
        function (data) {
          loadingUtil.hideLoading();
        },
        function (error) {
          loadingUtil.hideLoading();
          console.log(error);
        });
    };

    $scope.refreashBtn = function() {
      if($scope.recruitment.regid ==  $localstorage.get("id")){
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
      else if ($scope.recruitment.regid != $localstorage.get("id")){ // 등록한게시글 아이디와  내아이디가 같지않을때,
        if($scope.recruitment.opp_YN != 1){
          //신청 ㅇ
          $scope.cancelShow = false;
          $scope.registerName = "신청";
          $scope.registerShow = true;
          $scope.stateShow = false;
        }
        else if($scope.recruitment.opp_YN == 1){
          if($scope.recruitment.oppid == $localstorage.get("id")){
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
      if($scope.recruitment.regid ==  $localstorage.get("id")){
        $scope.recruitment.reg_YN = 1;
      }
      else if ($scope.recruitment.regid != $localstorage.get("id")){
        $scope.recruitment.oppid = $localstorage.get("id");
        $scope.recruitment.opp_YN = 1;
      }
      $scope.putRecruitmentData();
    };

    $scope.negativeBtn = function (){

      $scope.recruitment.oppteam= null;
      $scope.recruitment.oppid = null;
      $scope.recruitment.opp_YN = 0;
      $scope.recruitment.oppphone = null;
      $scope.recruitment.oppemblem = null;

      $scope.putRecruitmentData();
    };

    $scope.showDeletePopup = function () {
      popupUtil.showDeletePopup($scope, "recruitment");
    }
  });
