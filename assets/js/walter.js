var svgWidth = 1000;
var svgHeight = 1000;
var margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 200
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// create the area for the graph

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
 
 
 Plotly.d3.csv(("https://github.com/ablinn91/Project-Books/tree/master/data/wBooks", function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row)
    { return row[key]; });
  }
 var fiction = {
  x: unpack(rows, 'num_pages'), 
  y: unpack(rows, 'z_score'), 
  z: unpack(rows, 'revRate'),
  w: unpack(rows, 'title'),
  v: unpack(rows, 'sizeRevRate'),
  type: 'scatter',
  name: 'Books',
  //  text: w,  //TODO
  textfont : {
    family:'Times New Roman'
  },
  textposition: 'bottom center',
  mode: 'markers',
  marker: { 
    color: 'rgb(127, 127, 127)',
    size: 'v',
    symbol: 'circle', 
    line: {
      color: 'rgb(204, 10, 99)',
      width: 1
    },
    opacity: 0.9 
  }
};


var data = [ fiction ];

var layout = { 
  xaxis: {
    range: [1, 900]  //TODO
  },
  yaxis: {
    range: [-3, 3]   //TODO
  },
  legend: {
    y: 0.5,
    yref: 'paper',
    font: {
      family: 'Arial, sans-serif',
      size: 20, 
      color: 'light blue',
    }
  },
  title:'x:Pages by y:z-Score of Avg Rating'
};
Plotly.newPlot('scatter', data, layout, {showSendToCloud: true});
});