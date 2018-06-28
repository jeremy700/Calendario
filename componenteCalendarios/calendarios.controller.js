app.controller('calendariosCtrl', function($scope){
    $scope.calendarios = {};
    $scope.calendarios.fechaInicial='';
    $scope.calendarios.cantidadDias='';
    //$scope.calendarios.vectorDias2=[1,2,3,4,5,6,7,8,9,10,11,12];

    $scope.calendarios.crearDia=function(fecha){
        var elemento={}
        if(fecha!=""){
            var arrayFecha=fecha.toString().split(' ');
            elemento.dia=arrayFecha[0];
            elemento.mes=arrayFecha[1];
            elemento.numDia=arrayFecha[2];
            elemento.ano=arrayFecha[3];
            return elemento;
        }else{
            elemento.dia='';
            elemento.mes='';
            elemento.numDia='';
            elemento.ano='';
            return elemento;
        }
        
    }

    $scope.calendarios.crearMatriz = function(data, n) {
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
            var fechaInicial=$("#start").val();
            var arrayAordenar=fechaInicial.split('-');
            var fechaEspanol=arrayAordenar[0]+"/"+arrayAordenar[1]+"/"+arrayAordenar[2];
            
            var primerDia=new Date(arrayAordenar[0]+"/"+arrayAordenar[1]+"/01");
            var primerDiaNum=primerDia.getDay();
            var fecha = new Date(fechaEspanol);
            
            if(primerDia.getTime()!=fecha.getTime()){
                console.log(fecha.getDate());
                primerDiaNum=primerDiaNum+(fecha.getDate()-1);
            }

            $scope.calendarios.vectorDias.push($scope.calendarios.crearDia(fecha));
            for(var i=1; i<$scope.calendarios.cantidadDias; i++){
                fecha.setDate(fecha.getDate() + 1);
                $scope.calendarios.vectorDias.push($scope.calendarios.crearDia(fecha));
                
                if(i>=$scope.calendarios.cantidadDias-1){
                    if(primerDiaNum==0){
                        $scope.calendarios.inspireList = $scope.calendarios.crearMatriz($scope.calendarios.vectorDias, 7);    
                    }else{
                        for(var j=0; j<primerDiaNum; j++){
                            $scope.calendarios.vectorDias.unshift($scope.calendarios.crearDia(''));
                            if(j>=primerDiaNum-1){
                                $scope.calendarios.inspireList = $scope.calendarios.crearMatriz($scope.calendarios.vectorDias, 7);
                            }
                        }
                    }
                }
            }
            
        }
    }
});