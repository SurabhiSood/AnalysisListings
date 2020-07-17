
var map = L.map('map').setView([35.5951, -82.5515], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map)

d3.json('static/data/price.geojson').then((data)=>{
    //L.geoJson(data).addTo(map);
    console.log(data)

    function getColor(d) {
        return d > 300 ? '#800026' :
               d > 250  ? '#FC4E2A' :
               d > 200  ? '#FD8D3C' :
               d > 150   ? '#FEB24C' :
               d > 100   ? '#FED976' :
                          '#FFEDA0';
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.Price),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    L.geoJson(data, {style: style}).addTo(map);

    // updating info for the map

    // control that shows state info on hover
    var info = L.control();

    info.onAdd = function(map) {
      this._div = L.DomUtil.create("div", "info");
      this.update();
      return this._div;
    };

    info.update = function(props) {
      this._div.innerHTML =
        " " +
        (props
          ? "<b> Location: " +
            props.Location +
            "</b><br/> Avg Price : $ " +
            Math.round(props.Price, 4) +
            " "
          : "Hover over the area");
    };

    info.addTo(map);
    
    //event listener for layer mouseover event
    function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

// mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

var geojson;

//click listener that zooms to the state
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//onEachFeature option to add the listeners on our state layers
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [100, 150, 200, 250, 300],
      labels = [],
      from,
      to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<i style="background:' +
          getColor(from + 1) +
          '"></i> ' +
          from +
          (to ? "&ndash;" + to : "+")
      );
    }

    div.innerHTML = labels.join("<br>");
    return div;
  };

  legend.addTo(map);


    
});





    

    

   