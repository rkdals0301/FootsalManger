angular.module('app.main.recruitment.controller', ['app.location.controller','app.main.recruitment.create.controller'
    ,'app.main.recruitment.detail.controller'
    ,'app.modal.util'
    ,'app.recruitment.manager' ])

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

  .controller('RecruitmentController', function($scope, recruitmentManager, modalUtil, popupUtil, loadingUtil, $timeout){
    // 0 : city, 1 : gu
    $scope.locatonChk = 0;
    $scope.location = {city : '전체', gu : '전체'};
    $scope.recruitment = {};

    //Init()
    function Init() {
      $scope.getRecruitmentLocationList();
    };

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('recruitment.js beforeEnter');
      Init();
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('recruitment.js beforeLeave');
      $scope.location = {city : '전체', gu : '전체'};
    });

    $scope.getRecruitmentLocationList = function (){
      loadingUtil.showLoading();
      recruitmentManager.getRecruitmentLocationList($scope.location).then(
        function(data) {
          $scope.recruitmentList = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getRecruitment = function (animation,idx) {
      loadingUtil.showLoading();
      recruitmentManager.getRecruitment(idx).then(
        function (data) {
          $scope.recruitment = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          $timeout(function () {
            modalUtil.showModal(animation, 'recruitment-detail.html', $scope);
          }, 200, true );
          loadingUtil.hideLoading();
        },
        function (error) {
          console.log(error);
        }
      );
    };

    $scope.showDetail = function(animation, idx){
      $scope.getRecruitment  (animation, idx);
    };

    $scope.showCreate = function(animation){
      modalUtil.showModal(animation, 'recruitment-create.html', $scope);
    };

    $scope.showCity = function(animation, chkClick){
      $scope.locatonChk = chkClick;
      modalUtil.showModal(animation, 'location.html', $scope);
    };

    $scope.$on('modal.removed', function() {
      $scope.getRecruitmentLocationList();
    });

    $scope.doRefresh = function() {
      $scope.getRecruitmentLocationList();
    };
  });

