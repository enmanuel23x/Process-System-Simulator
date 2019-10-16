var prev='';
var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];
var process=[];
var tim=0;
var time=document.getElementById("time");
var cola=document.getElementById("cola");
var run=document.getElementById("run");
var stop=document.getElementById("stop");
var sleep=document.getElementById("sleep");
var final=document.getElementById("dead");
var q
var prop_bloqueo =15 //%
var count=0;
var timeout="";
var memo_ram=0;
var memo_virtual=0;
var bandbutton=true;
var bandQAuto=true
var teclado="", mouse="", escaner=""
//Cambio de lista a simulador y simulador a lista
var changevalue=true;
function change(){
    if(changevalue){
        document.getElementById("lista").style.display="none";
        document.getElementById("simulador").style.display="block";
    }else{
        document.getElementById("lista").style.display="block";
        document.getElementById("simulador").style.display="none";
    }
    document.getElementById("list").disabled=!changevalue
    document.getElementById("simu").disabled=changevalue
    changevalue=!changevalue
}
//actualizacion de memoria
function memoact(){
    memo_virtual=0;
    memo_ram=0;
    for (i=0;i<process.length;i++){
        if(process[i][1]=="DETENIDO"){
            memo_virtual+=parseInt(process[i][4])
        }else if(process[i][1]=="EJECUTANDO" || process[i][1]=="PREPARADO"){
            memo_ram+=parseInt(process[i][4])
        }
    }
    document.getElementById("virt").innerHTML=memo_virtual;
    document.getElementById("ram").innerHTML=memo_ram;
}
//eventos botones
function iniciar(){
    
    if(tbody.rows.length==0){
        alert("Lista sin procesos")
    }else{
        bloqbutton()
        let metodo= document.getElementById("metodos");
        metodo=metodo.options[metodo.selectedIndex].value;
        metodo.disabled=true;
        document.getElementById("quantum").disabled=true;
        switch(metodo) {
            //FIFO
            case "0":
                process= process.sort(function(a,b) {
                    return a[2] - b[2];
                });
                for(i=0;i<process.length;i++){
                    if(i<1){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO";
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO";
                    }
                }
                llenarTabla();
                document.getElementById("time").innerHTML=process[0][5];
                tim=process[0][5];
                timeout=setTimeout("FIFO()",1000);
                timeout2=setTimeout("bloquear()",1000);
                break;
            //Round Robin
            case "1":
                process= process.sort(function(a,b) {
                    return a[2] - b[2];
                });
                for(i=0;i<process.length;i++){
                    if(i<1){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO";
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO";
                    }
                }
                llenarTabla();
                q=document.getElementById("quantum").value;
                if(q!=0){
                    bandQAuto=false
                }
                q=getQ()
                document.getElementById("time").innerHTML=process[0][5];
                tim=process[0][5];
                timeout=setTimeout("RoundRobin()",1000);
                timeout2=setTimeout("bloquear()",1000);
                break;
            //Prioridad
            case "2":
                process= process.sort(function(a,b) {
                    return a[3] - b[3];
                });
                for(i=0;i<process.length;i++){
                    if(i<1){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO";
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO";
                    }
                }
                llenarTabla();
                document.getElementById("time").innerHTML=process[0][5];
                tim=process[0][5];
                timeout=setTimeout("Prioridad()",1000);
                timeout2=setTimeout("bloquear()",1000);
                break;
            //SJF
            case "3":
            process= process.sort(function(a,b) {
                    return a[2] - b[2];
                });
            process= process.sort(function(a,b) {
                    return a[5] - b[5];
                });
                for(i=0;i<process.length;i++){
                    if(i<1){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO";
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO";
                    }
                }
                llenarTabla();
                document.getElementById("time").innerHTML=process[0][5];
                tim=process[0][5];
                timeout=setTimeout("SJF()",1000);
                timeout2=setTimeout("bloquear()",1000);
                break;
        }
    }
}
function cargar(){
    n=50
    //tr 20-25
    //alto 15-19
    //normal 10-14
    //bajo 5-9
    //segundo plano 0-4
    lp=[]
    for (i=0;i<=n;i++){
        PID = i;
        PName="Pr-"+i
        tBurst = parseInt((Math.random() * 9 + 1))
        tBloqueado = parseInt((Math.random() * 9 + 1))
        prioridad = parseInt((Math.random() * 25))
        memo= 1024 * parseInt(Math.random()*9+1)
        quant = parseInt(Math.random()*4+1) 
        lp.push([PName,'NUEVO',PID,prioridad,memo,tBurst,tBloqueado,quant,"X"])
    }
    html='';
    let p=[]
    process=lp
    for (var i = 0; i < lp.length; i++) {
        html += '<tr>';
        html += '<td>';
        html += lp[i][0];
        html += '</td>';
        html += '<td>Nuevo';
        html += '</td>';
        html += '<td>';
        html += lp[i][2];
        html += '</td>';
        html += '<td>';
        html += lp[i][3];
        html += '</td>';
        html += '<td>';
        html += lp[i][4];
        html += '</td>';
        html += '<td>';
        html += lp[i][5];
        html += '</td>';
        html+= '<td>';
        html += lp[i][8];
        html += '</td>';
        html += '</tr>';
    }
    document.getElementById('bodyTable').innerHTML = html;
}
function bloqbutton(){
        document.getElementById("cargar").disabled = bandbutton;
        document.getElementById("metodos").disabled = bandbutton;
        document.getElementById("iniciar").disabled = bandbutton;
        bandbutton=!bandbutton;
}
//llenado de tabla(colores)
function RellenarTabla(){
    memoact()
    let color="";
        for(i=0;i<tbody.rows.length;i++){
            switch(tbody.rows[i].cells[1].innerHTML){
                case "FINALIZADO":
                    color="green";
                break;
                case "BLOQUEADO":
                    color="red";
                    break;
                case "EJECUTANDO":
                    color="orange";
                    break;
                case "PREPARADO":
                    color="gold";
                    break;
                case "NUEVO":
                    color="transparent";
                    break;
            }
            tbody.rows[i].style.backgroundColor=color;
        }
}
function llenarTabla(){
    memoact()
    let color="",pos;
    for(j=0;j<process.length;j++){
        pos=-1;
        for(i=0;i<tbody.rows.length;i++){
            if(tbody.rows[i].cells[0].innerHTML==process[j][0]){
                pos=i;break;
            }
        }
        switch(process[j][1]){
            case "DETENIDO":
                color="red";
                break;
            case "FINALIZADO":
                color="green";
                break;
            case "ESPERA":
                color="SeaGreen";
                break;
            case "EJECUTANDO":
                color="orange";
                break;
            case "PREPARADO":
            color="gold";
                break;
        }
        if(pos>-1){
            tbody.rows[pos].cells[1].innerHTML=process[j][1];
            tbody.rows[pos].cells[2].innerHTML=process[j][2];
            tbody.rows[pos].cells[3].innerHTML=process[j][3];
            tbody.rows[pos].cells[4].innerHTML=process[j][4];
            tbody.rows[pos].cells[5].innerHTML=process[j][5];
            tbody.rows[pos].cells[6].innerHTML=process[j][8];
            if(tbody.rows[pos].style.backgroundColor!="cyan"){
                tbody.rows[pos].style.backgroundColor=color;
            }
        }
    }
}
//metodos de gestion de procesos
function FIFO() {
    tim=tim-1;
    process[0][5]=tim;
    time.innerHTML = tim;
    llenarTabla();
    prop= parseInt(Math.random()*99+1)
    if(prop<=prop_bloqueo && tim!=0 && process[0][6]>0){
        prop= parseInt(Math.random()*19+1)
        if(prop<=10){
            process[0][1]="ESPERA"
            sleep.value+=" "+process[0][0];
            let opc=true
            while(opc){
                switch (parseInt(Math.random()*(5)+1)){
                    case 1:
                        //impresora
                        process[0][8]="impresora"
                        opc=false
                        break
                    case 2:
                        //microfono
                        process[0][8]="microfono"
                        opc=false
                        break
                    case 3:
                        //altavoz
                        process[0][8]="altavoz"
                        opc=false
                        break
                    case 4:
                        //teclado
                        if(teclado==""){
                            process[0][8]="teclado"
                            teclado=process[0][0]
                            opc=false
                        }
                        break
                    case 5:
                        //mouse
                        if(mouse==""){
                            process[0][8]="mouse"
                            mouse=process[0][0]
                            opc=false
                        }
                        break
                    case 6:
                        //escaner
                        if(escaner==""){
                            process[0][8]="escaner"
                            escaner=process[0][0]
                            opc=false
                        }
                        break
                }
            }
        }else{
            process[0][1]="DETENIDO"
            stop.value+=" "+process[0][0];
        }
        process.push(process[0])
        process.shift()
        cola.value="";
        run.value="";
        llenarTabla()
        if(process.length!=0){
            for(i=0;i<process.length;i++){
                if(i==0){
                    run.value=process[i][0];
                    process[i][1]="EJECUTANDO";
                }else if(i==1 && process[i][1]!="DETENIDO" && process[i][1]!="ESPERA"){
                    cola.value=process[i][0];
                    process[i][1]="PREPARADO"
                }else if(process[i][1]!="DETENIDO" && process[i][1]!="ESPERA"){
                    cola.value+=" "+process[i][0];
                    process[i][1]="PREPARADO"
                }
            }
            llenarTabla();
            tim=process[0][5];
            time.innerHTML = tim;
            timeout=setTimeout("FIFO()",1000);
        }else{
            if(process.length=0){
                run.value+=process[0][0];
            }
            cola.value="";
        }
    }else if(tim==0){
        if(process[0][1]!="BLOQUEADO"){
            process[0][1]="FINALIZADO";
            if(final.value==""){
                final.value=process[0][0];
            }else{
                final.value+=" "+process[0][0];
            }
        }
        cola.value="";
        run.value="";
        count=0;
        process[0][2]="?";
        process[0][3]="?";
        process[0][4]="?";
        process[0][5]="?";
        process[0][6]="?";
        llenarTabla()
        process.shift();
        if(process.length!=0){
            for(i=0;i<process.length;i++){
                if(i==0){
                    run.value=process[i][0];
                    process[i][1]="EJECUTANDO";
                }else if(i==1){
                    cola.value=process[i][0];
                    process[i][1]="PREPARADO"
                }else{
                    cola.value+=" "+process[i][0];
                    process[i][1]="PREPARADO"
                }
            }
            llenarTabla();
            tim=process[0][5];
            time.innerHTML = tim;
            timeout=setTimeout("FIFO()",1000);
        }else{
            if(process.length=0){
                run.value+=process[0][0];
            }
            cola.value="";
        }
    }else if(process.length!=0){
        timeout=setTimeout("FIFO()",1000);
        }
}
function RoundRobin(){
    q=getQ();
    count++;
    tim=tim-1;
    process[0][5]=tim;
    time.innerHTML = tim;
    llenarTabla();
    prop= parseInt(Math.random()*99+1)
    if(prop<=prop_bloqueo && tim!=0 && process[0][6]>0){
        prop= parseInt(Math.random()*19+1)
        if(prop<=10){
            process[0][1]="ESPERA"
            sleep.value+=" "+process[0][0];
            let opc=true
            while(opc){
                switch (parseInt(Math.random()*(5)+1)){
                    case 1:
                        //impresora
                        process[0][8]="impresora"
                        opc=false
                        break
                    case 2:
                        //microfono
                        process[0][8]="microfono"
                        opc=false
                        break
                    case 3:
                        //altavoz
                        process[0][8]="altavoz"
                        opc=false
                        break
                    case 4:
                        //teclado
                        if(teclado==""){
                            process[0][8]="teclado"
                            teclado=process[0][0]
                            opc=false
                        }
                        break
                    case 5:
                        //mouse
                        if(mouse==""){
                            process[0][8]="mouse"
                            mouse=process[0][0]
                            opc=false
                        }
                        break
                    case 6:
                        //escaner
                        if(escaner==""){
                            process[0][8]="escaner"
                            escaner=process[0][0]
                            opc=false
                        }
                        break
                }
            }
        }else{
            process[0][1]="DETENIDO"
            stop.value+=" "+process[0][0];
        }
        process.push(process[0])
        process.shift()
        cola.value="";
        run.value="";
        count=0;
        llenarTabla()
        if(process.length!=0){
            for(i=0;i<process.length;i++){
                if(i==0){
                    run.value=process[i][0];
                    process[i][1]="EJECUTANDO";
                }else if(i==1 && process[i][1]!="DETENIDO" && process[i][1]!="ESPERA"){
                    cola.value=process[i][0];
                    process[i][1]="PREPARADO"
                }else if(process[i][1]!="DETENIDO" && process[i][1]!="ESPERA"){
                    cola.value+=" "+process[i][0];
                    process[i][1]="PREPARADO"
                }
            }
            llenarTabla();
            tim=process[0][5];
            time.innerHTML = tim;
            timeout=setTimeout("RoundRobin()",1000);
        }else{
            if(process.length=0){
                run.value+=process[0][0];
            }
            cola.value="";
        }
    }else if(tim==0){
        if(process[0][1]!="BLOQUEADO"){
            process[0][1]="FINALIZADO";
            if(final.value==""){
                final.value=process[0][0];
            }else{
                final.value+=" "+process[0][0];
            }
        }
        cola.value="";
        run.value="";
        count=0;
        process[0][2]="?";
        process[0][3]="?";
        process[0][4]="?";
        process[0][5]="?";
        process[0][6]="?";
        llenarTabla()
        process.shift();
        if(process.length!=0){
            for(i=0;i<process.length;i++){
                if(process[i][1]!="DETENIDO" && process[i][1]!="ESPERA"){
                    if(i==0){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO"
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO"
                    }
                }

            }
            llenarTabla();
            tim=process[0][5];
            time.innerHTML = tim;
            timeout=setTimeout("RoundRobin()",1000);
        }else{
            if(process.length=0){
                run.value+=process[0][0];
            }
            cola.value="";
        }
    }else if(count==q){
        count=0;
        if(process.length>1){
            process.push(process[0])
            process.shift()
            for(i=0;i<process.length;i++){
                if(process[i][1]!="DETENIDO" && process[i][1]!="ESPERA"){
                    if(i==0){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO"
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO"
                    }
                }
            }
            llenarTabla();
            tim=process[0][5];
            time.innerHTML = tim;
            timeout=setTimeout("RoundRobin()",1000);
        }else if(tim>0 && process.length>=1){
            count==0;
            timeout=setTimeout("RoundRobin()",1000);
        }
    }else if(tim>0 && process.length>=1){
        count==0;
        timeout=setTimeout("RoundRobin()",1000);
    }
    q=getQ();
}
function SJF(){
    tim=tim-1;
    process[0][5]=tim;
    time.innerHTML = tim;
    llenarTabla();
    prop= parseInt(Math.random()*99+1)
    if(prop<=prop_bloqueo && tim!=0 && process[0][6]>0){
        prop= parseInt(Math.random()*19+1)
        if(prop<=10){
            process[0][1]="ESPERA"
            sleep.value+=" "+process[0][0];
            let opc=true
            while(opc){
                switch (parseInt(Math.random()*(5)+1)){
                    case 1:
                        //impresora
                        process[0][8]="impresora"
                        opc=false
                        break
                    case 2:
                        //microfono
                        process[0][8]="microfono"
                        opc=false
                        break
                    case 3:
                        //altavoz
                        process[0][8]="altavoz"
                        opc=false
                        break
                    case 4:
                        //teclado
                        if(teclado==""){
                            process[0][8]="teclado"
                            teclado=process[0][0]
                            opc=false
                        }
                        break
                    case 5:
                        //mouse
                        if(mouse==""){
                            process[0][8]="mouse"
                            mouse=process[0][0]
                            opc=false
                        }
                        break
                    case 6:
                        //escaner
                        if(escaner==""){
                            process[0][8]="escaner"
                            escaner=process[0][0]
                            opc=false
                        }
                        break
                }
            }
        }else{
            process[0][1]="DETENIDO"
            stop.value+=" "+process[0][0];
        }
        process.push(process[0])
        process.shift()
        sort(5);
        cola.value="";
        run.value="";
        llenarTabla()
        if(process.length!=0){
            for(i=0;i<process.length;i++){
                if(process[i][1]=="PREPARADO"){
                    if(i==0){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO"
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO"
                        }
                }
            }
            llenarTabla();
            tim=process[0][5];
            time.innerHTML = tim;
            timeout=setTimeout("SJF()",1000);
        }else{
            if(process.length=0){
                run.value+=process[0][0];
            }
            cola.value="";
        }
    }else if(tim==0){
        if(process[0][1]!="BLOQUEADO"){
            process[0][1]="FINALIZADO";
            if(final.value==""){
                final.value=process[0][0];
            }else{
                final.value+=" "+process[0][0];
            }
        }
        cola.value="";
        run.value="";
        count=0;
        process[0][2]="?";
        process[0][3]="?";
        process[0][4]="?";
        process[0][5]="?";
        process[0][6]="?";
        llenarTabla()
        process.shift();
        sort(5);
        if(process.length!=0){
            for(i=0;i<process.length;i++){
                if(process[i][1]=="PREPARADO"){
                    if(i==0){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO"
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO"
                        }
                }
            }
            llenarTabla();
            tim=process[0][5];
            time.innerHTML = tim;
            timeout=setTimeout("SJF()",1000);
        }else{
            if(process.length=0){
                run.value+=process[0][0];
            }
            cola.value="";
        }
    }else if(process.length!=0){
        timeout=setTimeout("SJF()",1000);
        }
}
function Prioridad(){
    tim=tim-1;
    process[0][5]=tim;
    time.innerHTML = tim;
    llenarTabla();
    prop= parseInt(Math.random()*99+1)
    if(prop<=prop_bloqueo && tim!=0 && process[0][6]>0){
        prop= parseInt(Math.random()*19+1)
        if(prop<=10){
            process[0][1]="ESPERA"
            sleep.value+=" "+process[0][0];
            let opc=true
            while(opc){
                switch (parseInt(Math.random()*(5)+1)){
                    case 1:
                        //impresora
                        process[0][8]="impresora"
                        opc=false
                        break
                    case 2:
                        //microfono
                        process[0][8]="microfono"
                        opc=false
                        break
                    case 3:
                        //altavoz
                        process[0][8]="altavoz"
                        opc=false
                        break
                    case 4:
                        //teclado
                        if(teclado==""){
                            process[0][8]="teclado"
                            teclado=process[0][0]
                            opc=false
                        }
                        break
                    case 5:
                        //mouse
                        if(mouse==""){
                            process[0][8]="mouse"
                            mouse=process[0][0]
                            opc=false
                        }
                        break
                    case 6:
                        //escaner
                        if(escaner==""){
                            process[0][8]="escaner"
                            escaner=process[0][0]
                            opc=false
                        }
                        break
                }
            }
        }else{
            process[0][1]="DETENIDO"
            stop.value+=" "+process[0][0];
        }
        process.push(process[0])
        process.shift()
        sort(3);
        cola.value="";
        run.value="";
        llenarTabla()
        if(process.length!=0){
            for(i=0;i<process.length;i++){
                if(process[i][1]=="PREPARADO"){
                    if(i==0){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO"
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO"
                        }
                }
            }
            llenarTabla();
            tim=process[0][5];
            time.innerHTML = tim;
            timeout=setTimeout("Prioridad()",1000);
        }else{
            if(process.length=0){
                run.value+=process[0][0];
            }
            cola.value="";
        }
    }else if(tim==0){
        if(process[0][1]!="BLOQUEADO"){
            process[0][1]="FINALIZADO";
            if(final.value==""){
                final.value=process[0][0];
            }else{
                final.value+=" "+process[0][0];
            }
        }
        cola.value="";
        run.value="";
        count=0;
        process[0][2]="?";
        process[0][3]="?";
        process[0][4]="?";
        process[0][5]="?";
        process[0][6]="?";
        llenarTabla()
        process.shift();
        sort(3);
        if(process.length!=0){
            for(i=0;i<process.length;i++){
                if(process[i][1]=="PREPARADO"){
                    if(i==0){
                        run.value=process[i][0];
                        process[i][1]="EJECUTANDO";
                    }else if(i==1){
                        cola.value=process[i][0];
                        process[i][1]="PREPARADO"
                    }else{
                        cola.value+=" "+process[i][0];
                        process[i][1]="PREPARADO"
                        }
                }
            }
            llenarTabla();
            tim=process[0][5];
            time.innerHTML = tim;
            timeout=setTimeout("Prioridad()",1000);
        }else{
            if(process.length=0){
                run.value+=process[0][0];
            }
            cola.value="";
        }
    }else if(process.length!=0){
        timeout=setTimeout("Prioridad()",1000);
        }
}
//Funciones de apoyo
function bloquear(){
    if(process.length!=0){
        sleep.value=""
        stop.value=""
        for(i=0;i<process.length;i++){
            if(process[i][1]=="DETENIDO"){
                stop.value+=" "+process[i][0]
            }else if(process[i][1]=="ESPERA"){
                sleep.value+=" "+process[i][0]
            }
        }
        for(i=0;i<process.length;i++){
            if(process[i][1]=="DETENIDO" || process[i][1]=="ESPERA"){
                process[i][6]+=-1;
                if(process[i][6]<=0){
                    if(process[i][8]=="teclado"){
                        teclado=""
                    }else if(process[i][8]=="mouse"){
                        mouse=""
                    }else if(process[i][8]=="escaner"){
                        escaner=""
                    }
                    process[i][8]="X"
                    process[i][1]="PREPARADO"
                    }
                }
            }
        sleep.value=""
        stop.value=""
        for(i=0;i<process.length;i++){
            if(process[i][1]=="DETENIDO"){
                stop.value+=" "+process[i][0]
            }else if(process[i][1]=="ESPERA"){
                sleep.value+=" "+process[i][0]
            }
        }
        llenarTabla()
        timeout2=setTimeout("bloquear()",1000);
    }
}
function sort(n){
    process= process.sort(function(a,b) {
        return a[n] - b[n];
    });
}
function getQ(){
    if (bandQAuto){
        return process[0][7]
    }else{
        return document.getElementById("quantum").value;
    }
}