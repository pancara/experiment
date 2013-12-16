'use strict';

describe('Controller: SidemenuCtrl', function () {

  // load the controller's module
  beforeEach(module('experimentApp'));

  var SidemenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidemenuCtrl = $controller('SidemenuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
