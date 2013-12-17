siakun.app.controller("DemoCtrl", function ($scope, $http) {
    $scope.myData = [];

    $scope.selections = [];

    $scope.total = 0;

    $scope.deleteItem = function (item) {
        console.log("deleting");
        console.log(item);
        var idx = $scope.myData.indexOf(item);
        $scope.myData.splice(idx, 1);
    };

    $scope.getData = function () {
        console.log('get data');
        $http({
            'method': 'get',
            'url': 'json/data.json'
        }).success(function (data) {
                $scope.myData.splice(0, $scope.myData.length);
                console.log(data);
                data.forEach(function (el) {
                    console.log(el);
                    $scope.myData.push(el);
                });

                console.log($scope.myData);
            });
    };

    $scope.clearData = function () {
        $scope.myData.splice(0, $scope.myData.length);
    };
    $scope.gridOptions = { data: 'myData',
        columnDefs: [
            {field: 'name', displayName: 'Name', width: 100},
            {field: 'value', displayName: 'Value', enableCellEdit: true, width: '*'}
            ,
            {
                sortable: false,
                displayName: 'Options',
                width: 100,
                cellTemplate: '<input type="button" ng-click="deleteItem(row.entity)" name="delete" value="Delete">'
            }
        ],
        showSelectionCheckbox: true,
        selectedItems: $scope.selections,
        showGroupPanel: true,
        footerRowHeight: 40,
        showFooter: false,
        multiSelect: false
    };

    $scope.$watch("selections.length", function () {
        var total = 0;
        console.log("selections changing");
        $scope.selections.forEach(function (item, idx, array) {
            total += item.age;
        });
        $scope.total = total;
    });

})
;