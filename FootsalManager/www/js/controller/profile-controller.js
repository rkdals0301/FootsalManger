angular.module('app.main.profile.controller', ['app.main.profile.update.controller'])

  .config(function($stateProvider){
    $stateProvider
      .state('main.profile',{
        url : '/profile',
        views: {
          'content': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
          }
        }
      });
  })

  .controller('ProfileController', function($scope, $rootScope, profileManager, modalUtil, popupUtil, loadingUtil, $cordovaCamera){

    $scope.chkShowLoading = false;

    //Init()
    function Init() {
      $scope.getProfile();
    };

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('profile.js beforeEnter');
      Init();
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('profile.js beforeLeave');
    });

    $scope.getProfile = function (){
      if($scope.showLoading == true){
      } else if ($scope.showLoading == false){
        loadingUtil.showLoading($scope.chkShowLoading);
      }
      profileManager.getProfile($rootScope.localStorage.id).then(
        function(data) {
          $scope.profile = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          // if($scope.profile.phone != null){
          //   $scope.profile.phone = parseFloat($scope.profile.phone);
          // }
          // if($scope.profile.age != null){
          //   $scope.profile.age = parseFloat($scope.profile.age);
          // }
          // if($scope.profile.height != null){
          //   $scope.profile.height = parseFloat($scope.profile.height);
          // }
          // if($scope.profile.weight != null){
          //   $scope.profile.weight = parseFloat($scope.profile.weight);
          // }
          loadingUtil.hideLoading($scope.chkShowLoading);
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.$on('modal.removed', function() {
      $scope.getProfile();
    });

    $scope.showUpdate = function(animation){
      modalUtil.init(animation,'profile-update.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
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
              formData.append('id', $rootScope.localStorage.id);
              formData.append('picture', imgBlob, file.name);
              $scope.setProfilePicture(formData);
            };
            // The most important point, use the readAsDatURL Method from the file plugin
            reader.readAsArrayBuffer(file);
          });
        }

        $scope.setProfilePicture = function (formData) {
          loadingUtil.showLoading($scope.chkShowLoading);
          profileManager.setProfilePicture(formData).then(
            function(data) {
              $scope.getProfile();
            },
            function(error) {
              console.log(error);
            }
          );
        }
      });
    };

  });

