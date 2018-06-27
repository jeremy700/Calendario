app.controller('calendariosCtrl', function($scope){
    $scope.calendarios = {};
    $scope.calendarios.fechaInicial='';
    $scope.calendarios.cantidadDias='';
    //$scope.calendarios.vectorDias2=[1,2,3,4,5,6,7,8,9,10,11,12];

    $scope.calendarios.crearElemento=function(fecha){
        var elemento={}
        var arrayFecha=fecha.toString().split(' ');
        elemento.dia=arrayFecha[0];
        elemento.mes=arrayFecha[1];
        elemento.numDia=arrayFecha[2];
        elemento.ano=arrayFecha[3];
        return elemento;
    }

    $scope.calendarios.matrixList = function(data, n) {
        var grid = [], i = 0, x = data.length, col, row = -1;
        for (var i = 0; i < x; i++) {
            col = i % n;
            if (col === 0) {
                grid[++row] = [];
            }
            grid[row][col] = data[i];
        }
        return grid;
    };

    $scope.calendarios.generarCalendarios=function(){
        if(($scope.calendarios.fechaInicial!='')&&($scope.calendarios.cantidadDias!='')){
            $scope.calendarios.vectorDias=[];
            var fecha = $scope.calendarios.fechaInicial;
            $scope.calendarios.vectorDias.push($scope.calendarios.crearElemento(fecha));
            for(var i=1; i<$scope.calendarios.cantidadDias; i++){
                fecha.setDate(fecha.getDate() + 1);
                $scope.calendarios.vectorDias.push($scope.calendarios.crearElemento(fecha));

                if(i>=$scope.calendarios.cantidadDias-1){
                    console.log($scope.calendarios.vectorDias);   
                    $scope.calendarios.inspireList = $scope.calendarios.matrixList($scope.calendarios.vectorDias, 7);
                    console.log($scope.calendarios.inspireList);   
                }
            }
        }
    }
    //http://techbloghunting.com/2016/11/08/angularjs-ng-repeat-array-rows-columns/
});