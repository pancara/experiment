siakun.app.factory('HttpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    $rootScope.http = {
        request: 0,
        response: 0,
        error: 0
    };
    return {
        request: function (config) {
            $rootScope.http.request++;
            return config || $q.when(config);
        },
        requestError: function (rejection) {
            return $q.reject(rejection);
        },

        response: function (response) {
            $rootScope.http.request++;
            $rootScope.http.request--;
            return response || $q.when(response);
        },

        responseError: function (rejection) {
            return $q.reject(rejection);
        }

    };
}]);