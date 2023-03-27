
var myApp = angular.module("myModule", []);

myApp.service('EmployeeService', function ($http) {

    this.GetStaf = function () {

        return $http.get('https://localhost:44330/api/Designation/GetData');

    };

    this.save = function (Staf) {
        var request = $http({
            method: 'post',
            url: 'https://localhost:44330/api/Designation/PostData',
            data: Staf
        });
        return request;
    }

    this.GetDesig = function () {

        return $http.get('https://localhost:44330/api/Designation/GetDesignation');

    };

    //update Employee records

    this.update = function (Staf) {
        var updaterequest = $http({
            method: 'post',
            url: 'https://localhost:44330/api/Designation/UpdateStaf',
            data: Staf
        });
        return updaterequest;
    }

    

   
});

/* ---------------------------------------CONTROLLER----------------------------------*/

myApp.controller("myController", function ($scope, EmployeeService) {

    /* ---------- GET TABLE FRON DATABASE -----------------*/

    $scope.Getlist = function () {
        EmployeeService.GetStaf().then(function (response) {
            $scope.Staf = response.data.List;

        }, function myError(response) {
            $scope.Staf = response.statusText;
        });
    }
    $scope.Getlist();

    //save employee data and Validation

    $scope.$watch('StafForm.$valid', function (value) {
    $scope.IsFormValid = value;
    })

    $scope.save = function () {

        if ($scope.StafForm.$valid) {

            var Staf = {
                EmpId: $scope.Staf.EmpId,
                EmpName: $scope.Staf.EmpName,
                DesId: $scope.Staf.DesId
            };

            var saverecords = EmployeeService.save(Staf);
            saverecords.then(function (d) {
                if (d.data == "Success") {
                    $scope.Getlist();

                    alert("Employee added successfully");

                    /* $scope.resetSave();*/

                }
                else { alert("Employee not added."); }
            },
                function () {
                    alert("Error occurred while adding employee.");
                });

        } else {
           alert("Fill All star(*) Fields!");
            $scope.IsSubmitted = true;
        }
        
    }

    //update Employee data

    $scope.update = function () {
        var Staf = {
            EmpId: $scope.Staf.EmpId,
            EmpName: $scope.Staf.EmpName,
            DesId: $scope.Staf.DesId
        };
        var updaterecords = EmployeeService.update(Staf);
        updaterecords.then(function (d) {
            if (d.data == "Success") {
                $scope.Getlist();

                alert("Staf updated successfully");
                $scope.resetUpdate();
            }
            else {
                alert("Staf not updated.");
            }
        },
            function () {
                alert("Error occured while updating Staf record");
            });
    }


    //  list  option //

    EmployeeService.GetDesig().then(function (response) {
        $scope.Designation = response.data.List;

    }, function myError(response) {
        $scope.Designation = response.statusText;
    });

   
   
    
    
    ////reset controls after update
    //$scope.resetUpdate = function () {
    //    $scope.UpdateEmpl_Id = '';
    //    $scope.UpdateName = '';
    //    $scope.UpdateDesignation = '';
    //}

    ////reset controls after Save
    //$scope.resetSave = function () {
    //    $scope.UpdateEmpl_Id = '';
    //    $scope.UpdateName = '';
    //    $scope.UpdateDesignation = '';
    //}

    /* -----Edit-----*/

    $scope.Edit = function (Staf) {
        $scope.Staf = Staf;
    };

    

    //$scope.CreateEmployee = function () {
    //    var Employee = {
    //        Empl_Id: $scope.Employee.Empl_Id,
    //        Name: $scope.Employee.Name,
    //        Designation: $scope.Employee.Designation
    //    };
    //    if ($scope.Employee.Empl_Id > 0) {

    //        EmployeeService.update(Employee)
    //            .then(function (d) {
    //                if (d.data == "Success") {
    //                    $scope.Getlist();
    //                    alert("Employee updated successfully");
    //                    $scope.resetUpdate();
    //                }
    //                else {
    //                    alert("Employee not updated.");
    //                }
    //            },
    //                function () {
    //                    alert("Error occured while updating employee record");
    //                });
    //    }

    //    else {

    //        EmployeeService.save(Employee)
    //            .then(function (d) {

    //                if (d.data == "Success") {
    //                    $scope.Getlist();
    //                    alert("Employee added successfully");
    //                    $scope.resetSave();

    //                }
    //                else { alert("Employee not added."); }
    //            },
    //                function () {
    //                    alert("Error occurred while adding employee.");
    //                });
    //    }
    //}



        




         

});