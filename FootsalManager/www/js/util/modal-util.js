angular.module('app.modal.util', [])

  .service('modalUtil', function($ionicModal) {

    this.showModal = function(animation, template, scope) {
      var _this = this;

        $ionicModal.fromTemplateUrl('templates/' + template, {
          scope: scope,
          animation: 'animated ' + animation,
          backdropClickToClose: false
        }).then(function (modal) {
          _this.modal = modal;
          _this.modal.show();
          // scope.modal = modal;
          // scope.modal.show();
        });
    };

    this.closeModal = function() {
      console.log('CloseModal');
      var _this = this;
      if(!_this.modal) return;
      _this.modal.hide();
      _this.modal.remove();
    };
  });
