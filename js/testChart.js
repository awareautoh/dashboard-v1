"use strict";

const trendDataPath = "data/trendTest.csv"; //Create Variable Path
const provinceDataPath = "data/provinceTest.csv" //Create Variable Path
const twentyOneIndicatorPath = "data/21-indicators.csv";
d3.csv(trendDataPath).then(buildTrendOverviewChart); //Read CSV file via D3JS Lib
d3.csv(provinceDataPath).then(buildProvinceOverviewChart);
// d3.csv(twentyOneIndicatorPath).then(buildTableChart);
// function buildTrendOverviewChart(value) {
//     //Set variable for import data
//     let importedValue = value.map(d => +d["overview-stunting"]);
//     let importedYear = value.map(d => d.year);
//
//
//     //Set width and height
//     let width = 440;
//     let height = 440;
//     let svg = d3.select("#lineChartForOverviewCard"); //Select DOM element to draw to graph
//     let margin = ({top: 20, right: 30, bottom: 30, left: 40}); //Set the margin to draw graph
//
//     //Set line variable to draw a line
//     let x = d3.scalePoint() //Use scale point for line category xAxis
//         .domain(importedYear)
//         .rangeRound([margin.left, width - margin.right]); //Set the length to start
//
//     let y = d3.scaleLinear()
//         .domain([0, 60]) //Show the scale only for 0 to 60
//         .range([height - margin.bottom, margin.top]);
//     //Set a line using d3.line
//     let line = d3.line()
//         .x(d => {
//             return x(d.year)
//         })
//         .y(d => {
//             return y(+d["overview-stunting"])
//         });
//
//     //To filter the line for dash line and normal line
//     let a = value.filter(function (d) { //filter data only current and past
//         return d["noted"] === "p";
//     });
//     let b = value.filter(function (d) { //filter data for target goal
//         return d["noted"] === "f";
//     });
//
//     //draw a line
//     svg.append("path")
//         .datum(value)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", 2)
//         .attr("stroke-linejoin", "round")
//         .attr("stroke-linecap", "round")
//         .attr("d", line(a));
//     // svg.append("circle")
//     //     .datum(value)
//     //     .attr("fill", uBlue)
//     //     .attr("cx", d => x(d.year))
//     //     .attr("cy", d => { return y(d["overview-stunting"]) })
//     //     .attr("r", 5);
//
//
//     //Create Axis line
//     let xAxis = g => g
//         .attr("transform", `translate(0,${height - margin.bottom})`)
//         .call(d3.axisBottom(x).ticks(0).tickSizeOuter(0));
//
//     let yAxis = g => g
//         .attr("transform", `translate(${margin.left},0)`)
//         .call(d3.axisLeft(y).ticks(5))
//         .call(g => g.select(".tick:last-of-type text").clone()
//             .attr("x", 3)
//             .attr("text-anchor", "start")
//             .attr("font-weight", "bold")
//             .text("Percentage"));
//
//     //Then draw a Axis
//     svg.append("g")
//         .call(xAxis);
//     svg.append("g")
//         .call(yAxis);
//
//     //Create a tooltip
//     let tooltip2 = d3.select("body").append("div")
//         .attr("class", "tooltip")
//         .style("opacity", 0);
//
//     let labelPadding = 3;
//     let z = d3.scaleOrdinal(value.columns.slice(1), d3.schemeCategory10);
//
//     svg.append("g")
//         .attr("font-family", "sans-serif")
//         .attr("font-size", 10)
//         .attr("stroke-linecap", "round")
//         .attr("stroke-linejoin", "round")
//         .attr("text-anchor", "middle")
//         .selectAll("text")
//         .data(value)
//         .join("text")
//         .text(d => `${d["overview-stunting"]}`)
//         .attr("dy", "0.35em")
//         .attr("x", d => x(d.year))
//         .attr("y", d => y(+d["overview-stunting"]))
//         .clone(true).lower()
//         .attr("fill", "none")
//         .attr("stroke", "white")
//         .attr("stroke-width", 6);
//
//
//     // svg.selectAll("path")
//     //     .data(value)
//     //     .on("mouseover", function(d) {
//     //         tooltip2.transition()
//     //             .duration(200)
//     //             .style("opacity", .9);
//     //         tooltip2.html(d.year + '<br>' + 'value:' + d.value)
//     //             .style("left", (d3.event.pageX) + "px")
//     //             .style("top", (d3.event.pageY - 28) + "px");
//     //     })
//     //     .on("mouseout", function(d) {
//     //         tooltip2.transition()
//     //             .duration(500)
//     //             .style("opacity", 0);
//     //     });
//
//     svg.node();
// }
//Activate Function

//
// Trend Chart
//
function buildTrendOverviewChart(valueOfTrend) {
    //To filter the line for dash line and normal line
    let presentData = valueOfTrend.filter(function (d) { //filter data only current and past
        return d["noted"] === "p";
    });
    let targetData = valueOfTrend.filter(function (d) { //filter data for target goal
        return d["noted"] === "f";
    });

    //Present Value Variable
    let importedPresentValue = presentData.map(d => +d["overview-stunting"]);
    let importedPresentYear = presentData.map(d => d.year);
    //Target Value Variable
    let importedTargetValue = targetData.map(d => +d["overview-stunting"]);
    let importedTargetYear = targetData.map(d => d.year);

    let presentValue = [];
    let targetValue = [];
    let year = valueOfTrend.map(d => d.year);

    const filterNewDatasetFromImportedData = (dataValue, dataYear, newDataVariableName) => {
        for (let i = 0; i < dataValue.length; i++) {
            newDataVariableName.push({x: dataYear[i], y: dataValue[i]})
        }
    }

    filterNewDatasetFromImportedData(importedPresentValue, importedPresentYear, presentValue);
    filterNewDatasetFromImportedData(importedTargetValue, importedTargetYear, targetValue);


    let getTrendTestChart = document.getElementById("overview-trend-line-chart");
    let trendTestChart = new Chart(getTrendTestChart, {
        data: {
            labels: year,
            datasets: [{
                type: 'line',
                label: 'trend',
                data: presentValue,
                backgroundColor: uBlue,
                borderColor: uBlue,
                fill: "none",
                lineTension: 0,
                borderWidth: 0,
                pointRadius: 8,
            }, {
                type: 'scatter',
                label: 'trend',
                data: targetValue,
                backgroundColor: uDarkBlue,
                borderColor: uDarkBlue,
                fill: "none",
                borderWidth: 0,
                pointRadius: 8,
            }]
        },
        plugins: [ChartDataLabels],
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
            },
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        let specificLabel = ['MICS 3', 'LSIS 1', 'LSIS 2', 'Target 2020', 'Target 2025'];
                        return (tooltipItem[0].datasetIndex === 1) ? specificLabel[tooltipItem[0].index + 3] : specificLabel[tooltipItem[0].index]
                    }
                }
            },
            plugins: {
                datalabels: {
                    color: uBlack,
                    anchor: 'start',
                    align: 'bottom',
                    formatter: function (value, context) {
                        return (context.dataset.data[context.dataIndex]['y'] + '%');
                    }
                }
            }
        }
    });

}

//END Trend Chart

//
//Province Chart
//
function buildProvinceOverviewChart(valueOfProvince) {
    let importedValue = (valueOfProvince.slice().sort((a, b) => b["overview-stunting"] - a["overview-stunting"])).map(d => d["overview-stunting"]);
    let importedProvinceLabel = (valueOfProvince.slice().sort((a, b) => b["overview-stunting"] - a["overview-stunting"])).map(d => d["Province"]);
    let nationalLine = valueOfProvince.map(d => d["overview-stunting-national"]);
    let getProvinceTestChart = document.getElementById("provinceChartForOverviewCard");
    let provinceTestChart = new Chart(getProvinceTestChart, {
        type: 'horizontalBar',
        data: {
            labels: importedProvinceLabel,
            datasets: [{
                label: 'trend',
                data: importedValue,
                backgroundColor: uBlue,
                hoverBackgroundColor: uDarkBlue,
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
            annotation: {
                events: ["mouseover"],
                annotations: [{
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: nationalLine[0],
                    borderColor: uRed,
                    borderWidth: 1,
                    label: {
                        enabled: true,
                        content: "National " + `${nationalLine[0]}` + "%",
                        position: "center",
                    },
                }]
            },
        }
    });

    //
    //Table Chart
    //
    buildTableChart(valueOfProvince);

    function buildTableChart(value) {
        d3.select("#overview-data-table-content")
            .selectAll('tr')
            .data(value)
            .enter().append('tr')
            .attr('id', d => "overview-data-table-content-row-" + `${d["Province"]}`)
            .html(d => {
                return ('<td>' + `${d["Province"]}` + '</td>' +
                    '<td>' + `${d["overview-stunting"]}` + '</td>')
            });
    }
}

//END Province Chart
//
// Map Chart
//
const mapOverview = () => {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let mapTestData = ("data/mapTest.csv");
    //Set to select SVG DOM
    let svg = d3.select("#mapChartForOverviewCard");
    //Set Scale
    let colorScale = d3.scaleThreshold()
        .domain([0, 0.025, 0.10, 0.20, 0.30])
        .range([uGrey, uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]);
    //Set tooltips
    let tooltip1 = d3.select("body").append("div")
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
        //Import Map Topojson type as Geojson structure
        let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
        //Set projection map type
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
            .datum(topojson.mesh(lao, lao.objects.LAO_ADM1))
            .attr("class", "mapBorder")
            .attr("d", d3.geoPath().projection(projection));

        //Add Legend
        svg.append("g")
            .attr("class", "map-legend")
            .attr("transform", "translate(0,250)")
            .append(() => legend({
                color: d3.scaleThreshold(["<2.5", "10", "20", ">=30"],
                    [uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]),
                title: "WHO Classification, 2017 (%)",
                width: 190
            }));


    }
}
mapOverview();
//END Map Overview CHart

//Test Import Data From JSON File
const dataJSONPath = "data/dataJSON.json";
d3.json(dataJSONPath).then(importDataJSON);

function importDataJSON(data) {
}

//Test Chart on the top of Home tab
let previousActive; //Set this variable to global so it can rewrite by the return of this function


//This function for import each indicator from master dataset
function dataImport(destinationDataset, originDataset, indicatorName) {
    originDataset.map(d => {
        if ((d['indicator'] === indicatorName) && ((d["geography-level"] !== "target-2020") && (d["geography-level"] !== "target-2025"))) {
            destinationDataset.push(d);
        }
    })
}

function generateResult(input) { //this function get the input from the id of onclick element
    let defaultActive = "overview-stunting"; //set the default variable
    let currentActive = input; //set the current variable
    if (currentActive !== defaultActive) { //This to check in case first time choosing so if true it means the first
        // time user active the table
        if (previousActive === undefined) { //Check if the user had clicked any indicator before if true it means
            // the user click current indicator for the first time, them the default indicator will be removed
            document.getElementById(currentActive).classList.add("table-active");
            document.getElementById(defaultActive).classList.remove("table-active");
        } else {
            document.getElementById(previousActive).classList.remove("table-active");
            document.getElementById(currentActive).classList.add("table-active");
            document.getElementById(defaultActive).classList.remove("table-active");
        }
    } else {
        document.getElementById(previousActive).classList.remove("table-active");
        document.getElementById(currentActive).classList.add("table-active");
    }

    //Update Map based on click input
    let updateMapOverview = () => {
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
            //To generate initial Legend label if there is no reference of cut off
            let printTheRange = [];
            generateRangeOfDataForColorScale();

            function generateRangeOfDataForColorScale() {
                let startingPoint = d3.min(rawDataFromCSV);
                let endingPoint = d3.max(rawDataFromCSV);
                let theRangeOfData = endingPoint - startingPoint;
                let theProportion = theRangeOfData / 4;
                let initialTheRangeForCalculation = [startingPoint];
                for (let i = 0; i < 4; i++) {
                    printTheRange.push(Math.round(initialTheRangeForCalculation[i] + theProportion));
                    initialTheRangeForCalculation.push(initialTheRangeForCalculation[i] + theProportion);
                }
                return printTheRange
            }

            //If the input has specific color cut off is true
            if (currentActive === defaultActive) {
                //Set Color scale
                let colorScale = d3.scaleThreshold()
                    .domain([0, 0.025, 0.10, 0.20, 0.30])
                    .range([uGrey, uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]);

                //Set tooltips
                let tooltip2 = d3.select("body").append("div")
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
                    .datum(topojson.mesh(lao, lao.objects.LAO_ADM1))
                    .attr("class", "mapBorder")
                    .attr("d", d3.geoPath().projection(projection));
            } else {
                //Set the color scale
                let colorScale = d3.scaleThreshold()
                    .domain(printTheRange)
                    .range([uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]);
                //Set tooltips
                let tooltip2 = d3.select("body").append("div")
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
                    .datum(topojson.mesh(lao, lao.objects.LAO_ADM1))
                    .attr("class", "mapBorder")
                    .attr("d", d3.geoPath().projection(projection));
            }


            //This to checked if the input has the cut off reference for fill the color of map
            if (currentActive !== defaultActive) {
                svg.select(".map-legend").remove();
                svg.append("g")
                    .attr("class", "map-legend")
                    .attr("transform", "translate(0,250)")
                    .append(() => legend({
                        color: d3.scaleThreshold(printTheRange,
                            [uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]),
                        title: "Clustering",
                        width: 190
                    }));
            } else {
                svg.select(".map-legend").remove();
                svg.append("g")
                    .attr("class", "map-legend")
                    .attr("transform", "translate(0,250)")
                    .append(() => legend({
                        color: d3.scaleThreshold(["<2.5", "10", "20", ">=30"],
                            [uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]),
                        title: "WHO Classification, 2017 (%)",
                        width: 190
                    }));
            }
        }
    }
    updateMapOverview();
    //END Update map

    //Update Trend Chart on click input
    // d3.csv(trendDataPath).then(updateBuildTrendOverviewChart); //Read CSV file via D3JS Lib
    // // function updateBuildTrendOverviewChart(value) {
    // //     //Set variable for import data
    // //     let importedValue = value.map(d => d[currentActive]);
    // //     let importedYear = value.map(d => d.year);
    // //
    // //
    // //     //Set width and height
    // //     let width = 440;
    // //     let height = 440;
    // //     let svg = d3.select("#lineChartForOverviewCard"); //Select DOM element to draw to graph
    // //     let margin = ({top: 20, right: 30, bottom: 30, left: 40}); //Set the margin to draw graph
    // //
    // //     //Set line variable to draw a line
    // //     let x = d3.scalePoint() //Use scale point for line category xAxis
    // //         .domain(importedYear)
    // //         .rangeRound([margin.left, width - margin.right]); //Set the length to start
    // //
    // //     let y = d3.scaleLinear()
    // //         .domain([0, 60]) //Show the scale only for 0 to 60
    // //         .range([height - margin.bottom, margin.top]);
    // //     //Set a line using d3.line
    // //     let line = d3.line()
    // //         .x(d => {
    // //             return x(d.year)
    // //         })
    // //         .y(d => {
    // //             return y(d[currentActive])
    // //         });
    // //
    // //     //To filter the line for dash line and normal line
    // //     let a = value.filter(function (d) { //filter data only current and past
    // //         return d["noted"] === "p";
    // //     });
    // //     let b = value.filter(function (d) { //filter data for target goal
    // //         return d["noted"] === "f";
    // //     });
    // //
    // //     //draw a line
    // //     svg.selectAll("path").remove();
    // //     svg.append("circle")
    // //         .datum(value)
    // //         .join()
    // //         .transition()
    // //         .duration(2000)
    // //         .attr("fill", uBlue)
    // //         .attr("stroke", "none")
    // //         .attr("cx", d => d.year)
    // //         .attr("cy", d => d[currentActive])
    // //         .attr("r", 5);
    // //     svg.append("path")
    // //         .datum(value)
    // //         .join()
    // //         .transition()
    // //         .duration(2000)
    // //         .attr("fill", "none")
    // //         .attr("stroke", "steelblue")
    // //         .attr("stroke-width", 2)
    // //         .attr("stroke-linejoin", "round")
    // //         .attr("stroke-linecap", "round")
    // //         .attr("d", line(a));
    // //
    // //
    // //     //Create Axis line
    // //     let xAxis = g => g
    // //         .attr("transform", `translate(0,${height - margin.bottom})`)
    // //         .call(d3.axisBottom(x).ticks(0).tickSizeOuter(0));
    // //
    // //     let yAxis = g => g
    // //         .attr("transform", `translate(${margin.left},0)`)
    // //         .call(d3.axisLeft(y).ticks(5))
    // //         .call(g => g.select(".tick:last-of-type text").clone()
    // //             .attr("x", 3)
    // //             .attr("text-anchor", "start")
    // //             .attr("font-weight", "bold")
    // //             .text("Percentage"));
    // //
    // //     //Then draw a Axis
    // //     svg.selectAll("g").remove();
    // //     svg.append("g")
    // //         .call(xAxis);
    // //     svg.append("g")
    // //         .call(yAxis);
    // //
    // //     //Create a tooltip
    // //     let tooltip3 = d3.select(".tab-content").append("div")
    // //         .attr("class", "tooltip")
    // //         .style("opacity", 0);
    // //
    // //     let labelPadding = 3;
    // //     let z = d3.scaleOrdinal(value.columns.slice(1), d3.schemeCategory10);
    // //
    // //
    // //     svg.append("g")
    // //         .attr("font-family", "sans-serif")
    // //         .attr("font-size", 10)
    // //         .attr("stroke-linecap", "round")
    // //         .attr("stroke-linejoin", "round")
    // //         .attr("text-anchor", "middle")
    // //         .selectAll("text")
    // //         .data(value)
    // //         .join("text")
    // //         .text(d => `${d[currentActive]}`)
    // //         .attr("dy", "0.35em")
    // //         .attr("x", d => x(d.year))
    // //         .attr("y", d => y(d[currentActive]))
    // //         .clone(true).lower()
    // //         .attr("fill", "none")
    // //         .attr("stroke", "white")
    // //         .attr("stroke-width", 6)
    // //         .attr("class", "text-legend");
    // //
    // //
    // //     // svg.selectAll("path")
    // //     //     .data(value)
    // //     //     .on("mouseover", function(d) {
    // //     //         tooltip2.transition()
    // //     //             .duration(200)
    // //     //             .style("opacity", .9);
    // //     //         tooltip2.html(d.year + '<br>' + 'value:' + d.value)
    // //     //             .style("left", (d3.event.pageX) + "px")
    // //     //             .style("top", (d3.event.pageY - 28) + "px");
    // //     //     })
    // //     //     .on("mouseout", function(d) {
    // //     //         tooltip2.transition()
    // //     //             .duration(500)
    // //     //             .style("opacity", 0);
    // //     //     });
    // //
    // //     svg.node();
    // // }
    // //END Update trend
    let buildTrendOverviewChart = () => {
        document.getElementById("overview-trend-line-chart").remove();
        d3.select("#drawLineChart")
            .append("canvas")
            .attr("id", "overview-trend-line-chart");
        d3.csv(trendDataPath).then(buildTrendOverviewChartIfUndefined);

        function buildTrendOverviewChartIfUndefined(valueOfTrend) {
            //To filter the line for dash line and normal line
            let presentData = valueOfTrend.filter(function (d) { //filter data only current and past
                return d["noted"] === "p";
            });
            let targetData = valueOfTrend.filter(function (d) { //filter data for target goal
                return d["noted"] === "f";
            });

            //Present Value Variable
            let importedPresentValue = presentData.map(d => +d[currentActive]);
            let importedPresentYear = presentData.map(d => d.year);
            //Target Value Variable
            let importedTargetValue = targetData.map(d => +d[currentActive]);
            let importedTargetYear = targetData.map(d => d.year);

            let presentValue = [];
            let targetValue = [];
            let year = valueOfTrend.map(d => d.year);

            const filterNewDatasetFromImportedData = (dataValue, dataYear, newDataVariableName) => {
                for (let i = 0; i < dataValue.length; i++) {
                    newDataVariableName.push({x: dataYear[i], y: dataValue[i]})
                }
            }

            filterNewDatasetFromImportedData(importedPresentValue, importedPresentYear, presentValue);
            filterNewDatasetFromImportedData(importedTargetValue, importedTargetYear, targetValue);


            let getTrendTestChart = document.getElementById("overview-trend-line-chart");
            let trendTestChart = new Chart(getTrendTestChart, {
                data: {
                    labels: year,
                    datasets: [{
                        type: 'line',
                        label: 'trend',
                        data: presentValue,
                        backgroundColor: uBlue,
                        borderColor: uBlue,
                        fill: "none",
                        lineTension: 0,
                        borderWidth: 0,
                        pointRadius: 8,
                    }, {
                        type: 'scatter',
                        label: 'trend',
                        data: targetValue,
                        backgroundColor: uDarkBlue,
                        borderColor: uDarkBlue,
                        fill: "none",
                        borderWidth: 0,
                        pointRadius: 8,
                    }]
                },
                plugins: [ChartDataLabels],
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                            gridLines: {
                                borderDash: [3, 10]
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                drawOnChartArea: false,
                            }
                        }],
                    },
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItem, data) {
                                let specificLabel = ['MICS 3', 'LSIS 1', 'LSIS 2', 'Target 2020', 'Target 2025'];
                                return (tooltipItem[0].datasetIndex === 1) ? specificLabel[tooltipItem[0].index + 3] : specificLabel[tooltipItem[0].index]
                            }
                        }
                    },
                    plugins: {
                        datalabels: {
                            color: uBlack,
                            anchor: 'start',
                            align: 'bottom',
                            formatter: function (value, context) {
                                return (context.dataset.data[context.dataIndex]['y'] + '%');
                            }
                        }
                    },
                }
            });

        }
    }
    buildTrendOverviewChart();
    //Update Province Chart
    let buildUpdateProvinceChart = () => {
        document.getElementById("provinceChartForOverviewCard").remove();
        d3.select("#drawProvinceChart")
            .append("canvas")
            .attr("id", "provinceChartForOverviewCard");
        d3.csv(provinceDataPath).then(buildProvinceOverviewChartIfUndefined);

        function buildProvinceOverviewChartIfUndefined(value) {
            let importedValue = (value.slice().sort((a, b) => b[currentActive] - a[currentActive])).map(d => d[currentActive]);
            let importedProvinceLabel = (value.slice().sort((a, b) => b[currentActive] - a[currentActive])).map(d => d["Province"]);
            let nationalLine = value.map(d => d[[currentActive] + "-national"]);
            let getProvinceTestChart = document.getElementById("provinceChartForOverviewCard");
            let provinceTestChart = new Chart(getProvinceTestChart, {
                type: 'horizontalBar',
                data: {
                    labels: importedProvinceLabel,
                    datasets: [{
                        label: 'trend',
                        data: importedValue,
                        backgroundColor: uBlue,
                        hoverBackgroundColor: uDarkBlue,
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
                    annotation: {
                        events: ["mouseover"],
                        annotations: [{
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x-axis-0',
                            value: nationalLine[0],
                            borderColor: uRed,
                            borderWidth: 1,
                            label: {
                                enabled: true,
                                content: "National " + `${nationalLine[0]}` + "%",
                                position: "center",
                            },
                        }]
                    },
                }
            });


            //Update overview Table Tab Content
            buildTableChart(value);

            function buildTableChart(valueOfTable) {
                d3.select("#overview-data-table-content")
                    .selectAll('tr')
                    .remove();
                d3.select("#overview-data-table-content")
                    .selectAll('tr')
                    .data(valueOfTable)
                    .enter().append('tr')
                    .attr('id', d => "overview-data-table-content-row-" + `${d["Province"]}`)
                    .html(d => {
                        return ('<td>' + `${d["Province"]}` + '</td>' +
                            '<td>' + `${d[currentActive]}` + '</td>')
                    });
            }
        }

    };
    buildUpdateProvinceChart();
    //END Update Province Chart
    let buildUpdateTableChart = () => {

    }
    //Update Table Chart

    //END Update Table Chart


    previousActive = currentActive; //Because we want to know the previous indicator we set the previous variable equal
    // to current active and return the upper function to previous variable

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
