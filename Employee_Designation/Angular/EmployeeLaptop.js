var myApp = angular.module("myModule", []);

myApp.service('EmployeeService', function ($http) {

    this.GetStaf = function () {

        return $http.get('/api/EmployeeLaptop/GetData');

    };
});

myApp.controller("myControlWler", function ($scope, EmployeeService) {

    
        EmployeeService.GetStaf().then(function (response) {
            $scope.Staf = response.data.List;

        }, function myError(response) {
            $scope.Staf = response.statusText;
        });
    
});