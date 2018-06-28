app.controller('calendariosCtrl', function($scope){
    $scope.calendarios = {};
    $scope.calendarios.fechaInicial='';
    $scope.calendarios.cantidadDias='';

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
            $scope.calendarios.mostradoMes(primerDia);

            if(primerDia.getTime()!=fecha.getTime()){
                primerDiaNum=primerDiaNum+(fecha.getDate()-1);
            }

            $scope.calendarios.vectorDias.push($scope.calendarios.crearDia(fecha));
            for(var i=1; i<$scope.calendarios.cantidadDias; i++){
                fecha.setDate(fecha.getDate() + 1);
                $scope.calendarios.vectorDias.push($scope.calendarios.crearDia(fecha));
                
                if(i>=$scope.calendarios.cantidadDias-1){
                    if(primerDiaNum==0){
                        if($scope.calendarios.vectorDias.length<42){
                            for(var y=$scope.calendarios.vectorDias.length; y<42; y++){
                                $scope.calendarios.vectorDias.push($scope.calendarios.crearDia(''));
                                if(y>=41){
                                    $scope.calendarios.inspireList = $scope.calendarios.crearMatriz($scope.calendarios.vectorDias, 7);    
                                }
                            }
                        }
                    }else{
                        for(var j=0; j<primerDiaNum; j++){
                            $scope.calendarios.vectorDias.unshift($scope.calendarios.crearDia(''));
                            if(j>=primerDiaNum-1){
                                if($scope.calendarios.vectorDias.length<42){
                                    for(var y=$scope.calendarios.vectorDias.length; y<42; y++){
                                        $scope.calendarios.vectorDias.push($scope.calendarios.crearDia(''));
                                        if(y>=41){
                                            $scope.calendarios.inspireList = $scope.calendarios.crearMatriz($scope.calendarios.vectorDias, 7);    
                                            console.log($scope.calendarios.inspireList);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
        }
    }
    $scope.calendarios.mostradoMes=function(fecha){
        
        switch (fecha.getMonth()){
          case 0:
            $scope.calendarios.mesMostrado="Enero "+fecha.getFullYear();
          break;
          case 1:
            $scope.calendarios.mesMostrado="Febrero "+fecha.getFullYear();
          break;
          case 2:
            $scope.calendarios.mesMostrado="Marzo "+fecha.getFullYear();
          break;
          case 3:
            $scope.calendarios.mesMostrado="Abril "+fecha.getFullYear();
          break;
          case 4:
            $scope.calendarios.mesMostrado="Mayo "+fecha.getFullYear();
          break;
          case 5:
            $scope.calendarios.mesMostrado="Junio "+fecha.getFullYear();
          break;
          case 6:
            $scope.calendarios.mesMostrado="Julio "+fecha.getFullYear();
          break;
          case 7:
            $scope.calendarios.mesMostrado="Agosto "+fecha.getFullYear();
          break;
          case 8:
            $scope.calendarios.mesMostrado="Septiembre "+fecha.getFullYear();
          break;
          case 9:
            $scope.calendarios.mesMostrado="Octubre "+fecha.getFullYear();
          break;
          case 10:
            $scope.calendarios.mesMostrado="Nobiembre "+fecha.getFullYearar();
          break;
          case 11:
            $scope.calendarios.mesMostrado="Diciembre "+fecha.getFullYear();
          break;
        } 
    }
    
});