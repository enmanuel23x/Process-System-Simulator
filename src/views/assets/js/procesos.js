var _ = require('lodash');
var ps = require('current-processes');
var sorted
function read(){
ps.get(function(err, processes) {
    
    var html=''
    var record=''
    var arrpid = []
    var arrcpu = []
    var arrmem1= []
    var arrmem2= []
    var count = 0,cp=0,mem=0,memp=0
    sorted = _.sortBy(processes, 'name');
    console.log(sorted)
    console.log("yes")
    for (var i = 0; i < sorted.length; i++) {
        if(record!=sorted[i].name){
            
            if(count==1){
                console.log("cast")
                    html += '<tr class="breakrow">';
                    html += '<td>';
                    html += record;
                    html += '</td>';
                    html += '<td>';
                    html += arrpid[0];
                    html += '</td>';
                    html += '<td>';
                    html += arrcpu[0];
                    html += '</td>';
                    html += '<td>';
                    html += arrmem1[0];
                    html += '</td>';
                    html += '<td>';
                    html += arrmem2[0];
                    html += '</td>';
                    html += '</tr>';
            }else if(count>1){
                html += '<tr class="breakrow">';
                html += '<td>';
                html += record;
                html += '</td>';
                html += '<td style="color:rgb(50,50,50)">empty '; 
                html += '</td>';
                html += '<td>';
                html += cp
                html += '</td>';
                html += '<td>';
                html += memp
                html += '</td>';
                html += '<td>';
                html += mem
                html += '</td>';
                html += '</tr>';
                for (var j = 0; j < count; j++) {
                    html += '<tr class="datarow">';
                    html += '<td>';
                    html += record;
                    html += '</td>';
                    html += '<td>';
                    html += arrpid[j];
                    html += '</td>';
                    html += '<td>';
                    html += arrcpu[j];
                    html += '</td>';
                    html += '<td>';
                    html += arrmem1[j];
                    html += '</td>';
                    html += '<td>';
                    html += arrmem2[j];
                    html += '</td>';
                    html += '</tr>';
                }
            }
        
        record=sorted[i].name
        arrpid = []
        arrcpu = []
        arrmem1= []
        arrmem2= []
        count = 0
        cp=0
        mem=0
        memp=0
        if(count==0){
                count+=1;
            arrpid.push(sorted[i].pid);
            arrcpu.push(sorted[i].cpu);
            cp+=sorted[i].cpu;
            mem+=sorted[i].mem.private/(1024*1024);
            memp+=Math.round(sorted[i].mem.usage);
            arrmem1.push(Math.round(sorted[i].mem.usage));
            arrmem2.push(sorted[i].mem.private/(1024*1024));
            }
        }else if(record!=sorted[i+1].name && count==0){
        }else{
            count+=1;
            arrpid.push(sorted[i].pid);
            arrcpu.push(sorted[i].cpu);
            cp+=sorted[i].cpu;
            mem+=sorted[i].mem.private/(1024*1024);
            memp+=Math.round(sorted[i].mem.usage);
            arrmem1.push(Math.round(sorted[i].mem.usage));
            arrmem2.push(sorted[i].mem.private/(1024*1024));
       
        }
    }
    document.getElementById('bodyTable').innerHTML = html;
    /*console.log(sorted[sorted.length-1]);
    console.log(sorted[sorted.length-1].cpu);
    console.log("yes")*/
});
setTimeout("re()",1000);
}
read() 