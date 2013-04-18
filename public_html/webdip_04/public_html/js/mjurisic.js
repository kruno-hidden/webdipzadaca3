/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    $('input[value=xml]').on('click',function(){
       var poruka = '<div id="poruka" title="TODO"><p>Ovo cemo rijesiti doma</p></div>';
       $('#content').html(poruka);
       $('#poruka').dialog({
           show:{effect:'bounce', duration:2000},
           hide:{effect:'explode',duration:1000}
       });
    });
    
    $('#json').click(function(){
        $.getJSON('podaci/korisnici.json', function(data){
            var tablica = $('<table id="tablica">');
            tablica.append('<thead><tr><th>Ime</th><th>Prezime</th><th>Email</th></tr></thead>');
            var tbody = $('<tbody>');
            for(i = 0; i < data.length; i++) {
                tbody.append('<tr><td>' + data[i].ime + '</td><td>' + data[i].prezime+'</td><td>'+data[i].email+'</td></tr>')  ;              
            }
            tablica.append(tbody);
            $('#content').html(tablica);
            $('#tablica').dataTable();
        });
    });
});
