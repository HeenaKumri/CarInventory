var myApp = angular.module("myModule", ['angucomplete-alt']);

myApp.service('LaptopService', function ($http) {

    this.GetLap = function () {

        return $http.get('/api/Carr/Getcarr');

    };

    this.GetFilterLap = function (Brand) {

        return $http.get('/api/Carr/GetFilterLap', { params: { Brand: Brand } });

    };


    this.savecar = function (car) {
        var request = $http({
            method: 'post',
            url: "https://localhost:44330/api/Carr/PostCar",
            data: car
        });
        return request;
    }

    this.Updatecarr = function (car) {
        var updaterequest = $http({
            method: 'post',
            url: 'https://localhost:44330/api/Carr/Updatecar',
            data: car
        });
        return updaterequest;
    }

    //car delete
    this.deleteConfirmation= function (Carsid) {
        return $http.get("/api/Carr/GetDeletecar", { params: { Carsid: Carsid } });
    }
        //end


});

myApp.controller("myController", function ($scope, LaptopService) {

    // GetTableList car //

    $scope.GetLap = function () {
        LaptopService.GetLap().then(function (response) {
            $scope.carList = response.data.List;

        }, function myError(response) {
            $scope.carList = response.statusText;
        });
    }
    $scope.GetLap();

   //save

    $scope.Savecar = function () {

        if ($scope.carrForm.$valid) {

            var car = {
                Carsid: $scope.carr.Carsid,
                BrandName: $scope.carr.BrandName,
                ModelName: $scope.carr.ModelName,
                Year: $scope.carr.Year,
                Price: $scope.carr.Price,
                New: $scope.carr.New
            }
            var saverecords = LaptopService.savecar(car);
            saverecords.then(function (d) {
                if (d.data == "Success") {
                    $scope.GetLap();

                    alert("Data added successfully");

                 }
                else { alert("Data is not added."); }
            },
                function () {
                    alert("Error occurred while adding Data.");
                });

        }
    
      
    }
 


    //  Edit button code  //

    $scope.edit = function (Lap) {
        $scope.carr = Lap;
    };


    //update car data

    $scope.Updatecar = function () {
        var car = {
            Carsid: $scope.carr.Carsid,
            BrandName: $scope.carr.BrandName,
            ModelName: $scope.carr.ModelName,
            Year: $scope.carr.Year,
            Price: $scope.carr.Price,
            New: $scope.carr.New
        };
        var updaterecords = LaptopService.Updatecarr(car);
        updaterecords.then(function (d) {
            if (d.data == "Success") {
                /*$scope.GetLap();*/

                alert("Data updated successfully");
               
            }
            else {
                alert("Data is not updated.");
            }
        },
            function () {
                alert("Error occured while updating record");
            });
    }

    /*---------------------- deleteConfirmation() --------------------*/
  

    $scope.DeleteConfirmation = function (Carsid) {
        LaptopService.deleteConfirmation(Carsid )
            .then(function (data) {
                if (data.data.message == 'Success') {
                    $scope.GetLap();
                    $scope.msg = alert("car group deleted successfully");
                }
                else
                    $scope.msg = alert(data.data);

            }, function (data) {
                $scope.msg = alert(data.data.message);

            })
    }

    //angucomplete car-------------------------------
    $scope.SelectedCar = function (acc) {
       if (acc != undefined) {
            var BrandName = acc.originalObject.BrandName;
            LaptopService.GetFilterLap(BrandName).
                then(function (response)
                {
                    if (response.data.anyMessage == 'Success') {
                        $scope.carList = response.data.List;
                    } 
                }, function (err)
                {
                    alert("Some error occured while fetching data");
                })
        }
    }

});