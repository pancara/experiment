siakun.app.controller("DemoCtrl", function ($scope, Customers) {
    $scope.customers = [];
    $scope.selections = [];

    $scope.total = 0;

    $scope.deleteItem = function (item) {
        var idx = $scope.customers.indexOf(item);
        $scope.customers.splice(idx, 1);
    };

    $scope.getData = function () {
        $scope.clearData();
        Customers.list({}, function (o) {
                o.forEach(function (el, idx, arr) {
                    $scope.customers.push(el);
                });
            }
        );
    };

    $scope.clearData = function () {
        $scope.customers.splice(0, $scope.customers.length);
        $scope.selections.splice(0, $scope.selections.length);
    };

    $scope.gridOptions = {
        data: 'customers',
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
        showFooter: true,
        multiSelect: true
    };

    $scope.$watch("selections.length", function () {
        var total = 0;
        $scope.selections.forEach(function (item, idx, array) {
            total += item.age;
        });
        $scope.total = total;
    });

});