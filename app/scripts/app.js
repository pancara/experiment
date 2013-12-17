'use strict';
var siakun = siakun || {};

siakun.app = angular.module('siakunApp', [
        'ngRoute',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngGrid'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
