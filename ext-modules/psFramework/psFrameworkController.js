"use strict";

angular.module("psFramework").controller("psFrameworkController", ['$scope', '$rootScope', '$window', '$timeout', '$location',

  function($scope, $rootScope, $window, $timeout, $location) {

    $scope.isMenuButtonVisible = true;
    $scope.isMenuVisible = true;
    $scope.isMenuVertical = true;

    $($window).on('resize.psFramework', function() {
      $scope.$apply(function() {
        checkWidth();
        broadcastMenuState();
      });
    });

    $scope.$on("$destroy", function() {
      $($window).off("resize.psFramework");
    });

    var checkWidth = function() {
      var width = Math.max($($window).width(), $window.innerWidth);
      $scope.isMenuVisible = (width >= 768);
      $scope.isMenuButtonVisible = !$scope.isMenuVisible;
    };

    $scope.menuButtonClicked = function() {
      $scope.isMenuVisible = !$scope.isMenuVisible;
      broadcastMenuState();
      $scope.$apply();
    };

    $scope.$on('ps-menu-item-selected-event', function(event, data) {
      $scope.routeString = data.route;
      $location.path(data.route);
      checkWidth();
      broadcastMenuState();
    });



    $scope.$on('ps-menu-orientation-changed-event', function(event, data) {
      $scope.isMenuVertical = data.isMenuVertical;
    });



    var broadcastMenuState = function() {
      $rootScope.$broadcast('ps-menu-show', {
        show: $scope.isMenuVisible,
        isVertical: $scope.isMenuVertical,
        allowHorizontalToggle: !$scope.isMenuButtonVisible
      });
    };

    $timeout(function() {
      checkWidth();
    }, 0);
  }
]);
