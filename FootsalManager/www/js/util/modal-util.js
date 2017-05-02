angular.module('app.modal.util', [])

  .service('modalUtil', function($ionicModal) {

    this.showModal = function(animation, template, scope) {
        $ionicModal.fromTemplateUrl('templates/' + template, {
          scope: scope,
          animation: 'animated ' + animation,
          backdropClickToClose: false
        }).then(function (modal) {
          scope.modal = modal;
          scope.modal.show();
        });
    };
  });
