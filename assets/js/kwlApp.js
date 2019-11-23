var svgWidth = 400;
var svgHeight = 800;
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
 
 
 Plotly.d3.csv("https://github.com/ablinn91/Project-Books/tree/master/data/wBooks.csv", function(err, rows){
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
    color: 'rgb(40, 40, 120)',
    size: 20,
    symbol: 'circle', 
    line: {
      color: 'rgb(50, 50, 200)',
      width: 1
    },
    opacity: 0.5 
  }
};


var data = [ fiction ];

var layout = { 
  xaxis: {
    range: [1, 1500]  //TODO
  },
  yaxis: {
    range: [-4, 4]   //TODO
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