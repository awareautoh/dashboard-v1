"use strict";

//
// Trend Chart
//
const trendDataPath = "data/trendTest.csv"; //Create Variable Path

d3.csv(trendDataPath).then(buildTrendOverviewChart); //Read CSV file via D3JS Lib

function buildTrendOverviewChart(value) {
    console.log(value);
    //Set variable for import data
    let importedValue = value.map(d => d.value);
    let importedYear = value.map(d => d.year);
    console.log(importedValue);
    console.log(importedYear);
    console.log(d3.max(importedValue));

    //Set width and height
    let width = 360;
    let height = 360;
    let svg = d3.select("#lineChartForOverviewCard"); //Select DOM element to draw to graph
    let margin = ({top: 20, right: 30, bottom: 30, left: 40}); //Set the margin to draw graph

    //Set line variable to draw a line
    let x = d3.scalePoint() //Use scale point for line category xAxis
        .domain(importedYear)
        .rangeRound([margin.left, width - margin.right]); //Set the length to start

    let y = d3.scaleLinear()
        .domain([0, 60]) //Show the scale only for 0 to 60
        .range([height - margin.bottom, margin.top]);
    //Set a line using d3.line
    let line = d3.line()
        .x(d => { return x(d.year) } )
        .y(d => { return y(d.value) } );

    //To filter the line for dash line and normal line
    let a = value.filter(function (d) { //filter data only current and past
        return d.noted === "p";
    });
    let b = value.filter(function (d) { //filter data for target goal
        return d.noted === "f";
    });

    console.log(a);

    //draw a line
    svg.append("path")
        .datum(value)
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke", "#039245")
        .attr("stroke-dasharray", "5, 5")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line(b));
    svg.append("path")
        .datum(value)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line(a));

    console.log(line);

    //Create Axis line
    let xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(0).tickSizeOuter(0));

    let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5))
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("Percentage"));

    //Then draw a Axis
    svg.append("g")
        .call(xAxis);
    svg.append("g")
        .call(yAxis);

    //Create a tooltip
    let tooltip2 = d3.select(".tab-content").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    let labelPadding = 3;
    let z = d3.scaleOrdinal(value.columns.slice(1), d3.schemeCategory10);

    let serie = svg.append("g")
        .selectAll("g")
        .data(value)
        .join("g");

    serie.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(value)
        .join("text")
        .text(d => `${ d.value }~${ d.source }`)
        .attr("dy", "0.35em")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.value))
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 6);


    console.log(value.filter((d, i, data) => i === data.length - 1));

    // svg.selectAll("path")
    //     .data(value)
    //     .on("mouseover", function(d) {
    //         tooltip2.transition()
    //             .duration(200)
    //             .style("opacity", .9);
    //         tooltip2.html(d.year + '<br>' + 'value:' + d.value)
    //             .style("left", (d3.event.pageX) + "px")
    //             .style("top", (d3.event.pageY - 28) + "px");
    //     })
    //     .on("mouseout", function(d) {
    //         tooltip2.transition()
    //             .duration(500)
    //             .style("opacity", 0);
    //     });

    svg.node();
}

//
// Province Chart
//
const provinceDataPath = "data/provinceTest.csv"; //Create variable path

d3.csv(provinceDataPath).then(buildProvinceOverviewChart);

function buildProvinceOverviewChart(value) {
    let importedValue = (value.slice().sort((a, b) => b.ValueStunting17 - a.ValueStunting17)).map(d => d.ValueStunting17);
    let importedProvinceLabel = (value.slice().sort((a, b) => b.ValueStunting17 - a.ValueStunting17)).map(d => d.Province);
    let getProvinceTestChart = document.getElementById("provinceChartForOverviewCard");
    let provinceTestChart = new Chart(getProvinceTestChart, {
        type: 'horizontalBar',
        data: {
            labels: importedProvinceLabel,
            datasets: [{
                label: 'trend',
                data: importedValue,
                borderWidth: 0,
            },]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
            },
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }
    });
}

//END Province Chart

//
// Map Chart
//
$(document).ready(function () {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let mapTestData = ("data/mapTest.csv");
    //Set to select SVG DOM
    let svg = d3.select("#mapChartForOverviewCard");
    //Set Scale
    let colorScale = d3.scaleThreshold()
        .domain([0, 0.025, 0.10, 0.20, 0.30])
        .range(["#fafafa", "#0091ea", "#00c853", "#ffd600", "#ff6d00", "#d50000"]);
    //Set tooltips
    let tooltip1 = d3.select(".tab-content").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //Set variable to import data
    let mapTestSort = d3.map();
    let promise = [
        d3.json(mapDraw),
        d3.csv(mapTestData, d => mapTestSort.set(d.feature_id, +d.ValueStunting17))
    ];

    Promise.all(promise).then(creatMapOverview);

    function creatMapOverview(value) {
        let lao = value[0];
        let testStunting = value[1];
        //Import Map Topojson type as Geojson structure
        let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
        //Set porjection map type
        let projection = d3.geoMercator()
            .fitSize([320, 320], myMap); //Auto fit SVG refer to svg set at HTML

        //Draw a graph use "g" because draw multiple path in one time
        svg.append("g")
            .selectAll("path")
            .data(myMap.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", d => colorScale((d.properties.feature_id = mapTestSort.get(d.properties.feature_id)) / 100));
        svg.selectAll("path")
            .data(myMap.features)
            .on("mouseover", function (d) {
                tooltip1.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip1.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip1.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        //Draw a line border for each province
        svg.append("path")
            .datum(topojson.mesh(lao, lao.objects.LAO_ADM1, function (a, b) {
                return a !== b;
            }))
            .attr("class", "mapBorder")
            .attr("d", d3.geoPath().projection(projection));

        //Add Legend
        svg.append("g")
            .attr("transform", "translate(0,250)")
            .append(() => legend({
                color: d3.scaleThreshold(["<2.5", "2.5", "10", "20", ">=30"],
                    ["#0091ea", "#00c853", "#ffd600", "#ff6d00", "#d50000"]),
                title: "WHO Classification, 2017 (%)",
                width: 190
            }));


    }
});

//END Map Overview CHart

