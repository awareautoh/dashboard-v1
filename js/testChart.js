"use strict";
//Color shade
const uBlue = "#1CABE2"; //UNICEF CODE BOOK COLOR
const uGreen = "#00833D"; //UNICEF CODE BOOK COLOR
const uLightGreen = "#80BD41"; //UNICEF CODE BOOK COLOR
const uYellow = "#FFC20E"; //UNICEF CODE BOOK COLOR
const uOrange = "#F26A21"; //UNICEF CODE BOOK COLOR
const uRed = "#E2231A"; //UNICEF CODE BOOK COLOR
const uDarkRed = "#961A49"; //UNICEF CODE BOOK COLOR
const uPurple = "#6A1E74"; //UNICEF CODE BOOK COLOR
const uGrey = "#D8D1C9"; //UNICEF CODE BOOK
const uDarkGrey = "#777779"; //UNICEF CODE BOOK COLOR
const uBlack = "#2D2926"; //UNICEF CODE BOOK COLOR
const uDarkBlue = "#374EA2"; //UNICEF CODE BOOK COLOR
const colorSetLSISAreaChart = ["#FFAC4DB3", "#BF9C73B3", "#FFCF99B3", "#B37836B3", "#7F5626B3"];
const colorSetLSISEducationChart = ["#C7C7EAB3", "#1739E5B3", "#0F2699B3", "#4455AAB3", "#5C73E5B3", "#0A1A66B3"];
const colorSetLSISEthnicityChart = ["#39806EB3", "#BFFFEFB3", "#608078B3", "#5CCCB0B3", "#73FFDCB3"];
const colorSetLSISWealthChart = ["#4C74A8B3", "#68A0E8B3", "#2F4869B3", "#6EA9F5B3", "#5D8ECFB3"];
//*************************************/
//Chart.js global config
//*************************************/
Chart.plugins.unregister(ChartDataLabels); //cogfig Chart.JS label pugin not to show label on all chart by default
Chart.defaults.global.plugins.deferred.delay = 250; //Global set up for ChartJS plugin: deffer, delay transition: 500
Chart.defaults.global.plugins.deferred.xOffset = "50%"; //Global set up for ChartJS plugin: deffer, 50% view point to activate plugin
Chart.defaults.global.defaultFontFamily = "'Noto Sans', Helvetica, Arial, sans-serif, 'Noto Sans Lao', Phetsarath OT"; //set font family
Chart.defaults.global.plugins.datalabels.color = '#fff';

const trendDataPath = "data/trendTest.csv"; //Create Variable Path
const provinceDataPath = "data/provinceTest.csv" //Create Variable Path
const twentyOneIndicatorPath = "data/21-indicators.csv";
d3.csv(trendDataPath).then(buildTrendOverviewChart);
d3.csv(provinceDataPath).then(buildProvinceOverviewChart);
d3.csv(provinceDataPath).then(buildProvinceTableChart);

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
                        let specificLabel = ['LSIS 1', 'LCASS','LSIS 2', 'Target 2020', 'Target 2025'];
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

    function clickUpdateTrendChart () {
        function updateTrendChart (inputValue) {
            //
            //Present Value Variable
            let updateImportedPresentValue = presentData.map(d => +d[inputValue]);
            let updateImportedPresentYear = presentData.map(d => d.year);
            //Target Value Variable
            let updateImportedTargetValue = targetData.map(d => +d[inputValue]);
            let updateImportedTargetYear = targetData.map(d => d.year);
            let updatePresentValue = [];
            let updateTargetValue = [];

            filterNewDatasetFromImportedData(updateImportedPresentValue, updateImportedPresentYear, updatePresentValue);
            filterNewDatasetFromImportedData(updateImportedTargetValue, updateImportedTargetYear, updateTargetValue);
            //
            trendTestChart.data.datasets[0].data = updatePresentValue;
            trendTestChart.data.datasets[1].data = updateTargetValue;
            trendTestChart.update();
        }
        //Activate Function generateResult
        document.getElementById("overview-stunting").addEventListener("click", () => updateTrendChart("overview-stunting"));
        document.getElementById("overview-wasting").addEventListener("click", () => updateTrendChart("overview-wasting"));
        document.getElementById("overview-underweight").addEventListener("click", () => updateTrendChart("overview-underweight"));
        document.getElementById("overview-c6-c59-anemia").addEventListener("click", () => updateTrendChart("overview-c6-c59-anemia"));
        document.getElementById("overview-wra-15-49-anemia").addEventListener("click", () => updateTrendChart("overview-wra-15-49-anemia"));
        document.getElementById("overview-low-birth-weight").addEventListener("click", () => updateTrendChart("overview-low-birth-weight"));
        document.getElementById("overview-overweight").addEventListener("click", () => updateTrendChart("overview-overweight"));
        document.getElementById("overview-c0-c6-exclusively-breastfed").addEventListener("click", () => updateTrendChart("overview-c0-c6-exclusively-breastfed"));
    }
    clickUpdateTrendChart();

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
    function clickUpdate () {
        function updateChart (inputValue) {
            let updateImportedValue = (valueOfProvince.slice().sort((a, b) => b[inputValue] - a[inputValue])).map(d => d[inputValue]);
            let updateImportedProvinceLabel = (valueOfProvince.slice().sort((a, b) => b[inputValue] - a[inputValue])).map(d => d["Province"]);
            let updateNationalLine = valueOfProvince.map(d => d[inputValue + "-national"]);
            provinceTestChart.data.datasets[0].data = updateImportedValue;
            provinceTestChart.data.labels = updateImportedProvinceLabel;
            provinceTestChart.options.annotation.annotations[0].value = updateNationalLine[0];
            provinceTestChart.options.annotation.annotations[0].label.content = "National " + `${updateNationalLine[0]}` + "%";
            provinceTestChart.update();
        }
        //Activate Function generateResult
        document.getElementById("overview-stunting").addEventListener("click", () => updateChart("overview-stunting"));
        document.getElementById("overview-wasting").addEventListener("click", () => updateChart("overview-wasting"));
        document.getElementById("overview-underweight").addEventListener("click", () => updateChart("overview-underweight"));
        document.getElementById("overview-c6-c59-anemia").addEventListener("click", () => updateChart("overview-c6-c59-anemia"));
        document.getElementById("overview-wra-15-49-anemia").addEventListener("click", () => updateChart("overview-wra-15-49-anemia"));
        document.getElementById("overview-low-birth-weight").addEventListener("click", () => updateChart("overview-low-birth-weight"));
        document.getElementById("overview-overweight").addEventListener("click", () => updateChart("overview-overweight"));
        document.getElementById("overview-c0-c6-exclusively-breastfed").addEventListener("click", () => updateChart("overview-c0-c6-exclusively-breastfed"));
    }
    clickUpdate();
}
//END Province Chart
//
function buildProvinceTableChart(value) {
    d3.select("#overview-data-table-content")
        .selectAll('tr')
        .data(value)
        .enter().append('tr')
        .attr('id', d => "overview-data-table-content-row-" + `${d["Province"]}`)
        .html(d => {
            return ('<td>' + `${d["Province"]}` + '</td>' +
                '<td>' + `${d["overview-stunting"]}` + '</td>')
        });
    function clickUpdateTableChart () {
        function updateTableChart (inputValue) {
            d3.select("#overview-data-table-content")
                .selectAll("tr")
                .data(value)
                .join("tr")
                .html(d => {
                return ('<td>' + `${d["Province"]}` + '</td>' +
                    '<td>' + `${d[inputValue]}` + '</td>')
                });
        }
        //Activate Function generateResult
        document.getElementById("overview-stunting").addEventListener("click", () => updateTableChart("overview-stunting"));
        document.getElementById("overview-wasting").addEventListener("click", () => updateTableChart("overview-wasting"));
        document.getElementById("overview-underweight").addEventListener("click", () => updateTableChart("overview-underweight"));
        document.getElementById("overview-c6-c59-anemia").addEventListener("click", () => updateTableChart("overview-c6-c59-anemia"));
        document.getElementById("overview-wra-15-49-anemia").addEventListener("click", () => updateTableChart("overview-wra-15-49-anemia"));
        document.getElementById("overview-low-birth-weight").addEventListener("click", () => updateTableChart("overview-low-birth-weight"));
        document.getElementById("overview-overweight").addEventListener("click", () => updateTableChart("overview-overweight"));
        document.getElementById("overview-c0-c6-exclusively-breastfed").addEventListener("click", () => updateTableChart("overview-c0-c6-exclusively-breastfed"));
    }
    clickUpdateTableChart();
}
//Table Chart

//END Table Chart
// Map Chart
//
let mapOverview = () => {
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

    //Update Map Function
    function clickUpdateMap () {
        function updateMapChart (input) {
            let mapTestSort = d3.map();
            let promise = [
                d3.json(mapDraw),
                d3.csv(mapTestData, d => mapTestSort.set(d.feature_id, +d[input]))
            ];
            Promise.all(promise).then(creatUpdateMapChart);

            function creatUpdateMapChart (value) {
                let lao = value[0];
                //Import Map Topojson type as Geojson structure
                let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
                //Set projection map type
                let projection = d3.geoMercator()
                    .fitSize([400, 400], myMap); //Auto fit SVG refer to svg set at HTML
                svg.selectAll("path")
                    .data(myMap.features)
                    .join("path")
                    .attr("fill", d => colorScale((d.properties.feature_id = mapTestSort.get(d.properties.feature_id)) / 100));
                //Draw a line border for each province
                svg.append("path")
                    .datum(topojson.mesh(lao, lao.objects.LAO_ADM1))
                    .attr("class", "mapBorder")
                    .attr("d", d3.geoPath().projection(projection));
            }
        }
        //Activate Function generateResult
        document.getElementById("overview-stunting").addEventListener("click", () => updateMapChart("overview-stunting"));
        document.getElementById("overview-wasting").addEventListener("click", () => updateMapChart("overview-wasting"));
        document.getElementById("overview-underweight").addEventListener("click", () => updateMapChart("overview-underweight"));
        document.getElementById("overview-c6-c59-anemia").addEventListener("click", () => updateMapChart("overview-c6-c59-anemia"));
        document.getElementById("overview-wra-15-49-anemia").addEventListener("click", () => updateMapChart("overview-wra-15-49-anemia"));
        document.getElementById("overview-low-birth-weight").addEventListener("click", () => updateMapChart("overview-low-birth-weight"));
        document.getElementById("overview-overweight").addEventListener("click", () => updateMapChart("overview-overweight"));
        document.getElementById("overview-c0-c6-exclusively-breastfed").addEventListener("click", () => updateMapChart("overview-c0-c6-exclusively-breastfed"));

    }
    clickUpdateMap();
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
        if (previousActive === undefined) {
            previousActive = defaultActive;
            document.getElementById(previousActive).classList.remove("table-active");
            document.getElementById(currentActive).classList.add("table-active");
        } else {
            document.getElementById(previousActive).classList.remove("table-active");
            document.getElementById(currentActive).classList.add("table-active");
        }
    }

    //Update Map based on click input
    // let updateMapOverview = () => {
    //     //Set variable map directory
    //     let mapDraw = ("map/LAO_ADM1.json");
    //     let mapTestData = ("data/mapTest.csv");
    //     //Set to select SVG DOM
    //     let svg = d3.select("#mapChartForOverviewCard");
    //
    //     //Set variable to import data
    //     //Create function to generate data based on click event
    //     let mapTestSort = d3.map();
    //     let promise = [
    //         d3.json(mapDraw),
    //         d3.csv(mapTestData, d => mapTestSort.set(d.feature_id, +d[currentActive])),
    //         d3.csv(mapTestData, d => +d[currentActive])
    //     ];
    //     Promise.all(promise).then(creatMapOverview);
    //
    //     function creatMapOverview(value) {
    //         let lao = value[0];
    //         let testStunting = value[1];
    //         let rawDataFromCSV = value[2];
    //         //To generate initial Legend label if there is no reference of cut off
    //         let printTheRange = [];
    //         generateRangeOfDataForColorScale();
    //
    //         function generateRangeOfDataForColorScale() {
    //             let startingPoint = d3.min(rawDataFromCSV);
    //             let endingPoint = d3.max(rawDataFromCSV);
    //             let theRangeOfData = endingPoint - startingPoint;
    //             let theProportion = theRangeOfData / 4;
    //             let initialTheRangeForCalculation = [startingPoint];
    //             for (let i = 0; i < 4; i++) {
    //                 printTheRange.push(Math.round(initialTheRangeForCalculation[i] + theProportion));
    //                 initialTheRangeForCalculation.push(initialTheRangeForCalculation[i] + theProportion);
    //             }
    //             return printTheRange
    //         }
    //
    //         //If the input has specific color cut off is true
    //         if (currentActive === defaultActive) {
    //             //Set Color scale
    //             let colorScale = d3.scaleThreshold()
    //                 .domain([0, 0.025, 0.10, 0.20, 0.30])
    //                 .range([uGrey, uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]);
    //
    //             //Set tooltips
    //             let tooltip2 = d3.select("body").append("div")
    //                 .attr("class", "tooltip")
    //                 .style("opacity", 0);
    //             //Import Map Topojson type as Geojson structure
    //             let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
    //             //Set projection map type
    //             let projection = d3.geoMercator()
    //                 .fitSize([400, 400], myMap); //Auto fit SVG refer to svg set at HTML
    //
    //             //Draw a graph use "g" because draw multiple path in one time
    //             svg.selectAll("path").remove();
    //             svg.append("g")
    //                 .selectAll("path")
    //                 .data(myMap.features)
    //                 .join("path")
    //                 .attr("d", d3.geoPath().projection(projection))
    //                 .attr("fill", d => colorScale((d.properties.feature_id = mapTestSort.get(d.properties.feature_id) / 100)))
    //                 .on("mouseover", function update(d) {
    //                     tooltip2.transition()
    //                         .duration(200)
    //                         .style("opacity", .9);
    //                     tooltip2.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
    //                         .style("left", (d3.event.pageX) + "px")
    //                         .style("top", (d3.event.pageY - 28) + "px");
    //                 })
    //                 .on("mouseout", function (d) {
    //                     tooltip2.transition()
    //                         .duration(500)
    //                         .style("opacity", 0);
    //                 });
    //
    //
    //             //Draw a line border for each province
    //             svg.append("path")
    //                 .datum(topojson.mesh(lao, lao.objects.LAO_ADM1))
    //                 .attr("class", "mapBorder")
    //                 .attr("d", d3.geoPath().projection(projection));
    //         } else {
    //             //Set the color scale
    //             let colorScale = d3.scaleThreshold()
    //                 .domain(printTheRange)
    //                 .range([uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]);
    //             //Set tooltips
    //             let tooltip2 = d3.select("body").append("div")
    //                 .attr("class", "tooltip")
    //                 .style("opacity", 0);
    //             //Import Map Topojson type as Geojson structure
    //             let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
    //             //Set projection map type
    //             let projection = d3.geoMercator()
    //                 .fitSize([400, 400], myMap); //Auto fit SVG refer to svg set at HTML
    //
    //             //Draw a graph use "g" because draw multiple path in one time
    //             svg.selectAll("path").remove();
    //             svg.append("g")
    //                 .selectAll("path")
    //                 .data(myMap.features)
    //                 .join("path")
    //                 .attr("d", d3.geoPath().projection(projection))
    //                 .attr("fill", d => colorScale((d.properties.feature_id = mapTestSort.get(d.properties.feature_id))))
    //                 .on("mouseover", function update(d) {
    //                     tooltip2.transition()
    //                         .duration(200)
    //                         .style("opacity", .9);
    //                     tooltip2.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
    //                         .style("left", (d3.event.pageX) + "px")
    //                         .style("top", (d3.event.pageY - 28) + "px");
    //                 })
    //                 .on("mouseout", function (d) {
    //                     tooltip2.transition()
    //                         .duration(500)
    //                         .style("opacity", 0);
    //                 });
    //
    //
    //             //Draw a line border for each province
    //             svg.append("path")
    //                 .datum(topojson.mesh(lao, lao.objects.LAO_ADM1))
    //                 .attr("class", "mapBorder")
    //                 .attr("d", d3.geoPath().projection(projection));
    //         }
    //
    //
    //         //This to checked if the input has the cut off reference for fill the color of map
    //         if (currentActive !== defaultActive) {
    //             svg.select(".map-legend").remove();
    //             svg.append("g")
    //                 .attr("class", "map-legend")
    //                 .attr("transform", "translate(0,250)")
    //                 .append(() => legend({
    //                     color: d3.scaleThreshold(printTheRange,
    //                         [uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]),
    //                     title: "Clustering",
    //                     width: 190
    //                 }));
    //         } else {
    //             svg.select(".map-legend").remove();
    //             svg.append("g")
    //                 .attr("class", "map-legend")
    //                 .attr("transform", "translate(0,250)")
    //                 .append(() => legend({
    //                     color: d3.scaleThreshold(["<2.5", "10", "20", ">=30"],
    //                         [uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]),
    //                     title: "WHO Classification, 2017 (%)",
    //                     width: 190
    //                 }));
    //         }
    //     }
    // }
    // updateMapOverview();
    //END Update map
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