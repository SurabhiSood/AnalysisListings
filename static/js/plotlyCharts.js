// Line Chart for Growth of AirBnBs through Asheville
var trace1 = {
  x: ["2009", "2010", "2011", "2012",
      "2013", "2014", "2015", "2016","2017","2018","2019","2020"],

  y: [2,20,84,167,217,300,387,410,318,273,174,35],
  type: "scatter",
  name: 'Total Listings'
};

var data = [trace1];

var layout = {
  title: "Growth Analysis of AirBnBs",
  xaxis: { title: "Years"},
  yaxis: { title: "Number of Listings"}
};

Plotly.newPlot("line_chart", data, layout);

//pie Chart for Property type 'bar'
d3.csv('static/data/property.csv').then((data)=>{
  //console.log(data)
  labels = []
  values = []
  for(var i=0;i<data.length;i++){
    var l = data[i].property_type
    labels.push(l)
    var v = data[i].id
    values.push(v)
  }
  // console.log(labels)
  // console.log(values)
  var trace2 = {
    labels: labels,
    values: values,
    type: 'pie'
  };
  
  var data2 = [trace2];
  
  var layout2 = {
    title: "Property Type",
    };
  
  Plotly.newPlot("pie", data2, layout2);

})

