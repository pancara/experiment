'use strict';
siakun.app
    .controller('MainMenuCtrl', function ($scope) {
        $scope.menuData = [
            {
                "text": "1",
                "glyph": "glyp 1",
                "path": "path 1"
            },
            {
                "text": "2",
                "glyph": "glyp 2",
                "path": "path",
                "submenu": [
                    {
                        "text": "2.1",
                        "glyph": "glyp 2.1",
                        "path": "path 2.1"
                    }
                ]
            },
            {
                "text": "3",
                "glyph": "glyp 3",
                "path": "path",
                "submenu": [
                    {
                        "text": "3.1",
                        "glyph": "glyp 3.1",
                        "path": "path 3.1",
                        "submenu": [
                            {
                                "text": "3.1.1",
                                "glyph": "glyp 3.1.1",
                                "path": "path 3.1.1"
                            }
                        ]
                    }
                ]
            }

        ];
    })
;
