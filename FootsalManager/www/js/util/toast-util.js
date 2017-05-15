angular.module('app.toast.util', [])

  .service('toastUtil', function($cordovaToast) {
    this.showShortBottomToast = function(message) {
      $cordovaToast.showShortBottom(message).then(function(success) {
        // success
      }, function (error) {
        // error
      });
    };
  });
