angular.module('app.modal.util', [])

  .service('modalUtil', function($ionicModal, $rootScope) {

    var init = function(animation, template, $scope) {

      var promise;
      $scope = $scope || $rootScope.$new();
      promise = $ionicModal.fromTemplateUrl('templates/' + template, {
        scope: $scope,
        animation: 'animated ' + animation,
        backdropClickToClose: false
      }).then(function(modal) {
        $scope.modal = modal;
        return modal;
      });
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      return promise;
    }
    return {
      init: init
    }
  });
