
var svgWidth = 1000;
var svgHeight = 1000;

var margin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// create the area for the graph
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class","chart");

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);  

var thing = "books.csv"
// d3.csv(thing).then(function(data) {
//   console.log(data);
//   console.log("blah");
// });

var row;

d3.csv(thing).then(function(BookData){

  //cast the data this is from homework 3.9
    //var numPagesNumber = BookData.num_pages.map(number);
    //console.log(numPagesNumber)

    //parses out the data
    BookData.forEach(function(data){
      
      data["# num_pages"] = Number(data["# num_pages"]);
      data.average_rating = +data.average_rating;
      data.ratings_count = +data.ratings_count;
      data.text_reviews_count = +data.text_reviews_count;
    });
    console.log(BookData);

    var xLinearScale = d3.scaleLinear()
      .domain([(d3.min(BookData, d => d["# num_pages"])), d3.max(BookData, d => d["# num_pages"])])
      .range([0,width]);

    var yLinearScale = d3.scaleLinear()
      .domain([(d3.min(BookData, d => d.average_rating)), d3.max(BookData, d => d.average_rating)])
      .range([height,0]); 
  
  //create axis function
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append axis to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
//putting an html tag for a group
    chartGroup.append("g")
      .call(leftAxis);
      
    //create circles
    chartGroup.selectAll("circle")
    .data(BookData)
    .enter()//this tels d3 to put new elements inside the page
    .append("circle")
    .attr("cx", d => xLinearScale(d["# num_pages"]))
    .attr("cy", d => yLinearScale(d.average_rating))
    .attr("r","5")
    .attr("fill","blue")
    .attr("class",d=> "stateCircle "+d.abbr);


    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Average Rating");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Number of Pages");    
    
}).catch(function(error) {
  console.log(error);
}); 