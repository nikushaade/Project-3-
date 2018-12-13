var dataClass;
var top10;


function getAllData(){
    $.ajax({
        url: '/api/all',
        type: 'GET',
        datatype: 'json',
        error: function(resp){
            console.log("Oh no...");
            console.log(resp);
        },
        success: function(resp){
            console.log('WooHoo!');
            console.log(resp);

           dataClass = resp.map(function(d){
                return d.doc;
            });

            dataClass = _.sortBy(dataClass, function(obj){ return obj.score; });
            dataClass.reverse();
            console.log(dataClass);
            
            for (var i = 0; i < 10; i++){
           //append each score to the page
                // $('#Hs-Input').append('<p>' + dataClass[i].name + " : " + dataClass[i].score + '</p>');
            var top10 = ((i + 1) + ") " + dataClass[i].name + " : " + dataClass[i].score + "</p>");
            $("div").append(top10);
            }

            lowScore = dataClass[9].score;
            console.log(lowScore);
        }
    });
}
getAllData();
