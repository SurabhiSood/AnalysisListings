var ctx = document.getElementById('myChart').getContext('2d');

d3.csv('static/data/best_location.csv').then((data)=>{
    console.log(data)
    var location=[]
    var loc_score=[]

    for(i=0;i<data.length;i++){
        var loc = data[i].zipcode.replace('.0', '');
        var score = data[i].Scores_Location
        location.push(loc)
        loc_score.push(score)

    }
    
    console.log(location)
    console.log(loc_score)

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
    // The data for our dataset
        data: {
            //Insert the divisions for the x-axis here
            labels: location,
            datasets: [{
                label: "Location Review Scores",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                //Insert data points here (y-axis)
                data: loc_score,
            }]
        },
    // Configuration options go here
        options: {
          //causes chart to resize when its container resizes
          responsive: true,
          //setting to false will prevent the height of the chart from shrinking when resizing
          maintainAspectRatio: false
        }
    });


})