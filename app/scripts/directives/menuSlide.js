'use strict';

angular.module('experimentApp')
  .directive('menuSlide', function () {
    return {
      templateUrl: 'templates/menuSlide.html',
      restrict: 'A'
    };
  });
