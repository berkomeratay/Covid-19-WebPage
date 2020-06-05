$.getJSON("https://api.covid19api.com/summary",function(data){

    for (let index_2 = 0; index_2 < data.Countries.length; index_2++) {
        var element = data.Countries[index_2].Country;
        console.log("<option >"+element+"</option>");
        $("#country_selector").append("<option >"+element+"</option>");
        
        
    };
    


        $("#btn3").click(function(){
            let country_name = $("#country_selector").val();
            console.log(country_name);

            



            for (let index = 0; index < data.Countries.length; index++){
                console.log(country_name + " " + data.Countries[index].Country);
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
                    
                    break;}
            };
            
                
                
            });
           
});
