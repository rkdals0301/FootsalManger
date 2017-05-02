angular.module('app.main.controller', ['app.main.home.controller','app.main.matching.controller', 'app.main.reservation.controller', 'app.main.team.controller'
              , 'app.main.community.controller','app.main.recruitment.controller','app.login.controller','app.register.controller','app.login.manager','app.popup.util'
              ,'app.main.profile.controller','app.profile.manager'])

  .config(function($stateProvider){
    $stateProvider
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl : 'templates/main.html',
        controller: "MainController"
      });
  })

  .controller('MainController', function($scope, $localstorage, popupUtil, $state, $ionicSideMenuDelegate, profileManager, $cordovaCamera){
    // $scope.$on('$ionicView.loaded', function() { //initialize
    //   console.log('main.js loaded');
    // });
    //
    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('main.js beforeEnter');
      $scope.setStorage();
      $scope.getProfileData();
    });
    $scope.$on('$ionicView.enter', function() { //initialize
      console.log('main.js enter');
    });
    // $scope.$on('$ionicView.afterEnter', function(){ //initialize
    //   console.log('main.js afterEnter');
    // });
    //
    // $scope.$on('$ionicView.beforeLeave', function(){
    //   console.log('main.js beforeLeave');
    // });
    $scope.$on('$ionicView.leave', function(){
      console.log('main.js leave');
    });
    // $scope.$on('$ionicView.afterLeave', function(){
    //   console.log('main.js afterLeave');
    // });

    // $scope.$on('$ionicView.unloaded', function(){
    //   console.log('main.js unloaded');
    // });

    $scope.getProfileData = function (){
      profileManager.getProfile($localstorage.get("id")).then(
        function(data) {
          $scope.profileSelect = data;
          $scope.profileSelect.picture = $scope.profileSelect.picture + '?_ts=' + new Date().getTime();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.$watch(function () {
        return $ionicSideMenuDelegate.isOpenLeft();
      },
      function (isOpen) {
        if (isOpen){
          if($localstorage.get("id") != null){
            $scope.getProfileData();
          }
        } else{
          console.log("close");
        }
      });



    $scope.localStorage = {};

    $scope.setStorage = function() {
      $scope.localStorage.id = $localstorage.get("id");
    };

    $scope.showLogoutPopup = function () {
      popupUtil.showLogoutPopup($scope);
    };

    $scope.logout = function() {
      $localstorage.set("id", null);
      $scope.setStorage();
      $state.go('main.home');
      $ionicSideMenuDelegate.toggleLeft(false);
    };



    $scope.choosePhoto = function () {
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
        console.log(imageData);

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
              formData.append('id', $localstorage.get("id"));
              formData.append('picture', imgBlob, file.name);
              $scope.setProfilePictureUpdate(formData);

            };
            // The most important point, use the readAsDatURL Method from the file plugin
            reader.readAsArrayBuffer(file);
          });
        }

        $scope.setProfilePictureUpdate = function (formData) {
          console.log(formData);
          profileManager.setProfilePicture(formData).then(
            function(data) {
              $scope.getProfileData();

            },
            function(error) {
              console.log(error);
            }
          );
        }
      });
    };

  });




