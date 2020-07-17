//creating basic leaflet map
var mymap = L.map('map').setView([35.5951, -82.5515], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11', 
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap)

var layerGroup = L.layerGroup().addTo(mymap);

function createMarker(neighbour){
  d3.json("/map").then((data)=>{
    // Loop through the data array and create one marker for each listing, bind a popup containing its name and review add it to the map
    console.log(data);
    
    for (var i = 0; i < data.length; i++) {
      if(neighbour===data[i]['Zipcode']) {
        var listing = data[i];
        console.log(listing);

        if((listing.Reviews/20)==5){
          color = "green"
        }else if((listing.Reviews/20)<=3){
          color = "red"
        }
        else{
          color = "indigo"
        }

        L.circle([listing.Latitude,listing.Longitude],{
          radius: 100,
          color: color
        }).bindPopup("<h5>" + listing.Name + "</h5><hr><h6>Review: "+listing.Reviews/20+ "<hr><h6>Host: "+listing.Host +"</h6>"+"<hr><h6>Price/Night: "+listing.Price +"</h6>"+ "<hr><h6>Available: " + listing.Available + "</h6>"+"<hr><h6>Location: " + listing.City + "</h6>")
        .addTo(layerGroup);
      }
    }
  });
}
  
// Creating function for change in the event
function optionChanged(neighbour){
  layerGroup.clearLayers();
  createMarker(neighbour);
}

// Creating function for initial data rendering via dropdown
function init(){
  
  // select dropdown menu
  var dropdown =  d3.select('#zipCode');
  
  //read the data
  d3.json("/dropdown").then((data1)=>{
    console.log(data1)
    //get the zip data to the dropdown menu
    
    for(j=0;j<data1.length;j++){
      var area = data1[j][0]
      //console.log(area)
      dropdown.append("option").text(area).property("value");
    };  
  });
};

init();
