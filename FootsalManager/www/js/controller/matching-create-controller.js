angular.module('app.main.matching.create.controller', ['app.team.member.manager','ionic-datepicker'])

  .controller('Matching-CreateController', function($scope, $rootScope, matchingManager, toastUtil, loadingUtil, teamMemberManager, ionicDatePicker, modalUtil){
    $scope.selectedDate1 = '';

    $scope.location = {city : '전체', gu : '전체'};
    $scope.locatonChk = 0;

    ////////////////Date Format
    Date.prototype.format = function(f) {
      if (!this.valueOf()) return " ";
      var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
      var d = this;
      return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
          case "yyyy": return d.getFullYear();
          case "yy": return (d.getFullYear() % 1000).zf(2);
          case "MM": return (d.getMonth() + 1).zf(2);
          case "dd": return d.getDate().zf(2);
          case "E": return weekName[d.getDay()];
          case "HH": return d.getHours().zf(2);
          case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
          case "mm": return d.getMinutes().zf(2);
          case "ss": return d.getSeconds().zf(2);
          case "a/p": return d.getHours() < 12 ? "오전" : "오후";
          default: return $1;
        }
      });
    };

    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};

    $scope.openDatePickerOne = function (val) {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          $scope.selectedDate1 = new Date(val).format("yyyy년.MM월.dd일");
        },
        from: new Date,
        to: new Date(2019, 12, 31),
        inputDate: new Date(),
        mondayFirst: true,
        disableWeekdays: [],
        closeOnSelect: false,
        templateType: 'popup'
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.matching = {regid : $rootScope.localStorage.id, regt_name : '', reghopeTime : '', regcontent : '', regcity : '', reggu : '', regteamnum : ''};


    $scope.$on('modal.shown', function(){
      $scope.getTeamMemberTeamNameList();
    });

    $scope.SubmitMatching = function () {
      $scope.matching.reghopeTime = $scope.selectedDate1;
      $scope.matching.regcity = $scope.location.city;
      $scope.matching.reggu = $scope.location.gu;
      if($scope.matching.reghopeTime == ''){
        toastUtil.showShortBottomToast('원하는 날짜를 입력하세요.');
      } else if ($scope.matching.regcontent == ''){
        toastUtil.showShortBottomToast('내용를 입력하세요.');
      }  else if($scope.matching.regteamnum == ''){
        toastUtil.showShortBottomToast('팀원 수를 입력하세요.');
      } else {
        $scope.setMatching();
      }
    };

    $scope.setMatching = function () {
      loadingUtil.showLoading();
      matchingManager.setMatching($scope.matching).then(
        function (data) {
          toastUtil.showShortBottomToast('매칭이 등록 되었습니다.');
          loadingUtil.hideLoading();
          $scope.modalB.remove();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.getTeamMemberTeamNameList = function () {
      loadingUtil.showLoading();
      teamMemberManager.getTeamMemberTeamNameList($rootScope.localStorage.id).then(
        function(data) {
          $scope.myTeamNameList = data;
          $scope.matching.regt_name = $scope.myTeamNameList[0];
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };


    $scope.showCity = function(animation, chkClick){
      $scope.locatonChk = chkClick;
      modalUtil.init(animation,'location.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };

    $scope.$watch("matching.regcontent", function(newValue, oldValue){
      if (newValue.length > 45){
        $scope.matching.regcontent = oldValue;
      }
    });

    $scope.$watch("matching.regteamnum", function(newValue, oldValue){
      if (newValue.length > 2){
        $scope.matching.regteamnum = oldValue;
      }
    });

  });
