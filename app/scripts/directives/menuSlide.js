'use strict';

siakun.app
    .directive('menuSlide', function ($http, $timeout) {
        return {
            templateUrl: 'templates/menuSlide.html',
            restrict: 'E',
            replace: true,
            priority: 10,
            scope: {
                menuData: '='
            },

            controller: ['$scope', '$location', '$element', function ($scope, $location, $element) {
                $scope.stack = [0];
                $scope.last = -1;
                $scope.showing = false;

                $scope.clickBackBtn = function () {
                    if ($scope.showing)
                        return;

                    if ($scope.stack.length > 1) {
                        $scope.showing = true;
                        $scope.last = $scope.stack[$scope.stack.length - 1];
                        $scope.stack.splice($scope.stack.length - 1, 1);
                        showPrevious($scope, $element);
                    }
                };

                $scope.clickMenuItem = function (menuItem) {
                    if ($scope.showing)
                        return;

                    if (menuItem.submenuIndex < 0) {
                    } else {
                        $scope.showing = true;
                        $scope.last = $scope.stack[$scope.stack.length - 1];
                        $scope.stack.push(menuItem.submenuIndex);
                        showNext($scope, $element);
                    }
                };

                $scope.isMenuVisible = function (index) {
                    return $scope.stack[$scope.stack.length - 1] === index || $scope.last === index;
                };

                $scope.hasSubmenu = function (menuItem) {
                    return menuItem.submenuIndex !== -1;
                }
            }],

            link: function (scope, el, attrs, controller) {
                scope.menuList = tree2Array(scope.menuData);

                // workaround DOM rendering
                $timeout(function () {
                    buildUI(el, scope);
                }, 0);
            }
        };

        function buildUI(el, scope) {
            var h = el.height();
            var w = el.width();

            // header
            var header = el.find('.header')[0];
            var hHeader = angular.element(header).height();

            // view
            var view = el.find('.view')[0];
            var hView = h - hHeader;
            angular.element(view)
                .css({
                    "height": hView,
                    "width": w
                });

            // slider
            var slider = angular.element('.slider', view)[0];
            angular.element(slider)
                .height(hView)
                .width(scope.menuList.length * w)
                .children().each(function (idx, el) {
                    angular.element(el)
                        .width(w)
                        .height(hView);
                });
        }

        function tree2Array(tree) {
            var array = [];
            traverseTree(null, tree, 0, array);
            return array;
        }

        function traverseTree(parentMenu, tree, depth, array) {
            var menuGroup = [];
            array.push(menuGroup);
            if (parentMenu != null) {
                parentMenu.submenuIndex = array.length - 1;
            }

            tree.forEach(function (el, idx, source) {
                var menuItem = {
                    'text': el.text,
                    'glyph': el.glyph,
                    'path': el.path,
                    'depth': depth,
                    'submenuIndex': -1
                };
                menuGroup.push(menuItem);
                if (el.submenu != null) {
                    traverseTree(menuItem, el.submenu, depth + 1, array);
                }
            });
        }


        function getViewWidth($element) {
            var view = angular.element('.view', $element)[0];
            var $view = angular.element(view);
            var wView = $view.width();
            return wView;
        }

        function showPrevious($scope, $element) {
            var wView = getViewWidth($element);

            var slider = angular.element('.slider', $element)[0];
            var $slider = angular.element(slider);
            $slider.width(($scope.stack.length + 1) * wView);

            var sliderMargin = -1 * wView * ($scope.stack.length - 1);
            $slider.animate({'margin-left': sliderMargin}, function () {
                $scope.showing = false;
            });
        }

        function showNext($scope, $element) {
            var wView = getViewWidth($element);
            var slider = angular.element('.slider', $element)[0];
            var $slider = angular.element(slider);
            $slider.width($scope.stack.length * wView);

            angular.element('ul.menu', $element)
                .each(function (idx, el) {
                    angular.element(el).css('margin-left', wView * $scope.stack.indexOf(idx));
                });

            var sliderMargin = -1 * wView * ($scope.stack.length - 1);
            $slider.animate({'margin-left': sliderMargin}, function () {
                $scope.showing = false;
            });
        }
    })
;
