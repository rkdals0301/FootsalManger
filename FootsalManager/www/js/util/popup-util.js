angular.module('app.popup.util', [])

  .service('popupUtil', function($ionicPopup) {

    this.showDeletePopup = function (scope, category) {
       var alertDeletePopup = $ionicPopup.show({
        template: '',
        title: 'Delete',
        subTitle: 'Really Delete?',
        scope: scope,
        buttons: [
          {text: 'Cancel',
            type: 'button-positive',
            onTap: function (e) {}
          },
          {
            text: '<b>Delete</b>',
            type: 'button-positive',
            onTap: function (e) {
              if(category == "matching")
                scope.deleteMatchingData();
              else if (category == "recruitment"){
                scope.deleteRecruitmentData();
              }
              scope.modal.remove();
            }
          }
        ]
      });
    };

    this.showLogoutPopup = function (scope) {
      var alertLogoutPopup = $ionicPopup.show({
        template: '',
        title: 'Logout',
        subTitle: 'Really Logout?',
        scope: scope,
        buttons: [
          {text: 'Cancel',
            type: 'button-positive',
            onTap: function (e) {}
          },
          {
            text: '<b>LogOut</b>',
            type: 'button-positive',
            onTap: function (e) {
              scope.logout();
            }
          }
        ]
      });
    };

    $scope.showPopup = function() {
      $scope.data = {};
      $ionicPopup.show({
        template: '<input type="username">',
        title: 'Enter Username',
        subTitle: 'Please Enter Username',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              // add your action
            }
          }
        ]
      });
    };


  });
