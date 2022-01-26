// set the dimensions and margins of the graph
const margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 850 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;
// parse the date / time
const parseTime = d3.timeParse("%Y");

// set the ranges
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
const svg = d3
  .select(".lineGraphDiv")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function drawLineGraph(data) {
  const colorsPerTopic = data.shift();
  const dataKeys = Object.keys(data[1]);
  dataKeys.shift();
  // format the data
  data.forEach(function (d) {
    d.Date = parseTime(d.Date);
  });

  // Scale the range of the data
  x.domain(
    d3.extent(data, function (d) {
      return d.Date;
    })
  );
  y.domain([
    d3.min(data, function (d) {
      let min = 1000;
      dataKeys.forEach((dataKey) => {
        min = Math.min(d[dataKey]) < min ? Math.min(d[dataKey]) : min;
      });
      return min;
    }),
    d3.max(data, function (d) {
      let max = 0;
      dataKeys.forEach((dataKey) => {
        max = Math.max(d[dataKey]) > max ? Math.max(d[dataKey]) : max;
      });
      return max;
    }),
  ]);

  // define the line
  const valueLines = [];
  dataKeys.forEach((dataKey) => {
    valueLines.push([
      d3
        .line()
        .x(function (d) {
          return x(d.Date);
        })
        .y(function (d) {
          return y(d[dataKey]);
        }),
      dataKey,
    ]);
  });
  // Add the valueline path.
  valueLines.forEach((valueLine) => {
    svg
      .append("g")
      .selectAll("path")
      .data([data])
      .enter()
      .append("path")
      .attr("class", `line ${valueLine[1]}`)
      .attr("style", `stroke: ${colorsPerTopic[valueLine[1]]}`)
      .attr("d", valueLine[0]);
  });

  // Add the X Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));
}

export function makeLineGraph() {
  // Get the data
  d3.json("./data/lineGraphData.json").then((data) => {
    drawLineGraph(data);
  });
}
