'use strict';

siakun.app.controller('CustomerCtrl', ['$scope', 'Customers', function ($scope, Customers) {

    $scope.customer = null;
    $scope.customers = [];

    $scope.getById = function (id) {
        Customers.get({"id": id}, function (o) {
            $scope.customer = o;
        });
    };

    $scope.getCustomers = function () {
        Customers.list({}, function (o) {
                $scope.customers = [];
                o.forEach(function (el, idx, arr) {
                    $scope.customers.push(el);
                });
            }
        );
    };
}]);