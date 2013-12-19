siakun.app.factory('Customers', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/json/customer/:id.json', {}, {
        get: {method: 'GET', isArray: false},
        list: {method: 'GET', isArray: true}
    });
}]);
