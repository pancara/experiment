'use strict';

angular.module("Filters", [])
    .filter('range', function () {
        return function (value) {
            var arr = [];
            for (var i = 0; i < value; i++)
                arr.push(i);
            return arr;
        };
    })
    .filter('multiply', function () {
        return function (value, multiplier) {
            return value * multiplier;
        }
    });