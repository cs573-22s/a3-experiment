<!--https://www.d3-graph-gallery.com/graph/pie_basic.html-->
<!--https://www.d3-graph-gallery.com/graph/pie_annotation.html-->

<!-- php -S localhost:8000 -t a3-experiment -->

<!DOCTYPE html>
<html>
<meta charset="utf-8">

<!-- Load d3.js -->
<script src="https://d3js.org/d3.v4.min.js"></script>

<style>
  svg {
    display: block;
    margin-bottom: 5px;
  }
  body {
    font-family: Tahoma, sans-serif;
  }
  .bar {
            fill: rgb(223, 82, 17);
        }

</style>

<body>
  
  <h1> Experiment </h1>
  <p> Description/Intro </p> <br>

  <form method="post">

  <h3> Graph 1: Pie Chart</h3>
  <div id="pie_chart"></div>
  <p>Do you think this graph is misleading?</p>
  <input type="radio" id="yes1" name="yes_no1" value="Yes">
  <label for="yes1">Yes</label><br>
  <input type="radio" id="no1" name="yes_no1" value="No">
  <label for="no1">No</label><br><br>
  <label for="explain1">Why or why not?:</label><br><br>
  <input type="text" id="explain1" name="explain1" value="" size="100"><br>
  <br><br>

  <h3> Graph 2: Bar Chart </h3>
  <svg id="svg2" width="600" height="500"></svg>
  <p>Do you think this graph is misleading?</p>
  <input type="radio" id="yes2" name="yes_no2" value="Yes">
  <label for="yes2">Yes</label><br>
  <input type="radio" id="no2" name="yes_no2" value="No">
  <label for="no2">No</label><br><br>
  <label for="explain2">Why or why not?:</label><br><br>
  <input type="text" id="explain2" name="explain2" value="" size="100"><br>
  <br><br>

  <h3> Graph 3 </h3>
  <svg id="svg3"></svg>
  <p>Do you think this graph is misleading?</p>
  <input type="radio" id="yes3" name="yes_no3" value="Yes">
  <label for="yes3">Yes</label><br>
  <input type="radio" id="no3" name="yes_no3" value="No">
  <label for="no3">No</label><br><br>
  <label for="explain3">Why or why not?:</label><br><br>
  <input type="text" id="explain3" name="explain3" value="" size="100"><br>
  <br><br><p> Questions </p> <br>


  <input type="submit" name="submit" value="Submit">
  </form>

</body>

<script>
  console.log(d3); // test if d3 is loaded

  var width = 600;
  var height = 1200;

  // PART 1 //
  var svg1 = d3
    .select("svg1")
    .attr("viewBox", [0, 0, width, height])
    .property("value", []);

  // margins
  var width = 450
      height = 450
      margin = 40

  // The radius = width/2 or height/2 (smallest one)
  var radius = Math.min(width, height) / 2 - margin

  // append svg to div
  var svg = d3.select("#pie_chart")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Data Averages
  var data = {Total:13.56363636, Female:9.531818182, Male:17.6}

  // Colors
  var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#af7aa1","#edc949","#e15759"])

  // Individual group position
  var pie = d3.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(data))

  var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

  // Create chart: path using arc.
  svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "4px")
    .style("opacity", 0.5)

    // Annotate Slices
  svg
    .selectAll('slices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){ return d.data.key})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 25)

  // PART 2 //

  var svg2 = d3.select("#svg2")
  margin = 200
  width = svg2.attr("width") - margin
  height = svg2.attr("height") - margin

  var xScale = d3.scaleBand().range([0, width]).padding(0.4);
  var yScale = d3.scaleLinear().range([height, 0]);

  var g = svg2.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

  d3.csv("age-deaths.csv", function(e, data) {
    if (e) { throw e; }

    xScale.domain(data.map(function(d) { return d.age_group; }));
    yScale.domain([0, 17000]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("y", height - 260)
      .attr("x", width)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Age group");

    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(function(d){
          return d;
      }).ticks(10))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Number of deaths");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.age_group); })
      .attr("y", function(d) { return yScale(d.number); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return height - yScale(d.number); });

    svg2.append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 50)
      .attr("y", 50)
      .attr("font-size", "24px")
      .text("Number of overdose deaths by age group")
  });



  // PART 3 //

  var svg3 = d3
    .select("svg3")
    .attr("viewBox", [0, 0, width, height])
    .property("value", []);

</script>

<?php

$fp = fopen('data.txt', 'a');
fwrite($fp, "\n");
fclose($fp);

if(isset($_POST['yes_no1']))
{
  $data = $_POST['yes_no1'];
  $fp = fopen('data.txt', 'a');
  fwrite($fp, $data);
  fwrite($fp, " ");
  fclose($fp);
}

if(isset($_POST['explain1']))
{
  $data = $_POST['explain1'];
  $fp = fopen('data.txt', 'a');
  fwrite($fp, $data);
  fwrite($fp, " ");
  fclose($fp);
}

if(isset($_POST['yes_no2']))
{
  $data = $_POST['yes_no2'];
  $fp = fopen('data.txt', 'a');
  fwrite($fp, $data);
  fwrite($fp, " ");
  fclose($fp);
}

if(isset($_POST['explain2']))
{
  $data = $_POST['explain2'];
  $fp = fopen('data.txt', 'a');
  fwrite($fp, $data);
  fwrite($fp, " ");
  fclose($fp);
}

if(isset($_POST['yes_no3']))
{
  $data = $_POST['yes_no3'];
  $fp = fopen('data.txt', 'a');
  fwrite($fp, $data);
  fwrite($fp, " ");
  fclose($fp);
}

if(isset($_POST['explain3']))
{
  $data = $_POST['explain3'];
  $fp = fopen('data.txt', 'a');
  fwrite($fp, $data);
  fwrite($fp, " ");
  fclose($fp);
}

?>

</html>

