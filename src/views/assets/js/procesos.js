var _ = require('lodash');
var ps = require('current-processes');
var sorted
var arr=[]
async function read(){
    arr=[]
sorted=[]
const si = require('systeminformation');
// promises style - new since version 3
l = await si.processes()
l=l.list

l = _.sortBy(l, 'pid');
    const psaux =require('psaux')
	psaux().then(list2 => {
        list2=_.sortBy(list2, 'pid');
        count=0;
        count=0
	    for(i=0;i<list2.length;i++){
                for(k=0;k<l.length;k++){
                    if(list2[i].pid==l[k].pid){
                        if(list2[i].stat!=undefined){
                        arr.push([list2[i].name,list2[i].pid,list2[i].stat,l[k].pcpu,l[k].pmem])
                        }else{
                            arr.push([list2[i].name,list2[i].pid,'?',l[k].pcpu,l[k].pmem])
                        }
                        break
                    }else if(k==l.length-1){
                        if(list2[i].stat!=undefined){
                            arr.push([list2[i].name,list2[i].pid,list2[i].stat,'?','?'])
                        }else{
                            arr.push([list2[i].name,list2[i].pid,'?','?','?'])
                            }
                        }
                }
                
            }
        html=''
        
    for (var i = 0; i < arr.length; i++) {
                    html += '<tr class="breakrow">';
                    html += '<td>';
                    html += arr[i][0];
                    html += '</td>';
                    html += '<td>';
                    html += arr[i][1];
                    html += '</td>';
                    html += '<td>';
                    html += arr[i][2];
                    html += '</td>';
                    html += '<td>';
                    html += arr[i][3];
                    html += '</td>';
                    html += '<td>';
                    if(arr[i][4]!="?"){
                        html += Math.round(parseFloat(arr[i][4])*10000)/100;
                    }else{
                        html += arr[i][4]
                    }
                    
                    html += '</td>';
                    html += '</tr>';
    }
    document.getElementById('bodyTable').innerHTML = html;
    document.getElementById('prop').innerHTML = arr.length;
    if(arr.length!=0){
        writediagram()
        }
setTimeout("read()",5000);
});
}
function writediagram(){
    d_x= document.getElementById('dead')
    sl= document.getElementById('sleep')
    r= document.getElementById('run')
    st= document.getElementById('stop')
    id= document.getElementById('idle')
    sleep_i=0;
    sleep_n=0;
    dead=0;
    zombie=0;
    run=0;
    stoped=0;
    idle=0;
    unknown=0;
    for (var i = 0; i < arr.length; i++) {
            switch ((""+arr[i][2]).charAt(0)){
                case "D":
                    sleep_n+=1;
                    break;
                case "S":
                    sleep_i+=1;
                    break;
                case "R":
                    run+=1;
                    break;
                case "T":
                    stoped+=1;
                    break;
                case "X":
                    dead+=1;
                    break;
                case "Z":
                    zombie+=1;
                    break;
                case "I":
                    idle+=1;
                    break;
                default:
                    unknown+=1;
                    break;
            }
        }
    d_x.value="Muertos: "+dead+"\nZombie: "+zombie
    sl.value="Interrumpibles: "+sleep_i+"\nNo interrumpibles: "+sleep_n
    r.value="Ejecucion/Cola: "+run
    st.value="Detenidos: "+stoped
    id.value="Inactivos: "+idle+"\nDesconocidos: "+unknown
}
band_change=true;
function change(){
    document.getElementById('list').disabled=!band_change
    document.getElementById('diag').disabled=band_change
    if(band_change){
    document.getElementById('table2').style.display='none';
    document.getElementById('diagrama').style.display='block';
    }else{
        document.getElementById('table2').style.display='block';
        document.getElementById('diagrama').style.display='none';
        }
        band_change=!band_change
}
read() 