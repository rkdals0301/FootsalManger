angular.module('app.main.matching.detail.controller', ['app.matching.manager', 'app.popup.util','app.loading.util'])

  .controller('Matching-detailController', function($scope, matchingManager, $localstorage, popupUtil, loadingUtil,$timeout){

    $scope.$on('modal.shown', function(){
      $scope.refreashBtn();
      $timeout(function () {
        $scope.buttonBar = true;
      }, 200, true );
    });

    $scope.buttonBar = false;
    $scope.registerName = "신청";
    $scope.cancelShow = false;
    $scope.registerShow = false;
    $scope.stateName = "매칭 중";
    $scope.stateShow = false;
    $scope.localStorage = {};
    $scope.localStorage.id = $localstorage.get("id");
    $scope.chkShowLoading = false;

    $scope.getMatchingData = function (){
      if($scope.showLoading == true){
      } else if ($scope.showLoading == false){
        loadingUtil.showLoading($scope.chkShowLoading);
      }
      matchingManager.getMatchingSelect($scope.matchingSelect.idx).then(
        function(data) {
          $scope.matchingSelect = data;
          $scope.refreashBtn();
          loadingUtil.hideLoading($scope.chkShowLoading);
        },
        function(error) {
          console.log(error);
        }
      );
    };

   $scope.putMatchingData  = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      matchingManager.putMatching($scope.matchingSelect).then(
        function (data) {
          $scope.getMatchingData();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.deleteMatchingData = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      matchingManager.deleteMatching($scope.matchingSelect.idx).then(
        function (data) {
          loadingUtil.hideLoading($scope.chkShowLoading);
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.refreashBtn = function() {
      if($scope.matchingSelect.regid ==  $localstorage.get("id")){
        if($scope.matchingSelect.opp_YN != 1){ //매칭대기
          //신청 x 취소 x
          $scope.stateName = "매칭 대기 중";
          $scope.stateShow = true;
          $scope.registerShow = false;
          $scope.cancelShow = false;
        } else if ($scope.matchingSelect.opp_YN == 1){ //매칭중
          //수락O 취소 O
            if ($scope.matchingSelect.reg_YN == 1){ //매칭완료
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
      else if ($scope.matchingSelect.regid != $localstorage.get("id")){ // 등록한게시글 아이디와  내아이디가 같지않을때,
        if($scope.matchingSelect.opp_YN != 1){
          console.log($scope.matchingSelect);
          //신청 ㅇ
          $scope.registerName = "신청";
          $scope.registerShow = true;
          $scope.cancelShow = false;
          $scope.stateShow = false;
        }
        else if($scope.matchingSelect.opp_YN == 1){
          if($scope.matchingSelect.oppid == $localstorage.get("id")){
            //취소 ㅇ
            $scope.registerShow = false;
            $scope.cancelShow = true;
            $scope.stateShow = false;
          }
          else {
            if($scope.matchingSelect.reg_YN == 1){
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
      if($scope.matchingSelect.regid ==  $localstorage.get("id")){
          $scope.matchingSelect.reg_YN = 1;
      }
      else if ($scope.matchingSelect.regid != $localstorage.get("id")){
          $scope.matchingSelect.oppid = $localstorage.get("id");
          $scope.matchingSelect.opp_YN = 1;
        $scope.registerShow = false;
        $scope.cancelShow = false;
        $scope.stateShow = false;
      }
      $scope.putMatchingData();
    };

    $scope.negativeBtn = function (){

      $scope.matchingSelect.oppteam= null;
      $scope.matchingSelect.oppid = null;
      $scope.matchingSelect.opp_YN = 0;
      $scope.matchingSelect.reg_YN = 0;
      $scope.matchingSelect.oppphone = null;
      $scope.matchingSelect.oppemblem = null;
      $scope.registerShow = false;
      $scope.cancelShow = false;
      $scope.stateShow = false;

      $scope.putMatchingData();
    };

    $scope.showDeletePopup = function () {
      popupUtil.showDeletePopup($scope, "matching");
    };

  });
