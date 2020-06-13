$(document).ready(function(){
    let myCanvas = document.getElementById("myCanvas").getContext("2d");
  
    let myChart = new Chart(myCanvas, {
                                    type: 'line',
                                    
                                    data: {
                                        labels: [],
                                        datasets: []
                                    },
                                    options: {
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        }
                                         
                                    }
                                });
        


    $.getJSON("https://api.covid19api.com/summary",function(data){

    
        for (let index_2 = 0; index_2 < data.Countries.length; index_2++) {
            var element = data.Countries[index_2].Country;
            //console.log("<option class="text-dark">"+element.toLowerCase().replace(" ","-")+"</option>");
            $("#country_selector").append("<option class='text-white bg-dark'>"+element+"</option>");
            
            
        };
    
    
    
        //https://api.covid19api.com/total/dayone/country/south-africa/status/confirmed
        
    
            $("#btn3").click(function(){
                
                let country_name = $("#country_selector").val();
                //console.log(country_name.toLowerCase().replace(" ","-"));
    
                let graph_selection= $("#graph_selector").val();
                if(graph_selection == "Confirmed Cases"){
                    var choice = "confirmed";
    
                }
                else if(graph_selection == "Deaths"){
                    var choice = "deaths";
    
                }
                else if(graph_selection == "Recovered"){
                    var choice = "recovered";
                }

                else if(graph_selection == "Active Cases"){
                    var choice = "active";
                }
                else{
                    var choice = "all";
                }
                

                let hist_selection= $("#hist_selector").val();
                if(hist_selection == "Daily"){
                    var hist_choice = "daily";
    
                }
                
                else{
                    var hist_choice = "cumulative";
                };
    
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
                        let tr_active = tr_total-tr_total_rc-tr_total_d;

                        
    
    
                        $(document).ready(function () {
                            $("h2").text(tr.Country);
                        });

                        $(document).ready(function () {
                            $("#active_con").text("Active Cases: "+tr_active);
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

                        //summary done, let's do graph:

                        if (choice == "all") {
                            $.getJSON("https://api.covid19api.com/total/dayone/country/"+country_name.toLowerCase().replace(" ","-"),function(sec_data){
    
                            
                            var xs = [];
                            var cum_cases = [];
                            var daily_cases = [];

                            var cum_deaths = [];
                            var daily_deaths = [];

                            var cum_rec = [];
                            var daily_rec = [];

                            let cum_active = [];

                            for (let index = 0; index < sec_data.length; index++) {
                                const element = sec_data[index];
                                
                                xs.push(index+1)
                                
                            };

                      
                            for (let index = 0; index < sec_data.length; index++) {
                                const element = sec_data[index].Confirmed;
                                cum_cases.push(element);
                               
                                
                            };

                            for (let index = 0; index < sec_data.length; index++) {
                                const element = sec_data[index].Deaths;
                                cum_deaths.push(element);
                               
                                
                            };

                            for (let index = 0; index < sec_data.length; index++) {
                                const element = sec_data[index].Recovered;
                                cum_rec.push(element);
                               
                                
                            };


                            for (let index = 0; index < cum_cases.length; index++) {
                                        const element = cum_cases[index+1] - cum_cases[index] ;
                                        daily_cases.push(element);
                                        
                                    };
                            
                            for (let index = 0; index < cum_deaths.length; index++) {
                                        const element = cum_deaths[index+1] - cum_deaths[index] ;
                                        daily_deaths.push(element);
                                        
                            }; 

                            for (let index = 0; index < cum_rec.length; index++) {
                                        const element = cum_rec[index+1] - cum_rec[index] ;
                                        daily_rec.push(element);
                                        
                                    };
                            
                            for (let index = 0; index < cum_cases.length; index++) {
                                const element = cum_cases[index] - cum_rec[index] - cum_deaths[index];
                                cum_active.push(element);
                                
                            };
                            console.log("daily_rec");

                            //console.log(""+xs+" "+ys);
                            //console.log(daily_ys);
                            //console.log("this world: "+sec_data[0].Cases);
                            //console.log("daily lenght: "+daily_ys.length); 
                            //console.log("cumulativelenght: "+ys.length);

                        if (hist_choice == "daily") {
                            myChart.data.labels = xs;


                            let all_daily_data = [{
                                            label: 'Daily Cases',
                                            data: daily_cases,
                                            pointRadius: 0,
                                            borderColor: "rgb(47, 72, 234)",   
                                            borderWidth: 1
                                        },{
                                            label: 'Daily Deaths',
                                            data: daily_deaths,
                                            pointRadius: 0,
                                            borderColor: "rgb(138, 43, 226)",   
                                            borderWidth: 1
                                        },{
                                            label: 'Daily Recoveries ',
                                            data: daily_rec,
                                            pointRadius: 0,
                                            borderColor: "rgb(200, 89, 55)",   
                                            borderWidth: 1
                                        }]


                            myChart.data.datasets = all_daily_data;
                            
                            
                            myChart.update();
                            
                        } else {
                            myChart.data.labels = xs;
                            
                            let all_cum_data = [{
                                            label: 'Total Cases',
                                            data: cum_cases,
                                            pointRadius: 0,
                                            borderColor: "rgb(47, 72, 234)",   
                                            borderWidth: 1
                                        },{
                                            label: 'Total Deaths',
                                            data: cum_deaths,
                                            pointRadius: 0,
                                            borderColor: "rgb(138, 43, 226)",   
                                            borderWidth: 1
                                        },{
                                            label: 'Total Recoveries ',
                                            data: cum_rec,
                                            pointRadius: 0,
                                            borderColor: "rgb(200, 89, 55)",   
                                            borderWidth: 1
                                        },{
                                            label: 'Active Cases',
                                            data: cum_active,
                                            pointRadius: 0,
                                            borderColor: "rgb(256, 17, 95)",   
                                            borderWidth: 1
                                        }]
                            
                            myChart.data.datasets = all_cum_data;
                        
                            myChart.update();
                        };

                    });

    
                        } else {

                            if (choice == "active" && hist_choice == "daily" ) {
                                alert("'Active Cases' can only be demostrated in Cumulative Mode");
                            
                            } else if(choice != "active" ){
                                
                            
                            $.getJSON("https://api.covid19api.com/total/dayone/country/"+country_name.toLowerCase().replace(" ","-") +"/status/"+choice,function(sec_data){
    

                                    var xs = [];
                                    var ys = [];
                                    var daily_ys = [];

                                    for (let index = 0; index < sec_data.length; index++) {
                                        const element = sec_data[index].Cases;
                                        ys.push(element);
                                        xs.push(index+1)
                                        
                                    };

                                    for (let index = 0; index < ys.length; index++) {
                                        const element = ys[index+1] - ys[index] ;
                                        daily_ys.push(element);
                                        
                                    };

                                    //console.log(""+xs+" "+ys);
                                    //console.log(daily_ys);
                                    //console.log("this world: "+sec_data[0].Cases);
                                    //console.log("daily lenght: "+daily_ys.length); 
                                    //console.log("cumulativelenght: "+ys.length);


                                if (hist_choice == "daily") {
                                    myChart.data.labels = xs;
                                    

                                    let all_cum_data = [{
                                            label: 'Daily ' + graph_selection,
                                            data: daily_ys,
                                            pointRadius: 0,
                                            borderColor: "rgb(33, 153, 61)",   
                                            borderWidth: 1
                                        }];
                                    
                                    myChart.data.datasets = all_cum_data;
                                    
                                    myChart.update();
                                    
                                } else {
                                    myChart.data.labels = xs;
                                   
                                    
                                    let all_cum_data = [{
                                            label: 'Total ' + graph_selection,
                                            data: ys,
                                            pointRadius: 0,
                                            borderColor: "rgb(47, 72, 234)",   
                                            borderWidth: 1
                                        }];
                                    
                                    myChart.data.datasets = all_cum_data;

                                
                                    myChart.update();
                                };

                            });
                            }else{
                                
                                $.getJSON("https://api.covid19api.com/total/dayone/country/"+country_name.toLowerCase().replace(" ","-"),function(thir){
                                    var xs = [];
                                    var cum_cases = [];
                                    var daily_cases = [];

                                    var cum_deaths = [];
                                    var daily_deaths = [];

                                    var cum_rec = [];
                                    var daily_rec = [];

                                    let cum_active = [];

                                    for (let index = 0; index < thir.length; index++) {
                                        const element = thir[index];
                                        
                                        xs.push(index+1)
                                        
                                    };

                            
                                    for (let index = 0; index < thir.length; index++) {
                                        const element = thir[index].Confirmed;
                                        cum_cases.push(element);
                                    
                                        
                                    };

                                    for (let index = 0; index < thir.length; index++) {
                                        const element = thir[index].Deaths;
                                        cum_deaths.push(element);
                                    
                                        
                                    };

                                    for (let index = 0; index < thir.length; index++) {
                                        const element = thir[index].Recovered;
                                        cum_rec.push(element);
                                    
                                        
                                    };

                                    for (let index = 0; index < cum_cases.length; index++) {
                                        const element = cum_cases[index] - cum_rec[index] - cum_deaths[index];
                                        cum_active.push(element);
                                        
                                    };

                                    myChart.data.labels = xs;
                                    

                                    let all_cum_data = [{
                                            label: 'Active Cases',
                                            data: cum_active,
                                            pointRadius: 0,
                                            borderColor: "rgb(256, 17, 95)",   
                                            borderWidth: 1
                                        }];
                                    
                                    myChart.data.datasets = all_cum_data;
                                    
                                    myChart.update();





                                });
                            };
                        }
                        
                   

                break;}
            };
 
        });
               
    });
    
    
});