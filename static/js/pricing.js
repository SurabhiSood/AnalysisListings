
var map = L.map('map').setView([35.5951, -82.5515], 16);

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
    //console.log(data)

    function getColor(d) {
        return d > 300 ? '#800026' :
               d > 250  ? '#BD0026' :
               d > 200  ? '#E31A1C' :
               d > 250  ? '#FC4E2A' :
               d > 200  ? '#FD8D3C' :
               d > 150   ? '#FEB24C' :
               d > 100   ? '#FED976' :
                          '#FFEDA0';
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.price),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    L.geoJson(data, {style: style}).addTo(map);
})
