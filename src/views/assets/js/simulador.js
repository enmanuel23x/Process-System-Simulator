var prev='';
var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];
var process=[];
var tim=0;
var time=document.getElementById("time");
var prep=document.getElementById("preparados");
var exec=document.getElementById("ejecutando");
var bloq=document.getElementById("bloqueados");
var final=document.getElementById("finalizados");
var q=document.getElementById("quantum").value;
var count=0;
var timeout="";
document.getElementById("parar").disabled = true;
document.getElementById("pausar").disabled = true;
document.getElementById("continuar").disabled = true;
document.getElementById("matar").disabled = true;
var bandbutton=true;
//evento tabla
tbody.onclick = function (e) {
    e = e || window.event;
    var data = [];
    var target = e.srcElement || e.target;
    if(prev!=""){
        
        if(prev.style.backgroundColor == "cyan"){
            RellenarTabla();
        }
    }
   
    if(prev==e.path[1]){
        RellenarTabla();
    }else{
        RellenarTabla();
        e.path[1].style.backgroundColor = "cyan";
        prev=e.path[1];
        for(i=0;i<tbody.rows.length;i++){
            if(e.path[1].rowIndex==(i+1)){
                if(tbody.rows[i].cells[2].innerHTML=="EJECUTANDO"){
                    document.getElementById("matar").disabled = false;
                }else{
                    document.getElementById("matar").disabled = true;
                }
            }
        
        }
    }
    while (target && target.nodeName !== "TR") {
        
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("td");
        for (var i = 0; i < cells.length; i++) {
            data.push(cells[i].innerHTML);
        }
    }
};
//eventos botones
function parar(){
    document.getElementById("parar").disabled = true;
    document.getElementById("time").innerHTML=0;
    document.getElementById("pausar").disabled = true;
    document.getElementById("continuar").disabled = true;
    clearTimeout(timeout);
    exec.value="";
    prep.value="";
    for (i=0;i<process.length;i++){
        if(process[i][1]!="BLOQUEADO" && process[i][1]!="FINALIZADO"){
            tim=1;
            process[i][2]="BLOQUEADO";
            if(bloq.value==""){
                bloq.value=process[i][1];
            }else{
                bloq.value+=" "+process[i][1]; 
            }
            
        }
    }
    llenarTabla();
}
function matar(){
    document.getElementById("pausar").style.display="inline-block";
    document.getElementById("continuar").style.display="none";
    document.getElementById("pausar").disabled = !true;
    document.getElementById("continuar").disabled = true;
    document.getElementById("matar").disabled = true;
    clearTimeout(timeout);
    if(process[0][1]!="BLOQUEADO" && process[0][1]!="FINALIZADO"){
        tim=1;
        process[0][2]="BLOQUEADO";
        if(bloq.value==""){
            bloq.value=process[0][1];
        }else{
            bloq.value+=" "+process[0][1]; 
        }
        llenarTabla();
    }else{
        alert("No se puede matar este proceso")
    }
    let metodo= document.getElementById("metodos");
    metodo=metodo.options[metodo.selectedIndex].value;
    switch(metodo) {
            //FIFO
            case "0":
                timeout=setTimeout("FIFO()",1000);
                break;
            //Round Robin
            case "1":
                timeout=setTimeout("RoundRobin()",1000);
                break;
            //Prioridad
            case "2":
                timeout=setTimeout("Prioridad()",1000);
                break;
            //SJF
            case "3":
                timeout=setTimeout("SFJ()",1000);
                break;
        }
}
function iniciar(){
    if(tbody.rows.length==0){
        alert("Lista sin procesos")
    }else{
        bloqbutton()
        let metodo= document.getElementById("metodos");
        metodo=metodo.options[metodo.selectedIndex].value;
        let band=0,cont2=0;
        let ejec=[];
        switch(metodo) {
            //FIFO
            case "0":
                process= process.sort(function(a,b) {
                    return a[3] - b[3];
                });
                console.log(process)
                for(i=0;i<process.length;i++){
                    if(i<1){
                        exec.value=process[i][1];
                        process[i][2]="EJECUTANDO";
                    }else if(i==1){
                        prep.value=process[i][1];
                        process[i][2]="PREPARADO";
                    }else{
                        prep.value+=" "+process[i][1];
                        process[i][2]="PREPARADO";
                    }
                }
                llenarTabla();
                document.getElementById("time").innerHTML=process[0][6];
                tim=process[0][6];
                
                timeout=setTimeout("FIFO()",1000);
                break;
            //Round Robin
            case "1":
                process= process.sort(function(a,b) {
                    return a[3] - b[3];
                });
                for(i=0;i<process.length;i++){
                    if(i==0){
                        exec.value=process[i][1];
                        process[i][2]="EJECUTANDO";
                    }else if(i==1){
                        prep.value=process[i][1];
                        process[i][2]="PREPARADO";
                    }else{
                        prep.value+=" "+process[i][1];
                        process[i][2]="PREPARADO";
                    }
                }
                llenarTabla();
                document.getElementById("time").innerHTML=process[0][6];
                tim=process[0][6];
                
                timeout=setTimeout("RoundRobin()",1000);
                break;
            //Prioridad
            case "2":
                process= process.sort(function(a,b) {
                    return a[4] - b[4];
                });
                for(i=0;i<process.length;i++){
                    if(i==0){
                        exec.value=process[i][1];
                        process[i][2]="EJECUTANDO";
                    }else if(i==1){
                        prep.value=process[i][1];
                        process[i][2]="PREPARADO";
                    }else{
                        prep.value+=" "+process[i][1];
                        process[i][2]="PREPARADO";
                    }
                }
                llenarTabla();
                document.getElementById("time").innerHTML=process[0][6];
                tim=process[0][6];
                timeout=setTimeout("Prioridad()",1000);

                break;
            //SFJ
            case "3":
            process= process.sort(function(a,b) {
                    return a[6] - b[6];
                });
                for(i=0;i<process.length;i++){
                    if(i==0){
                        exec.value=process[i][1];
                        process[i][2]="EJECUTANDO";
                    }else if(i==1){
                        prep.value=process[i][1];
                        process[i][2]="PREPARADO";
                    }else{
                        prep.value+=" "+process[i][1];
                        process[i][2]="PREPARADO";
                    }
                }
                llenarTabla();
                document.getElementById("time").innerHTML=process[0][6];
                tim=process[0][6];
                timeout=setTimeout("SFJ()",1000);
                break;
        }
    }
}
function cargar(){
    var fs=require('fs');
    var data=fs.readFileSync('./src/views/assets/js/data.json', 'utf8');
    var words=JSON.parse(data);
    html='';
    let p=[]
    process=[]
    for (var i = 0; i < words.length; i++) {
        p=[]
        p.push(words[i].nombre)
        p.push(words[i].pid)
        p.push(words[i].estado)
        p.push(words[i].llegada)
        p.push(words[i].prioridad)
        p.push(words[i].memoria)
        p.push(words[i].tiempo)
        process.push(p)
        html += '<tr>';
        html += '<td>';
        html += words[i].nombre;
        html += '</td>';
        html += '<td>';
        html += words[i].pid;
        html += '</td>';
        html += '<td id="'+i+'">';
        html += words[i].estado;
        html += '</td>';
        html += '<td>';
        html += words[i].llegada;
        html += '</td>';
        html += '<td>';
        html += words[i].prioridad;
        html += '</td>';
        html += '<td>';
        html += words[i].memoria;
        html += '</td>';
        html += '<td>';
        html += words[i].tiempo;
        html += '</td>';
        html += '</tr>';
    }
    console.log(process)
    document.getElementById('bodyTable').innerHTML = html;
}
function bloqbutton(){
        document.getElementById("parar").disabled = !bandbutton;
        document.getElementById("pausar").disabled = !bandbutton;
        document.getElementById("continuar").disabled = !bandbutton;
        document.getElementById("cargar").disabled = bandbutton;
        document.getElementById("metodos").disabled = bandbutton;
        document.getElementById("iniciar").disabled = bandbutton;
        bandbutton=!bandbutton;
}
function pausar(){
    clearTimeout(timeout);
    document.getElementById("pausar").disabled = true;
    document.getElementById("pausar").style.display="none";
    document.getElementById("continuar").disabled = !true;
    document.getElementById("continuar").style.display="inline-block";
}
function continuar(){
    document.getElementById("pausar").style.display="inline-block";
    document.getElementById("continuar").style.display="none";
    document.getElementById("pausar").disabled = !true;
    document.getElementById("continuar").disabled = true;
    let metodo= document.getElementById("metodos");
    metodo=metodo.options[metodo.selectedIndex].value;
    switch(metodo) {
            //FIFO
            case "0":
                timeout=setTimeout("FIFO()",1000);
                break;
            //Round Robin
            case "1":
                timeout=setTimeout("RoundRobin()",1000);
                break;
            //Prioridad
            case "2":
                timeout=setTimeout("Prioridad()",1000);
                break;
            //SJF
            case "3":
                timeout=setTimeout("SFJ()",1000);
                break;
        }
}
//llenado de tabla(colores)
function RellenarTabla(){
    let color="";
        for(i=0;i<tbody.rows.length;i++){
            switch(tbody.rows[i].cells[2].innerHTML){
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
    let color="",pos;
    for(j=0;j<process.length;j++){
        pos=-1;
        for(i=0;i<tbody.rows.length;i++){
            if(tbody.rows[i].cells[1].innerHTML==process[j][1]){
                pos=i;break;
            }
        }
        switch(process[j][2]){
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
        }
        if(pos>-1){
            tbody.rows[pos].cells[2].innerHTML=process[j][2];
            tbody.rows[pos].cells[3].innerHTML=process[j][3];
            tbody.rows[pos].cells[4].innerHTML=process[j][4];
            tbody.rows[pos].cells[6].innerHTML=process[j][6];
            if(tbody.rows[pos].style.backgroundColor!="cyan"){
                tbody.rows[pos].style.backgroundColor=color;
            }
        }
    }
}
//metodos de gestion de procesos
function RoundRobin(){
    count++;
    tim=tim-1;
    process[0][6]=tim;
    time.innerHTML = tim;
    llenarTabla();
    if(tim==0){
        if(process[0][2]!="BLOQUEADO"){
                process[0][2]="FINALIZADO";
                if(final.value==""){
                    final.value=process[0][1];
                }else{
                    final.value+=" "+process[0][1];
                }
            }
            prep.value="";
            exec.value="";
            count=0;
            process[0][3]=-1;
            process[0][4]=-1;
            process[0][6]=0;
            llenarTabla()
            process.shift();
            if(process.length!=0){
                for(i=0;i<process.length;i++){
                    process[i][3]=i;
                    if(i==0){
                        exec.value=process[i][1];
                        process[i][2]="EJECUTANDO";
                    }else if(i==1){
                        prep.value=process[i][1];
                        process[i][2]="PREPARADO"
                    }else{
                        prep.value+=" "+process[i][1];
                        process[i][2]="PREPARADO"
                    }
                }
                llenarTabla();
                tim=process[0][6];
                time.innerHTML = tim;
                timeout=setTimeout("RoundRobin()",1000);
            }else{
                exec.value+=process[0][1];
                prep.value="";
            }
    }else if(count==q){
        count=0;
        if(process.length>1){
            for(i=0;i<process.length;i++){
                process[i][3]=i-1;
                if(i==0){
                    process[i][3]=process.length-1;
                    process[i][6]=tim;
                    process[i][2]="PREPARADO"
                }else if(i==1){
                    process[i][2]="EJECUTANDO";
                    exec.value=process[i][1];
                }else if(i==2){
                    prep.value=process[i][1];
                    process[i][2]="PREPARADO"
                }else{
                    prep.value+=" "+process[i][1];
                    process[i][2]="PREPARADO"
                }
            }
            prep.value+=" "+process[0][1];
            process= process.sort(function(a,b) {
                return a[3] - b[3];
            });
            llenarTabla();
            tim=process[0][6];
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
    
}
function FIFO() {
    tim=tim-1;
    time.innerHTML = tim;
    process[0][6]=tim;
    llenarTabla();
    if(tim==0){
        if(process[0][2]!="BLOQUEADO"){
                process[0][2]="FINALIZADO";
                if(final.value==""){
                    final.value=process[0][1];
                }else{
                    final.value+=" "+process[0][1];
                }
            }
            prep.value="";
            exec.value="";
            count=0;
            process[0][3]=-1;
            process[0][4]=-1;
            process[0][6]=0;
            llenarTabla()
            process.shift();
            if(process.length!=0){
                for(i=0;i<process.length;i++){
                    process[i][3]=i;
                    if(i<1){
                        exec.value=process[i][1];
                        process[i][2]="EJECUTANDO";
                    }else if(i==1){
                        prep.value=process[i][1];
                        process[i][2]="PREPARADO"
                    }else{
                        prep.value+=" "+process[i][1];
                        process[i][2]="PREPARADO"
                    }
                }
                llenarTabla();
                tim=process[0][6];
                time.innerHTML = tim;
                timeout=setTimeout("FIFO()",1000);
            }else{
                exec.value+=process[0][1];
                prep.value="";
            }
    }else if(process.length!=0){
        timeout=setTimeout("FIFO()",1000);
    }
}
function SFJ(){
    tim=tim-1;
    time.innerHTML = tim;
    process[0][6]=tim;
    llenarTabla();
    if(tim==0){
        if(process[0][2]!="BLOQUEADO"){
                process[0][2]="FINALIZADO";
                if(final.value==""){
                    final.value=process[0][1];
                }else{
                    final.value+=" "+process[0][1];
                }
            }
            prep.value="";
            exec.value="";
            count=0;
            process[0][3]=-1;
            process[0][4]=-1;
            process[0][6]=0;
            llenarTabla()
            process.shift();
            if(process.length!=0){
                for(i=0;i<process.length;i++){
                    if(i==0){
                        exec.value=process[i][1];
                        process[i][2]="EJECUTANDO";
                    }else if(i==1){
                        prep.value=process[i][1];
                        process[i][2]="PREPARADO"
                    }else{
                        prep.value+=" "+process[i][1];
                        process[i][2]="PREPARADO"
                    }
                }
                llenarTabla();
                tim=process[0][6];
                time.innerHTML = tim;
                timeout=setTimeout("SFJ()",1000);
            }else{
                exec.value+=process[0][1];
                prep.value="";
            }
    }else if(process.length!=0){
        timeout=setTimeout("SFJ()",1000);
    }
}
function Prioridad(){
    tim=tim-1;
    time.innerHTML = tim;
    process[0][6]=tim;
    llenarTabla();
    if(tim==0){
        if(process[0][2]!="BLOQUEADO"){
                process[0][2]="FINALIZADO";
                if(final.value==""){
                    final.value=process[0][1];
                }else{
                    final.value+=" "+process[0][1];
                }
            }
            prep.value="";
            exec.value="";
            count=0;
            process[0][3]=-1;
            process[0][4]=-1;
            process[0][6]=0;
            llenarTabla()
            process.shift();
            if(process.length!=0){
                for(i=0;i<process.length;i++){
                    process[i][4]=i;
                    if(i==0){
                        exec.value=process[i][1];
                        process[i][2]="EJECUTANDO";
                    }else if(i==1){
                        prep.value=process[i][1];
                        process[i][2]="PREPARADO"
                    }else{
                        prep.value+=" "+process[i][1];
                        process[i][2]="PREPARADO"
                    }
                }
                llenarTabla();
                tim=process[0][6];
                time.innerHTML = tim;
                timeout=setTimeout("Prioridad()",1000);
            }else{
                exec.value+=process[0][1];
                prep.value="";
            }
    }else if(process.length!=0){
        timeout=setTimeout("Prioridad()",1000);
    }
}