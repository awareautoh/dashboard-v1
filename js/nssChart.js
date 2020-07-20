"use strict";
import * as base from  './base.js';
base.default();
import * as load from './load.js'
load.default();
//Color shade
const red = "#E2231A"; //UNICEF CODE BOOK COLOR
const blue = "#1CABE2"; //UNICEF CODE BOOK COLOR
const darkBlue = "#374EA2"; //UNICEF CODE BOOK COLOR
const yellow = "#FFC20E"; //UNICEF CODE BOOK COLOR
const orange = "#F26A21"; //UNICEF CODE BOOK COLOR
const darkorange = "#806F37";
const lightorange = "#FFDD6E";
const green = "#00833D"; //UNICEF CODE BOOK COLOR
const grey = "#bdbdbd";
const darkGrey = "#777779"; //UNICEF CODE BOOK COLOR
const purple = "#6A1E74";
const colorSetLSISAreaChart = ["#FFAC4DB3", "#BF9C73B3", "#FFCF99B3", "#B37836B3", "#7F5626B3"];
const colorSetLSISEducationChart = ["#C7C7EAB3", "#1739E5B3", "#0F2699B3", "#4455AAB3", "#5C73E5B3", "#0A1A66B3"];
const colorSetLSISEthnicityChart = ["#39806EB3", "#BFFFEFB3", "#608078B3", "#5CCCB0B3", "#73FFDCB3"];
const colorSetLSISWealthChart = ["#4C74A8B3", "#68A0E8B3", "#2F4869B3", "#6EA9F5B3", "#5D8ECFB3"];


//File Path for import data
const nssHHMainSourceIncomePath = "data/nssHHMainSourceIncome.csv";
const nssAnnualHHIncomePath = "data/nssAnnualHHIncome.csv";
const nssMinimumDietPath = "data/nssMinimumDiet.csv";
const nssVitaminAPath = "data/nssVitaminA.csv";
const nssMaternalNutritionPath = "data/nssMaternalNutrition.csv";
const nssStuntingPath = "data/nssStunting.csv";
const nssWastingPath = "data/nssWasting.csv";
const nssUnderweightPath = "data/nssUnderweight.csv";
const nssHHFoodSecurityPath = "data/nssHHFoodInsecurity.csv";
const nssProvincePath = "data/nssProvince.csv";


Promise.all([
    d3.csv(nssHHMainSourceIncomePath),
    d3.csv(nssAnnualHHIncomePath),
    d3.csv(nssMinimumDietPath),
    d3.csv(nssVitaminAPath),
    d3.csv(nssMaternalNutritionPath),
    d3.csv(nssStuntingPath),
    d3.csv(nssWastingPath),
    d3.csv(nssUnderweightPath),
    d3.csv(nssHHFoodSecurityPath),
    d3.csv(nssProvincePath),
]).then(buildChart);

//*************************************/
//Chart.js global config
//*************************************/
Chart.plugins.unregister(ChartDataLabels); //cogfig Chart.JS label pugin not to show label on all chart by default
Chart.defaults.global.plugins.deferred.delay = 250; //Global set up for ChartJS plugin: deffer, delay transition: 500
Chart.defaults.global.plugins.deferred.xOffset = "50%"; //Global set up for ChartJS plugin: deffer, 50% view point to activate plugin
Chart.defaults.global.defaultFontFamily = "'Noto Sans', Helvetica, Arial, sans-serif, 'Noto Sans Lao', Phetsarath OT"; //set font family
Chart.defaults.global.plugins.datalabels.color = '#fff';

//**********************************/
//Build Chart All ChartJS gose here
//*********************************/

function buildChart(value) {
    //Set import data variable
    const nssHHMainSourceIncome = value[0];
    const nssAnnualHHIncome = value[1];
    const nssMinimumDiet = value[2];
    const nssVitaminA = value[3];
    const nssMaternalNutrition = value[4];
    const nssStunting = value[5];
    const nssWasting = value[6];
    const nssUnderweight = value[7];
    const nssHHFoodSecurity = value[8];
    const nssProvince = value[9];

    let province = nssHHMainSourceIncome.map(d => d.province); //Set fix province label


    let targetProvince = nssProvince.map(d => d.province);
    let indexOfOriginProvince = [];

    //Function to re index value based on target province by index
    for (let i = 0; i < nssProvince.length; i++) {
        indexOfOriginProvince.push(province.indexOf(targetProvince[i]));
    }

    function changeOriginValueIndex(indicator, target) {
        for (let i = 0; i < indicator.length; i++) {
            target.push(indicator[indexOfOriginProvince[i]]);
        }
    }

    //****************************************/
    //Section 1: Socio Demographic
    //****************************************/

    //Build Household Main Source Income Chart
    let valueCropAndLivestock = nssHHMainSourceIncome.map(d => d.cropAndLivestock);
    let valueBusiness = nssHHMainSourceIncome.map(d => d.business);
    let valueSalaryAndSkilledWageLabour = nssHHMainSourceIncome.map(d => d.salaryAndSkilledWageLabour);
    let valueUnskilledWageLabour = nssHHMainSourceIncome.map(d => d.unskilledWageLabour);
    let valueOther = nssHHMainSourceIncome.map(d => d.other);

    let replacedValueCropAndLivestock = [];
    let replacedValueBusiness = [];
    let replacedValueSalaryAndSkilledWageLabour = [];
    let replacedValueUnskilledWageLabour = [];
    let replacedValueOther = [];


    changeOriginValueIndex(valueCropAndLivestock, replacedValueCropAndLivestock);
    changeOriginValueIndex(valueBusiness, replacedValueBusiness);
    changeOriginValueIndex(valueSalaryAndSkilledWageLabour, replacedValueSalaryAndSkilledWageLabour);
    changeOriginValueIndex(valueUnskilledWageLabour, replacedValueUnskilledWageLabour);
    changeOriginValueIndex(valueOther, replacedValueOther);


    let getNssHHMainSourceIncome = document.getElementById('nssHHMainSourceIncome').getContext("2d");
    let nssHHMainSourceIncomeChart = new Chart(getNssHHMainSourceIncome, {
        type: 'bar',
        data: {
            labels: targetProvince,
            datasets: [
                {
                    label: 'Crop and live stock sale',
                    data: replacedValueCropAndLivestock,
                    backgroundColor: blue,
                    borderWidth: 0,
                },
                {
                    label: 'Business',
                    data: replacedValueBusiness,
                    backgroundColor: darkBlue,
                    borderWidth: 0,
                },
                {
                    label: 'Salary and skilled wage labour',
                    data: replacedValueSalaryAndSkilledWageLabour,
                    backgroundColor: darkGrey,
                    borderWidth: 0,
                },
                {
                    label: 'Unskilled wage labour',
                    data: replacedValueUnskilledWageLabour,
                    backgroundColor: grey,
                    borderWidth: 0,
                },
                {
                    label: 'Other',
                    data: replacedValueOther,
                    backgroundColor: purple,
                    borderWidth: 0,
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    stacked: true,
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }],
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }]
            },
            maintainAspectRatio: false,
        }
    });

    //Build Household Main Source Income Chart
    let valueL5M = nssAnnualHHIncome.map(d => d["L5M"]);
    let value5M10M = nssAnnualHHIncome.map(d => d["5M10M"]);
    let value10M20M = nssAnnualHHIncome.map(d => d["10M20M"]);
    let valueM20M = nssAnnualHHIncome.map(d => d["M20M"]);

    let replacedValueL5M = [];
    let replacedValue5M10M = [];
    let replacedValue10M20M = [];
    let replacedValueM20M = [];

    changeOriginValueIndex(valueL5M, replacedValueL5M);
    changeOriginValueIndex(value5M10M, replacedValue5M10M);
    changeOriginValueIndex(value10M20M, replacedValue10M20M);
    changeOriginValueIndex(valueM20M, replacedValueM20M);


    let getNssAnnualHHIncome = document.getElementById('nssAnnualHHIncome').getContext("2d");
    let nssAnnualHHIncomeChart = new Chart(getNssAnnualHHIncome, {
        type: 'bar',
        data: {
            labels: targetProvince,
            datasets: [
                {
                    label: 'Less than 5M',
                    data: replacedValueL5M,
                    backgroundColor: blue,
                    borderWidth: 0,
                },
                {
                    label: '5M-10M',
                    data: replacedValue5M10M,
                    backgroundColor: darkBlue,
                    borderWidth: 0,
                },
                {
                    label: '10M-20M',
                    data: replacedValue10M20M,
                    backgroundColor: darkGrey,
                    borderWidth: 0,
                },
                {
                    label: 'More than 20M',
                    data: replacedValueM20M,
                    backgroundColor: grey,
                    borderWidth: 0,
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    stacked: true,
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }],
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }]
            },
            maintainAspectRatio: false,
        }
    });

    //****************************************/
    //Section 2: IYCF
    //****************************************/

    //Build Mininum Accpeptable Diet Chart
    let valueMiniDiet = nssMinimumDiet.map(d => d.value);

    let replacedValueMiniDiet = [];

    changeOriginValueIndex(valueMiniDiet, replacedValueMiniDiet);

    let getNssMiniAcceptDiet = document.getElementById('nssMiniAcceptDiet').getContext("2d");
    let nssMiniAcceptDietChart = new Chart(getNssMiniAcceptDiet, {
        type: 'horizontalBar',
        data: {
            labels: targetProvince,
            datasets: [
                {
                    label: 'Minimum Acceptable Diet',
                    data: replacedValueMiniDiet,
                    backgroundColor: blue,
                    borderWidth: 0,
                },
            ]
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
                }]
            },
            maintainAspectRatio: false,
        }
    });

    //Build Vitamin A Chart
    let valueVitaminA = nssVitaminA.map(d => d.value);

    let replacedValueVitaminA = [];
    changeOriginValueIndex(valueVitaminA, replacedValueVitaminA);

    let getNssVitaminA = document.getElementById('nssVitaminA').getContext("2d");
    let nssVitaminAChart = new Chart(getNssVitaminA, {
        type: 'horizontalBar',
        data: {
            labels: targetProvince,
            datasets: [
                {
                    label: 'Vitamin A Supplementation',
                    data: replacedValueVitaminA,
                    backgroundColor: blue,
                    borderWidth: 0,
                },
            ]
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
                }]
            },
            maintainAspectRatio: false,
        }
    });

    //****************************************/
    //Section 4: Maternal Nutrition
    //****************************************/

    //Build Status of women BMI Chart
    let valueObese = nssMaternalNutrition.map(d => d.obese);
    let valueOverweight = nssMaternalNutrition.map(d => d.overweight);
    let valueWomenUnderweight = nssMaternalNutrition.map(d => d.underweight);

    let replacedValueObese = [];
    let replacedValueOverweight = [];
    let replacedValueWomenUnderweight = [];

    changeOriginValueIndex(valueObese, replacedValueObese);
    changeOriginValueIndex(valueOverweight, replacedValueOverweight);
    changeOriginValueIndex(valueWomenUnderweight, replacedValueWomenUnderweight);


    let getNssWomenBMI = document.getElementById('nssWomenBMI').getContext("2d");
    let nssWomenBMIChart = new Chart(getNssWomenBMI, {
        type: 'bar',
        data: {
            labels: targetProvince,
            datasets: [
                {
                    label: 'Obese',
                    data: replacedValueObese,
                    backgroundColor: blue,
                    borderWidth: 0,
                },
                {
                    label: 'Overweight',
                    data: replacedValueOverweight,
                    backgroundColor: darkBlue,
                    borderWidth: 0,
                },
                {
                    label: 'Underweight',
                    data: replacedValueWomenUnderweight,
                    backgroundColor: darkGrey,
                    borderWidth: 0,
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    stacked: true,
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }],
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }]
            },
            maintainAspectRatio: false,
        }
    });

    //****************************************/
    //Section 5: Child Mulnutrition
    //****************************************/

    //Build Stunting Chart
    let valueStunting = nssStunting.map(d => d.value);
    let valueStuntingLsis = nssStunting.map(d => d.lsis);

    //Build Wasting Chart
    let valueWasting = nssWasting.map(d => d.value);
    let valueWastingLsis = nssWasting.map(d => d.lsis);

    //Build Underweight Chart
    let valueUnderweight = nssUnderweight.map(d => d.value);
    let valueUnderweightLsis = nssUnderweight.map(d => d.lsis);

    //Variable for update on click button
    let lsisStuntingButton = [valueStunting, valueStuntingLsis];
    let lsisWastingButton = [valueWasting, valueWastingLsis];
    let lsisUnderweightButton = [valueUnderweight, valueUnderweightLsis];

    let listTestChart = [
        {"lsisStuntingButton": lsisStuntingButton},
        {"lsisWastingButton": lsisWastingButton},
        {"lsisUnderweightButton": lsisUnderweightButton},
    ]


    //Build Household Food Security Chart

    let getNssChildMulnutrition = document.getElementById('nssChildMulnutrition').getContext("2d");
    let nssChildMulnutritionChart = new Chart(getNssChildMulnutrition, {
        type: 'bar',
        data: {
            labels: targetProvince,
            datasets: [
                {
                    label: 'NSS',
                    data: valueStunting,
                    backgroundColor: blue,
                    borderWidth: 0,
                },
                {
                    label: 'LSIS II',
                    data: valueStuntingLsis,
                    backgroundColor: darkBlue,
                    borderWidth: 0,
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }]
            },
            maintainAspectRatio: false,
        }
    });

    //Funtion to highlight activated button and update data based on click button
    $(document).ready(function () {
        let toolbarLSIS = document.getElementById("toolbarLSIS");
        let btnClass = toolbarLSIS.getElementsByClassName("btn btn-outline-primary");

        //Create a list of this button
        let listLSISButton = [];
        for (let i = 0; i < btnClass.length; i++) {
            listLSISButton.push(btnClass[i].id);
        }

        for (let i = 0; i < btnClass.length; i++) {
            btnClass[i].addEventListener("click", function () { //Add event to capture click
                for (let j = 0; j < btnClass.length; j++) { //remove previous actived element
                    listLSISButton.map(element => {
                        document.getElementById(element).classList.remove("active");
                    });
                }
                //this.classList.add("active"); //Add color highlight for activated button

                //Update data for Child Mulnutrition Chart
                listTestChart.map(element => {
                    if (Object.keys(element) == btnClass[i].id) {
                        nssChildMulnutritionChart.data.datasets[0].data = element[btnClass[i].id][0];
                        nssChildMulnutritionChart.data.datasets[1].data = element[btnClass[i].id][1];
                        nssChildMulnutritionChart.update();
                    }
                });
            });
        }

    });

    //****************************************/
    //Section 6: Household Food Security
    //****************************************/

    //Build Household Food Security Chart
    let valueHHFoodSecurity = nssHHFoodSecurity.map(d => d.value);

    let replacedValueHHFoodSecurity = [];

    changeOriginValueIndex(valueHHFoodSecurity, replacedValueHHFoodSecurity);

    let getNssHHFoodInsecurity = document.getElementById('nssHHFoodInsecurity').getContext("2d");
    let nssHHFoodInsecurityChart = new Chart(getNssHHFoodInsecurity, {
        type: 'bar',
        data: {
            labels: targetProvince,
            datasets: [
                {
                    label: 'Household Food Security',
                    data: replacedValueHHFoodSecurity,
                    backgroundColor: blue,
                    borderWidth: 0,
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }]
            },
            maintainAspectRatio: false,
        }
    });


}


//*************************** */
//Map Section
//*************************** */

//NSS Open Defaction Map
$(document).ready(function () {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let openDefacePath = ("data/nnsOpenDefaceMap.csv");
    //Set Scale
    let colorScale = d3.scaleQuantize([0, 40], d3.schemeOranges[5]);
    //Set tooltips
    let tooltipOpenDeface = d3.select("body").append("div")
        .attr("class", "tooltipOpenDeface")
        .style("opacity", 0);

    //Select DOM
    let svg = d3.select("#nssOpenDefecation");

    //Set variable to import data
    let openDefaceSort = d3.map();
    let promise = [
        d3.json(mapDraw),
        d3.csv(openDefacePath, d => openDefaceSort.set(d.feature_id, +d.ValueOpenDaface))
    ];

    Promise.all(promise).then(creatMap);

    function creatMap(value) {
        let lao = value[0];
        //Draw a graph use "g" because draw multiple path in one time
        //Import Map Topojson type as Geojson structure
        let openDefaceMap = topojson.feature(lao, lao.objects.LAO_ADM1);
        //Set porjection map type
        let projection = d3.geoMercator()
            .fitSize([320, 320], openDefaceMap);

        svg.append("g")
            .selectAll("path")
            .data(openDefaceMap.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", d => colorScale(d.properties.feature_id = openDefaceSort.get(d.properties.feature_id)));

        svg.selectAll("path")
            .data(openDefaceMap.features)
            .on("mouseover", function (d) {
                tooltipOpenDeface.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltipOpenDeface.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltipOpenDeface.transition()
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


        //Add legend
        svg.append("g")
            .attr("transform", "translate(0,250)")
            .append(() => legend({
                color: d3.scaleThreshold(["<10", "<20", "<30", ">=40"],
                    d3.schemeOranges[5]),
                title: "Open Defaction (%)",
                width: 190
            }));
    }
});

//NSS Open Defaction Map
$(document).ready(function () {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let openDefacePath = ("data/nnsDiarrhoealMap.csv");
    //Set Scale
    let colorScale = d3.scaleQuantize([0, 40], d3.schemeOranges[5]);
    //Set tooltips
    let tooltipOpenDeface = d3.select("body").append("div")
        .attr("class", "tooltipOpenDeface")
        .style("opacity", 0);

    //Select DOM
    let svg = d3.select("#nssDiarrhoeal");

    //Set variable to import data
    let openDefaceSort = d3.map();
    let promise = [
        d3.json(mapDraw),
        d3.csv(openDefacePath, d => openDefaceSort.set(d.feature_id, +d.ValueOpenDaface))
    ];

    Promise.all(promise).then(creatMap);

    function creatMap(value) {
        let lao = value[0];
        //Draw a graph use "g" because draw multiple path in one time
        //Import Map Topojson type as Geojson structure
        let openDefaceMap = topojson.feature(lao, lao.objects.LAO_ADM1);
        //Set porjection map type
        let projection = d3.geoMercator()
            .fitSize([320, 320], openDefaceMap);

        svg.append("g")
            .selectAll("path")
            .data(openDefaceMap.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", d => colorScale(d.properties.feature_id = openDefaceSort.get(d.properties.feature_id)));

        svg.selectAll("path")
            .data(openDefaceMap.features)
            .on("mouseover", function (d) {
                tooltipOpenDeface.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltipOpenDeface.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltipOpenDeface.transition()
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


        //Add legend
        svg.append("g")
            .attr("transform", "translate(0,250)")
            .append(() => legend({
                color: d3.scaleThreshold(["<10", "<20", "<30", ">=40"],
                    d3.schemeOranges[5]),
                title: "Open Defaction (%)",
                width: 190
            }));
    }
});