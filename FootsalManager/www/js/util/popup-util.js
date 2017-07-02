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
              } else if (category == "community"){
                scope.deleteCommunity();
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

    this.showPositionPopup = function (scope) {
      var alertPositionSelectPopup = $ionicPopup.show({
        template: '<ion-list>' +
        '<ion-radio ng-repeat="position in positionList" ng-value="position.value" ng-model="teamMember.position">' +
        '{{position.text}} </ion-radio>',
        title: '포지션을 선택하세요',
        scope: scope,
        buttons: [
          {text: 'Cancel',
            type: 'button-positive',
            onTap: function (e) {}
          },
          {
            text: '<b>OK</b>',
            type: 'button-positive',
            onTap: function (e) {
              scope.putTeamMemberPosition();
            }
          }
        ]
      });
    };

    this.showDutyPopup = function (scope) {
      var alertDutyPopup = $ionicPopup.show({
        template: '',
        title: '위임하기',
        subTitle: '팀장을 위임하시겠습니까?',
        scope: scope,
        buttons: [
          {text: 'Cancel',
            type: 'button-positive',
            onTap: function (e) {}
          },
          {
            text: '<b>OK</b>',
            type: 'button-positive',
            onTap: function (e) {
              scope.putTeamMemberDutyList();
            }
          }
        ]
      });
    };


  });
