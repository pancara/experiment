'use strict';

describe('Directive: menuSlide', function () {

  // load the directive's module
  beforeEach(module('experimentApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<menu-slide></menu-slide>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the menuSlide directive');
  }));
});
