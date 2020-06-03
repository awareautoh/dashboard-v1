"use strict";

//
// Trend Chart
//
const trendDataPath = "data/trendTest.csv"; //Create Variable Path

d3.csv(trendDataPath).then(buildTrendOverviewChart); //Read CSV file via D3JS Lib

function buildTrendOverviewChart(value) {
    //Set variable for import data
    let importedValue = value.map(d => d["overview-stunting"]);
    let importedYear = value.map(d => d.year);


    //Set width and height
    let width = 440;
    let height = 440;
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
        .x(d => {
            return x(d.year)
        })
        .y(d => {
            return y(d["overview-stunting"])
        });

    //To filter the line for dash line and normal line
    let a = value.filter(function (d) { //filter data only current and past
        return d["noted"] === "p";
    });
    let b = value.filter(function (d) { //filter data for target goal
        return d["noted"] === "f";
    });


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

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(value)
        .join("text")
        .text(d => `${d["overview-stunting"]}~${d.source}`)
        .attr("dy", "0.35em")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d["overview-stunting"]))
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 6);


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
    let importedValue = (value.slice().sort((a, b) => b["overview-stunting"] - a["overview-stunting"])).map(d => d["overview-stunting"]);
    let importedProvinceLabel = (value.slice().sort((a, b) => b["overview-stunting"] - a["overview-stunting"])).map(d => d["Province"]);
    let getProvinceTestChart = document.getElementById("provinceChartForOverviewCard");
    let provinceTestChart = new Chart(getProvinceTestChart, {
        type: 'horizontalBar',
        data: {
            labels: importedProvinceLabel,
            datasets: [{
                label: 'trend',
                data: importedValue,
                backgroundColor: blue,
                hoverBackgroundColor: darkBlue,
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
    //Create function to generate data based on click event
    let mapTestSort = d3.map();
    let promise = [
        d3.json(mapDraw),
        d3.csv(mapTestData, d => mapTestSort.set(d.feature_id, +d["overview-stunting"]))
    ];
    Promise.all(promise).then(creatMapOverview);


    function creatMapOverview(value) {
        let lao = value[0];
        let testStunting = value[1];
        console.log(testStunting);
        //Import Map Topojson type as Geojson structure
        let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
        //Set porjection map type
        let projection = d3.geoMercator()
            .fitSize([400, 400], myMap); //Auto fit SVG refer to svg set at HTML

        //Draw a graph use "g" because draw multiple path in one time
        svg.append("g")
            .selectAll("path")
            .data(myMap.features)
            .join("path")
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
            .attr("class", "map-legend")
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

//Test Import Data From JSON File
const dataJSONPath = "data/dataJSON.json";

d3.json(dataJSONPath).then(importDataJSON);

function importDataJSON(data) {

}

//*******Test Chart on the top of Home tab
let previousActive; //Set this variable to global so it can rewrite by the return of this function

function generateResult(input) { //this function get the input from the id of onclick element
    let defaultActive = "overview-stunting"; //set the default variable
    let currentActive = input; //set the current variable
    if (currentActive !== defaultActive) { //This to check in case first time choosing so if true it means the first time user active the table
        if (previousActive === undefined) { //Check if the user had clicked any indicator before if true it means the user click current indicator for the first time, them the default indicator will be removed
            document.getElementById(currentActive).classList.add("table-active");
            document.getElementById(defaultActive).classList.remove("table-active");
            console.log("current:" + currentActive);
            console.log("previous:" + previousActive);
        } else {
            document.getElementById(previousActive).classList.remove("table-active");
            document.getElementById(currentActive).classList.add("table-active");
            document.getElementById(defaultActive).classList.remove("table-active");
            console.log("current:" + currentActive);
            console.log("previous:" + previousActive);
        }
    } else {
        document.getElementById(previousActive).classList.remove("table-active");
        document.getElementById(currentActive).classList.add("table-active");
        console.log("current:" + currentActive);
        console.log("previous:" + previousActive);
    }

    //Update Map based on click input
    $(document).ready(function () {
        //Set variable map directory
        let mapDraw = ("map/LAO_ADM1.json");
        let mapTestData = ("data/mapTest.csv");
        //Set to select SVG DOM
        let svg = d3.select("#mapChartForOverviewCard");

        //Set variable to import data
        //Create function to generate data based on click event
        let mapTestSort = d3.map();
        let promise = [
            d3.json(mapDraw),
            d3.csv(mapTestData, d => mapTestSort.set(d.feature_id, +d[currentActive])),
            d3.csv(mapTestData, d => +d[currentActive])
        ];
        Promise.all(promise).then(creatMapOverview);

        function creatMapOverview(value) {
            let lao = value[0];
            let testStunting = value[1];
            let rawDataFromCSV = value[2];


            if (currentActive === defaultActive) {  //If the input has specific color cut off is true
                //Set Color scale
                let colorScale = d3.scaleThreshold()
                    .domain([0, 0.025, 0.10, 0.20, 0.30])
                    .range(["#fafafa", "#0091ea", "#00c853", "#ffd600", "#ff6d00", "#d50000"]);

                //Set tooltips
                let tooltip2 = d3.select(".tab-content").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                //Import Map Topojson type as Geojson structure
                let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
                //Set projection map type
                let projection = d3.geoMercator()
                    .fitSize([320, 320], myMap); //Auto fit SVG refer to svg set at HTML

                //Draw a graph use "g" because draw multiple path in one time
                svg.selectAll("path").remove();
                svg.append("g")
                    .selectAll("path")
                    .data(myMap.features)
                    .join("path")
                    .attr("d", d3.geoPath().projection(projection))
                    .attr("fill", d => colorScale((d.properties.feature_id = mapTestSort.get(d.properties.feature_id) / 100)))
                    .on("mouseover", function update(d) {
                        tooltip2.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip2.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function (d) {
                        tooltip2.transition()
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
            } else { //If no color cut off specific
                //Set the color scale
                let colorScale = d3.scaleOrdinal()
                    .domain([d3.min(rawDataFromCSV), d3.max(rawDataFromCSV)])
                    .range(d3.schemeBlues[4]);
                //Set tooltips
                let tooltip2 = d3.select(".tab-content").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                //Import Map Topojson type as Geojson structure
                let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
                //Set projection map type
                let projection = d3.geoMercator()
                    .fitSize([400, 400], myMap); //Auto fit SVG refer to svg set at HTML

                //Draw a graph use "g" because draw multiple path in one time
                svg.selectAll("path").remove();
                svg.append("g")
                    .selectAll("path")
                    .data(myMap.features)
                    .join("path")
                    .attr("d", d3.geoPath().projection(projection))
                    .attr("fill", d => colorScale((d.properties.feature_id = mapTestSort.get(d.properties.feature_id))))
                    .on("mouseover", function update(d) {
                        tooltip2.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip2.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function (d) {
                        tooltip2.transition()
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
            }


            //This to checked if the input has the cut off reference for fill the color of map
            console.log(rawDataFromCSV);
            console.log(d3.min(rawDataFromCSV));
            console.log(d3.max(rawDataFromCSV));
            //To generate initial Legend label if there is no reference of cut off
            let startingPoint = d3.min(rawDataFromCSV);
            let endingPoint = d3.max(rawDataFromCSV);
            let theRangeOfData = endingPoint - startingPoint;
            let theProportion = theRangeOfData / 4;
            let printTheRange = [];
            let initialTheRangeForCalculation = [startingPoint];
            for (let i = 0; i < 4; i++) {
                printTheRange.push(Math.round(initialTheRangeForCalculation[i] + theProportion));
                initialTheRangeForCalculation.push(initialTheRangeForCalculation[i] + theProportion);
            }

            if (currentActive !== defaultActive) {
                svg.select(".map-legend").remove();
                svg.append("g")
                    .attr("class", "map-legend")
                    .attr("transform", "translate(0,250)")
                    .append(() => legend({
                        color: d3.scaleThreshold(printTheRange,
                            d3.schemeBlues[4]),
                        title: "Clustering",
                        width: 190
                    }));
            } else {
                svg.select(".map-legend").remove();
                svg.append("g")
                    .attr("class", "map-legend")
                    .attr("transform", "translate(0,250)")
                    .append(() => legend({
                        color: d3.scaleThreshold(["<2.5", "2.5", "10", "20", ">=30"],
                            ["#0091ea", "#00c853", "#ffd600", "#ff6d00", "#d50000"]),
                        title: "WHO Classification, 2017 (%)",
                        width: 190
                    }));
            }
        }
    });
    //END Update map

    //Update Trend Chart on click input
    d3.csv(trendDataPath).then(updateBuildTrendOverviewChart); //Read CSV file via D3JS Lib
    function updateBuildTrendOverviewChart(value) {
        //Set variable for import data
        let importedValue = value.map(d => d[currentActive]);
        let importedYear = value.map(d => d.year);


        //Set width and height
        let width = 440;
        let height = 440;
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
            .x(d => {
                return x(d.year)
            })
            .y(d => {
                return y(d[currentActive])
            });

        //To filter the line for dash line and normal line
        let a = value.filter(function (d) { //filter data only current and past
            return d["noted"] === "p";
        });
        let b = value.filter(function (d) { //filter data for target goal
            return d["noted"] === "f";
        });


        //draw a line
        svg.selectAll("path").remove();
        svg.append("path")
            .datum(value)
            .join()
            .transition()
            .duration(2000)
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "#039245")
            .attr("stroke-dasharray", "5, 5")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line(b));
        svg.append("path")
            .datum(value)
            .join()
            .transition()
            .duration(2000)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line(a));


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
        svg.selectAll("g").remove();
        svg.append("g")
            .call(xAxis);
        svg.append("g")
            .call(yAxis);

        //Create a tooltip
        let tooltip3 = d3.select(".tab-content").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        let labelPadding = 3;
        let z = d3.scaleOrdinal(value.columns.slice(1), d3.schemeCategory10);


        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(value)
            .join("text")
            .text(d => `${d[currentActive]}~${d.source}`)
            .attr("dy", "0.35em")
            .attr("x", d => x(d.year))
            .attr("y", d => y(d[currentActive]))
            .clone(true).lower()
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 6)
            .attr("class", "text-legend");


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

    //END Update trend

    //Update Province Chart
    let buildUpdateTrendChart = () => {
            document.getElementById("provinceChartForOverviewCard").remove();
            d3.select("#drawProvinceChart")
                .append("canvas")
                .attr("id", "provinceChartForOverviewCard");
            d3.csv(provinceDataPath).then(buildProvinceOverviewChartIfUndefined);
            function buildProvinceOverviewChartIfUndefined(value) {
                let importedValue = (value.slice().sort((a, b) => b[currentActive] - a[currentActive])).map(d => d[currentActive]);
                let importedProvinceLabel = (value.slice().sort((a, b) => b[currentActive] - a[currentActive])).map(d => d["Province"]);
                let getProvinceTestChart = document.getElementById("provinceChartForOverviewCard");
                let provinceTestChart = new Chart(getProvinceTestChart, {
                    type: 'horizontalBar',
                    data: {
                        labels: importedProvinceLabel,
                        datasets: [{
                            label: 'trend',
                            data: importedValue,
                            backgroundColor: blue,
                            hoverBackgroundColor: darkBlue,
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
    };
    buildUpdateTrendChart();

    //END Update Province Chart


    previousActive = currentActive; //Because we want to know the previous indicator we set the previous variable equal to current active and return the upper function to previous variable

    return previousActive;
}

//Activate Function generateResult
document.getElementById("overview-stunting").addEventListener("click", () => generateResult("overview-stunting"));
document.getElementById("overview-wasting").addEventListener("click", () => generateResult("overview-wasting"));
document.getElementById("overview-underweight").addEventListener("click", () => generateResult("overview-underweight"));
document.getElementById("overview-c6-c59-anemia").addEventListener("click", () => generateResult("overview-c6-c59-anemia"));
document.getElementById("overview-wra-15-49-anemia").addEventListener("click", () => generateResult("overview-wra-15-49-anemia"));
document.getElementById("overview-low-birth-weight").addEventListener("click", () => generateResult("overview-low-birth-weight"));
document.getElementById("overview-overweight").addEventListener("click", () => generateResult("overview-overweight"));
document.getElementById("overview-c0-c6-exclusively-breastfed").addEventListener("click", () => generateResult("overview-c0-c6-exclusively-breastfed"));

//Activate Function generateResult
document.getElementById("button-en-lang").addEventListener("click", () => setLanguage('en'));
document.getElementById("button-la-lang").addEventListener("click", () => setLanguage('lo'));
