angular.module('app.main.team.myteam.controller', [ 'app.main.team.myteam.update.controller', 'app.main.profile-show.controller'
  ,'app.team.member.manager','app.profile.manager'])
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



  .controller('TeamMyteamController', function($scope, teamManager, toastUtil, $state, $rootScope, loadingUtil, teamMemberManager, modalUtil, popupUtil, $cordovaCamera, profileManager, $timeout){

    $scope.teamMember  = {idx : '', t_name : '',  position: ''};
    $scope.isTrigger = true; // 처음 실행
    $scope.myDuty = -1;
    $scope.myIdx = -1;
    $scope.chkShowLoading = false;
    $scope.positionList = [
      { text: "FW", value: "FW" },
      { text: "MF", value: "MF" },
      { text: "DF", value: "DF" },
      { text: "GK", value: "GK" }
    ];

    $scope.teamMemberDuty = {idx : '', duty : ''};
    $scope.teamMemberDutyList = {"list" : [{idx : -1, duty : 1}, {idx : -1, duty : 2}]};


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
            $scope.teamMember.t_name = $scope.myTeamNameList[0];
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
      if($scope.showLoading == true){
      } else if ($scope.showLoading == false){
        loadingUtil.showLoading($scope.chkShowLoading);
      }
      teamManager.getTeam($scope.teamMember.t_name).then(
        function (data) {
          $scope.myTeam = data.team;
          $scope.myTeamMemberList = data.teamMemberList;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          for(var i = 0 ; i < data.teamMemberList.length ; i++){
            if((data.teamMemberList[i].id) == ($rootScope.localStorage.id)){
              $scope.myDuty = data.teamMemberList[i].duty;
              $scope.myIdx = data.teamMemberList[i].idx;
            }
          };
          loadingUtil.hideLoading($scope.chkShowLoading);
          $scope.$broadcast('scroll.refreshComplete');
        },
        function (error) {
          console.log(error);
        });
    };


    $scope.changeTeam = function () {
      $scope.getTeam();
    };

    $scope.showUpdate = function(animation){
      modalUtil.init(animation,'team-update.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };

    $scope.showPositionPopup = function(myTeamMemberIdx, myTeamMemberId){
      cancelPropagation(event);
      $scope.teamMember.idx = myTeamMemberIdx;
      if($scope.myDuty == 1){ //팀장일때,
        popupUtil.showPositionPopup($scope);
      } else { //팀장이 아닐때,
        if(myTeamMemberId == ($rootScope.localStorage.id)){ //클릭한 아이디와 나의 아이디가 같을때,
          popupUtil.showPositionPopup($scope); // Position 변경창을 띄운다.
        } else {

        }
      }
    };

    $scope.showDutyPopup = function(myTeamMemberIdx){
      cancelPropagation(event);
      $scope.teamMemberDutyList.list[1].idx = $scope.myIdx;
      $scope.teamMemberDutyList.list[0].idx = myTeamMemberIdx;
      if($scope.myDuty == 1){ //팀장일때,
        popupUtil.showDutyPopup($scope);
      }
    };

    $scope.putTeamMemberPosition  = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      teamMemberManager.putTeamMemberPosition($scope.teamMember).then(
        function (data) {
          $scope.getTeam();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.putTeamMemberDutyList  = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      teamMemberManager.putTeamMemberDutyList($scope.teamMemberDutyList).then(
        function (data) {
          $scope.getTeam();
        },
        function (error) {
          console.log(error);
        });
    };


    $scope.choosePhoto = function () {
      if($scope.myDuty == 1){
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 400,
          targetHeight: 400,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };


        $cordovaCamera.getPicture(options).then(function (imageData) {
          // $scope.imgURI = "data:image/jpeg;base64," + imageData;
          window.resolveLocalFileSystemURL(imageData, gotFile, fail);

          function fail(e) {
            alert('Cannot found requested file');
          }

          function gotFile(fileEntry) {
            fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                var formData = new FormData();
                var imgBlob = new Blob([this.result], {type : file.type});
                formData.append('t_name', $scope.teamMember.t_name);
                formData.append('picture', imgBlob, file.name);
                $scope.setTeamPicture(formData);
              };
              // The most important point, use the readAsDatURL Method from the file plugin
              reader.readAsArrayBuffer(file);
            });
          }

          $scope.setTeamPicture = function (formData) {
            loadingUtil.showLoading($scope.chkShowLoading);
            teamManager.setTeamPicture(formData).then(
              function(data) {
                $scope.getTeam();
              },
              function(error) {
                console.log(error);
              }
            );
          }
        });
      }
    };

    $scope.getProfile = function (animation, myTeamMemberId){
      if($scope.showLoading == true){
      } else if ($scope.showLoading == false){
        loadingUtil.showLoading($scope.chkShowLoading);
      }
      profileManager.getProfile(myTeamMemberId).then(
        function(data) {
          $scope.profile = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          $timeout(function () {
            modalUtil.init(animation,'profile-show.html', $scope).then(function(modal) {
              modal.show();
              $scope.modalB = modal;
            });
          }, 200, true );
          loadingUtil.hideLoading($scope.chkShowLoading);
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.showProfile = function (animation, myTeamMemberId) {
      $scope.getProfile(animation, myTeamMemberId);
    };


    //이벤트 전파 막기
    function cancelPropagation(event){
      if(event.stopPropagation){
        event.stopPropagation();
      }else{
        event.cancelBubble = true;
      }
    };

    $scope.putTeamMemberDuty  = function () {
      loadingUtil.showLoading($scope.chkShowLoading);
      teamMemberManager.putTeamMemberDuty($scope.teamMemberDuty).then(
        function (data) {
          $scope.getTeam();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.positiveBtn = function (myTeamMemberIdx) {
      cancelPropagation(event);
      $scope.teamMemberDuty.idx = myTeamMemberIdx;
      $scope.teamMemberDuty.duty = 2;
      $scope.putTeamMemberDuty();
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

    $scope.negativeBtn = function (myTeamMemberIdx) {
      cancelPropagation(event);
      $scope.deleteTeamMember(myTeamMemberIdx)
    };




  });
