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
                scope.deleteMatching();
              else if (category == "recruitment"){
                scope.deleteRecruitment();
              }
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




  });
