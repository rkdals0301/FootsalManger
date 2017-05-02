angular.module('app.main.recruitment.controller', ['app.recruitment.manager','app.modal.util','app.popup.util','app.loading.util',
            'app.location.manager', 'app.location.controller','app.main.recruitment.create.controller','app.main.recruitment.detail.controller'])

  .config(function($stateProvider){
    $stateProvider
      .state('main.recruitment',{
        url : '/recruitment',
        views: {
          'content': {
            templateUrl: 'templates/recruitment.html',
            controller: 'RecruitmentController'
          }
        }
      });
  })

  .controller('RecruitmentController', function($scope, recruitmentManager, modalUtil, popupUtil, loadingUtil){
    // 0 : city, 1 : gu
    $scope.locatonChk = 0;
    $scope.location = {city : '전체', gu : '전체'};


    function Init() {
      $scope.getRecruitmentListData();
    };

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('recruitment.js beforeEnter');
      Init();
    });
    $scope.$on('$ionicView.enter', function() { //initialize
      console.log('recruitment.js enter');
    });

    $scope.$on('$ionicView.leave', function(){
      $scope.location = {city : '전체', gu : '전체'};
      console.log('recruitment.js leave');
    });

    $scope.getRecruitmentListData = function (){
      loadingUtil.showLoading();
      recruitmentManager.getRecruitmentList($scope.location).then(
        function(data) {
          $scope.recruitmentList = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();

          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          loadingUtil.hideLoading();
          console.log(error);
        }
      );
    };

    $scope.showDetail = function(animation, idx){
      $scope.idx = idx;
      modalUtil.showModal(animation, 'recruitment-detail.html', $scope);
    };

    $scope.showCreate = function(animation){
      modalUtil.showModal(animation, 'recruitment-create.html', $scope);
    };

    $scope.showCity = function(animation, chkClick){
      $scope.locatonChk = chkClick;
      modalUtil.showModal(animation, 'location.html', $scope);
    };

    $scope.$on('modal.removed', function() {
      console.log('remove');
      $scope.getRecruitmentListData();
    });

    $scope.doRefresh = function() {
      $scope.getRecruitmentListData();
    };
  });

