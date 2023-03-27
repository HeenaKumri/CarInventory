var myApp = angular.module("myModule", []);

myApp.service('EmployeeService', function ($http) {

    this.GetTable = function () {

        return $http.get('/api/Table/GetTable');

    };


});

myApp.controller("myController", function ($scope, EmployeeService) {

    // GetTable with Left Join///

    EmployeeService.GetTable().then(function (response) {
        $scope.Table = response.data.List;

    }, function myError(response) {
        $scope.Table = response.statusText;
    });


});