app.controller('calendariosCtrl', function($scope, $compile){
    $scope.calendarios = {};
    $scope.calendarios.fechaInicial='';
    $scope.calendarios.cantidadDias='';
    $scope.calendarios.primeraFechaDelMes='';
    $scope.calendarios.contador=0;
    
    $scope.calendarios.crearDia=function(fecha){
        var elemento={}
        if(fecha!=""){
            var arrayFecha=fecha.toString().split(' ');
            elemento.dia=arrayFecha[0];
            elemento.mes=arrayFecha[1];
            elemento.numDia=arrayFecha[2];
            elemento.ano=arrayFecha[3];
            if((arrayFecha[0]=="Sun")||(arrayFecha[0]=="Sat") ){
                elemento.color="#F0F02B";
            }else{
                elemento.color="#C0F04B";
            }
            
            return elemento;
        }else{
            elemento.dia='';
            elemento.mes='';
            elemento.numDia='';
            elemento.ano='';
            elemento.color='#B0B2AB';
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

    $scope.calendarios.limpiarPantalla=function(){
        if(($scope.calendarios.fechaInicial!='')&&($scope.calendarios.cantidadDiasElegidos!='')){
            $scope.calendarios.cantidadDias=$scope.calendarios.cantidadDiasElegidos;
            $scope.calendarios.primeraFechaDelMes=$("#start").val();
            /* --Remover calendarios--*/
            var element = document.getElementById('contenedorCalendarios');
            while (element.firstChild) {
            element.removeChild(element.firstChild);
            }
            /* --Fin remover calendarios--*/
            $scope.calendarios.generarMes();
        }
    }

    $scope.calendarios.generarMes=function(){
        
        $scope.calendarios.vectorDias=[];
        var fechaInicial=$scope.calendarios.primeraFechaDelMes;
        console.log(fechaInicial);
        var arrayAordenar=fechaInicial.split('-');
        var fechaEspanol=arrayAordenar[0]+"/"+arrayAordenar[1]+"/"+arrayAordenar[2];
        
        var primerDia=new Date(arrayAordenar[0]+"/"+arrayAordenar[1]+"/01");
        $scope.calendarios.primerDiaNum=primerDia.getDay();
        var fecha = new Date(fechaEspanol);
        $scope.calendarios.mostradoMes(primerDia);

        if(primerDia.getTime()!=fecha.getTime()){
            $scope.calendarios.primerDiaNum=$scope.calendarios.primerDiaNum+(fecha.getDate()-1);
        }

        $scope.calendarios.vectorDias.push($scope.calendarios.crearDia(fecha));
        for(var i=1; i<$scope.calendarios.cantidadDias; i++){
            fecha.setDate(fecha.getDate() + 1);
           
            if(fecha.getMonth()!=primerDia.getMonth()){
                $scope.calendarios.armarCalendarioMes($scope.calendarios.primerDiaNum, $scope.calendarios.vectorDias);            
                var vectorfecha=fecha.toString().split(' ');
                var meSig =fecha.getMonth()+1;
                $scope.calendarios.primeraFechaDelMes=vectorfecha[3]+"-"+meSig+"-"+vectorfecha[2];
                $scope.calendarios.cantidadDias=$scope.calendarios.cantidadDias-i;
                i=$scope.calendarios.cantidadDias-1;
                $scope.calendarios.generarMes();
               // break;
            }else{
                $scope.calendarios.vectorDias.push($scope.calendarios.crearDia(fecha));
            }
            
            if(i>=$scope.calendarios.cantidadDias-1){
                $scope.calendarios.armarCalendarioMes($scope.calendarios.primerDiaNum, $scope.calendarios.vectorDias);            
            }
        }
    }

    $scope.calendarios.armarCalendarioMes=function(primerDiaNum, vectorDias){
        if(primerDiaNum==0){
            if(vectorDias.length<42){
                for(var y=vectorDias.length; y<42; y++){
                    vectorDias.push($scope.calendarios.crearDia(''));
                    if(y>=41){
                        $scope.calendarios["inspireList"+$scope.calendarios.contador]=$scope.calendarios.crearMatriz(vectorDias, 7);
                        $scope.calendarios.pintarCalendario();   
                    }
                }
            }
        }else{
            for(var j=0; j<primerDiaNum; j++){
                vectorDias.unshift($scope.calendarios.crearDia(''));
                if(j>=primerDiaNum-1){
                    if(vectorDias.length<42){
                        for(var y=vectorDias.length; y<42; y++){
                            vectorDias.push($scope.calendarios.crearDia(''));
                            if(y>=41){
                                $scope.calendarios["inspireList"+$scope.calendarios.contador] = $scope.calendarios.crearMatriz(vectorDias, 7);    
                                $scope.calendarios.pintarCalendario();
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
    
    $scope.calendarios.pintarCalendario=function(){

        var divHtml="<div id='calendario"+$scope.calendarios.contador+"' style='width: 30%; padding-left: 1%'>"+
            "<h2>"+$scope.calendarios.mesMostrado+"</h2>"+
            "<table class='table table-bordered'>"+
            "<thead>"+
                "<tr>"+
                "<th>Dom</th>"+
                "<th>Lun</th>"+
                "<th>Mar</th>"+
                "<th>Mie</th>"+
                "<th>Jue</th>"+
                "<th>vie</th>"+
                "<th>Sab</th>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
                "<tr ng-repeat='items in calendarios.inspireList"+$scope.calendarios.contador+"'>"+
                "<td ng-repeat='item in items' style='height: 35px; background-color: {{item.color}}'>{{item.numDia}}</td>"+
                "</tr>"+
            "</tbody>"+
            "</table>"+
        "</div>";
        /*************bootstrapping ***************/
        var vTemplate = angular.element(divHtml);
        angular.element(document.getElementById('contenedorCalendarios')).append(vTemplate);
        $compile(vTemplate)($scope);
        /**********End bootstrapping **************/
        $scope.calendarios.contador++;
    }
});