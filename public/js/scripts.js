
function reloadPage() {
    window.location.reload()
}

console.log(d3); // test if d3 is loaded
const dataset = [73, 18, 56, 38, 4]

// d3.select('svg').append('circle').attr('cx', 50).attr('cy', 50).attr('r', 50);

const width = 500;
const height = 500;

const linscale = d3.scaleLinear()
    .domain([0, 100]) // unit: km
    .range([0, width]); // unit: px

const yAxisScale = d3.scaleLinear()
    .domain([100, 0]) // unit: km
    .range([0, width]); // unit: px

const colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range(['blue', 'red']);

const axis = d3.axisLeft()
    .scale(yAxisScale)
    .ticks(20);

// Add Rectangles

d3.select('.svg1')
    .append('g')
    .selectAll('rect')
    .data(dataset)
    .enter().append('rect')
    .attr('width',50)
    .attr('height', data => linscale(data))
    .attr('stroke', 'black')
    .attr('fill', data => colorScale(data))
    .attr('x', function (d, i) { return (i * 75) + 50; })
    .attr('y', data => 500 - linscale(data))
    .attr('transform', 'translate(75,0)');


d3.select('.svg1')
    .append('g')
    .attr('transform', 'translate(50, 0)')
    .call(axis);




