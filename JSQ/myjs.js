
$(document).ready(function(){
    let myCanvas = document.getElementById("myCanvas").getContext("2d");


    $.getJSON("https://api.covid19api.com/summary",function(data){


    
        for (let index_2 = 0; index_2 < data.Countries.length; index_2++) {
            var element = data.Countries[index_2].Country;
            //console.log("<option >"+element.toLowerCase().replace(" ","-")+"</option>");
            $("#country_selector").append("<option >"+element+"</option>");
            
            
        };
    
    
    
        //https://api.covid19api.com/total/dayone/country/south-africa/status/confirmed
    
        
    
    
    
    
        
        
    
            $("#btn3").click(function(){
                let country_name = $("#country_selector").val();
                console.log(country_name.toLowerCase().replace(" ","-"));
    
                let graph_selection= $("#graph_selector").val();
                if(graph_selection == "Confirmed Cases"){
                    var choice = "confirmed";
    
                }
                else if(graph_selection == "Deaths"){
                    var choice = "deaths";
    
                }
                else{
                    var choice = "recovered";
                }
                
    
                for (let index = 0; index < data.Countries.length; index++){
                    //console.log(country_name + " " + data.Countries[index].Country);
                    if(country_name == data.Countries[index].Country ){
                        
                        let tr = data.Countries[index];
                        let tr_new = tr.NewConfirmed;
                        let tr_total = tr.TotalConfirmed;
                        let tr_new_d = tr.NewDeaths;
                        let tr_total_d = tr.TotalDeaths;
                        let tr_new_rc = tr.NewRecovered;
                        let tr_total_rc = tr.TotalRecovered;
    
    
                        $(document).ready(function () {
                            $("h1").text(tr.Country);
                        });
    
                        $(document).ready(function () {
                            $("#new_con").text("New Cases: "+tr_new);
                        });
    
                        $(document).ready(function () {
                            $("#total_con").text("Total Cases: "+tr_total);
                        });
    
                        $(document).ready(function () {
                            $("#new_d").text("New Deaths: "+tr_new_d);
                        });
    
                        $(document).ready(function () {
                            $("#total_d").text("Total Deaths: "+tr_total_d);
                        });
    
                        $(document).ready(function () {
                            $("#new_rc").text("New Recovered: "+ tr_new_rc);
                        });
    
                        $(document).ready(function () {
                            $("#total_rc").text("Total Recovered: "+tr_total_rc);
                        });  
                        
                        $.getJSON("https://api.covid19api.com/total/dayone/country/"+country_name.toLowerCase().replace(" ","-") +"/status/"+choice,function(sec_data){
    
                            var xs = [];
                            var ys = [];
                            for (let index = 0; index < sec_data.length; index++) {
                                const element = sec_data[index].Cases;
                                ys.push(element);
                                xs.push(index+1)
                                
                            };
    
                            console.log(""+xs+" "+ys);
                                                        

                         
                        
                            //console.log("this world: "+sec_data[0].Cases);
                        
                        
                        if(myChart != undefined){

                            myChart.destroy();
                            console.log("oldu");
                        };
                            
                        
                        var myChart = new Chart(myCanvas, {
                            type: 'line',
                            
                            data: {
                                labels: xs,
                                datasets: [{
                                    label: 'Total ' + graph_selection,
                                    data: ys,
                                    pointRadius: 1.7,
                                    backgroundColor: "rgb(122, 161, 173)",
                                    borderColor: "rgb(47, 72, 234)",
                                        
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                                 
                            }
                        });
                        
    
                        });

                       
            
                        
            
            
                        
                        break;}
                };
                
                    
                    
                });
               
    });
    
    
});
