"use strict";

angular.module("psMenu").directive("psMenuGroup", function() {
  return {
    require: "^psMenu",
    transclude: true,
    scope: {
      label: '@',
      icon: '@'
        // route: '@'
    },
    templateUrl: "ext-modules/psMenu/psMenuGroupTemplate.html",
    link: function(scope, el, attr, ctrl) {

      scope.isOpen = false;
      scope.closeMenu = function() {
        scope.isOpen = false;
      };

      scope.isVertical = function() {
        return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
      };

      scope.clicked = function() {
        scope.isOpen = !scope.isOpen;

        if (el.parents('.ps-subitem-section').length == 0)
          scope.setSubmenuPosition();
        ctrl.setOpenMenuScope(scope);
      };

      scope.setSubmenuPosition = function() {

        var pos = el.offset();
        $('.ps-subitem-section').css({
          'left': pos.left + 20,
          'top': 36
        });

      };


    }
  };
});
