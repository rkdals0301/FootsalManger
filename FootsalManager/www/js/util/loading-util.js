angular.module('app.loading.util', [])

  .service('loadingUtil', function($ionicLoading) {

    this.showLoading = function(chkShowLoading) {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>',
        animation: 'fade-in',
        noBackdrop: false
      }).then(function(){
        console.log("The loading indicator is now shown");
        chkShowLoading = true;
      });
    };

    this.hideLoading = function(chkShowLoading){
      $ionicLoading.hide({
        animation : 'fade-out'
      }).then(function(){
        console.log("The loading indicator is now hidden");
        chkShowLoading = false;
      });
    };
  });
