"use strict";

/*
  Version: 1.0
  Created date: 29 Nov 2019
  The national platforms for Nutrition project Lao PDR
  Data Analysis Unit, Center for Development Policy Research
  Ministry of Planning and Investment

*/

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


//File path for import data
const wastingPath = "data/wasting_unsorted.csv";
const anemiaPath = "data/prevalence_of_anemia.csv";
const weightAndObesity = "data/prevalence_overweight_and_obesity.csv";
const IYCFPath = "data/IYCF.csv";
const minimumDietPath = "data/minimumDiet.csv";
const womenDietPath = "data/womenDiet.csv";
const session3Path = "data/session3_data.csv";
const socioStatusPath = "data/socio_status.csv";


Promise.all([
    d3.csv(wastingPath),
    d3.csv(anemiaPath),
    d3.csv(weightAndObesity),
    d3.csv(IYCFPath),
    d3.csv(minimumDietPath),
    d3.csv(womenDietPath),
    d3.csv(session3Path),
    d3.csv(socioStatusPath),
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
//Build Chart All ChartJS goes here
//*********************************/
function buildChart(value) {
    const wasting = value[0];
    const anemia = value[1];
    const overWeightObese = value[2];
    const IYCF = value[3];
    const miniDiet = value[4];
    const womenDiet = value[5];
    const mapSec3 = value[6];
    const socio = value[7];


    //---Child Malnutrition Chart
    //*******************************/
    //START Home Tab Chart
    //*******************************/
    //---Wasting Chart---
    //Create a sub data from main file (sorting list)
    let wastingSort = wasting.slice().sort((a, b) => a["ValueWasting"] - b["ValueWasting"]);
    let overWeightSort = wasting.slice().sort((a, b) => a["ValueOverWeight"] - b["ValueOverWeight"]);
    //Create Variable by Stat index
    let provinceW = wasting.map(d => d["Province"]);
    let valueW = wasting.map(d => d["ValueWasting"]);
    let provinceO = wasting.map(d => d["Province"]);
    let valueO = wasting.map(d => d["ValueOverWeight"]);
    //Sorted Variable for Wasting
    let provinceWSort = wastingSort.map(d => d["Province"]);
    let valueWSort = wastingSort.map(d => d["ValueWasting"]);
    let valueOByWSort = wastingSort.map(d => d["ValueOverWeight"]);
    //Sorted Variable for Overweight
    let provinceOSort = overWeightSort.map(d => d["Province"]);
    let valueOSort = overWeightSort.map(d => d["ValueWasting"]);
    let valueSByOSort = overWeightSort.map(d => d["ValueOverWeight"]);
    let getWastingAndOverweightChart = document.getElementById('wastingAndOverweightChart').getContext("2d");
    let wastingAndOverweightChart = new Chart(getWastingAndOverweightChart, {
        type: 'bar',
        data: {
            labels: provinceW,
            datasets: [{
                label: 'Wasting',
                data: valueW,
                backgroundColor: uBlue,
                borderWidth: 0,
            }, {
                label: 'Overweight',
                data: valueO,
                backgroundColor: uDarkBlue,
                borderWidth: 0,
            }]
        },
        plugins: [ChartDataLabels],
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    gridLines: {
                        borderDash: [3, 5]
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }]
            },
            maintainAspectRatio: false,
            animation: {
                onComplete: function () {
                    let wastingAndOverweightChartURL = wastingAndOverweightChart.toBase64Image();
                    downloadChartDataButton("wastingAndOverweightChartPNGDownload", wastingAndOverweightChartURL);
                    downloadChartDataButton("wastingAndOverweightChartDataDownload", wastingPath);
                }
            }
        }
    });

    //Variable for update on click button
    let overviewWastingButton = [valueWSort, valueOByWSort, provinceW];
    let overviewOverweightButton = [valueOSort, valueSByOSort, provinceOSort];
    let overviewResetButton = [valueW, valueO, provinceW];

    let overviewTestChart = [
        {"overviewWastingButton": overviewWastingButton},
        {"overviewOverweightButton": overviewOverweightButton},
        {"overviewResetButton": overviewResetButton},
    ]

    //Function to highlight activated button and update data based on click button
    let highlightActivatedButton = () => {
        let toolbarOverview = document.getElementById("toolbarOverview");
        let btnClass = toolbarOverview.getElementsByClassName("btn btn-outline-primary");

        //Create a list of this button
        let listOverviewButton = [];
        for (let i = 0; i < btnClass.length; i++) {
            listOverviewButton.push(btnClass[i].id);
        }

        for (let i = 0; i < btnClass.length; i++) {
            btnClass[i].addEventListener("click", function () { //Add event to capture click
                for (let j = 0; j < btnClass.length; j++) { //remove previous activated element
                    listOverviewButton.map(element => {
                        document.getElementById(element).classList.remove("active");
                    });
                }
                //this.classList.add("active"); //Add color highlight for activated button
                //Update data for Child Malnutrition Chart
                overviewTestChart.map(element => {
                    if (Object.keys(element) == btnClass[i].id) {
                        wastingAndOverweightChart.data.datasets[0].data = element[btnClass[i].id][0];
                        wastingAndOverweightChart.data.datasets[1].data = element[btnClass[i].id][1];
                        wastingAndOverweightChart.data.labels = element[btnClass[i].id][2];
                        wastingAndOverweightChart.update();
                    }
                });
            });
        }
    }
    highlightActivatedButton();


//---Women Under nutrition Chart---
    //Creat Women Malnutrition
    let anemiaSort = anemia.slice().sort((a, b) => b.ValueAnemia - a.ValueAnemia);
    let province = anemiaSort.map(d => d.Province); //This province variable represent every province variable in home tab chart
    let WHO = anemiaSort.map(d => d.WHOCutOff);
    let valueAnemia = anemiaSort.map(d => d.ValueAnemia);

    //Creat Women Malnutrition
    let getWomenAnemia = document.getElementById('womenAnemia').getContext("2d");
    let womenAnemia = new Chart(getWomenAnemia, {
        type: 'bar',
        data: {
            labels: province,
            datasets: [
                {
                    label: 'WHO Cutoff 20%',
                    data: WHO,
                    type: 'line',
                    fill: false,
                    borderColor: uRed,
                    pointStyle: "line",
                    borderWidth: 0,
                },
                {
                    label: 'Percentage of Women Anemia Prevalence',
                    data: valueAnemia,
                    backgroundColor: uBlue,
                    borderColor: uBlue,
                    borderWidth: 0,
                }

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
                        borderDash: [3, 5],
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

//Creat Women Overweight and Obesity Chart
    let valueWOverWeight = overWeightObese.map(d => d["ValueWomenOverWeight"]);
    let valueWObese = overWeightObese.map(d => d["ValueObese"]);
    let getWomenOverweightAndObese = document.getElementById('womenOverweightAndObese').getContext("2d");
    let womenOverweightAndObese = new Chart(getWomenOverweightAndObese, {
        type: 'bar',
        data: {
            labels: province,
            datasets: [{
                label: 'Women Overweight',
                data: valueWOverWeight,
                backgroundColor: uBlue,
                borderWidth: 0,
            },
                {
                    label: 'Women Obese',
                    data: valueWObese,
                    backgroundColor: uDarkBlue,
                    borderWidth: 0,
                }]
        },
        plugins: [ChartDataLabels],
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

//Section 2 Chart: Immediate determinants of under nutrition

//IYCF Chart
    //Set Variable for Initiation Breastfeeding Chart
    // let initiationBreastSort = IYCF.slice().sort((a, b) => b.ValueEarlyBreast - a.ValueEarlyBreast);
    // let valueInitiationBreast = initiationBreastSort.map(d => d.ValueEarlyBreast);
    // let provinceInitiationBreast = initiationBreastSort.map(d => d.Province);
    // //Set Variable for Exclusive Breastfeeding Chart
    // let exclusiveBreastSort = IYCF.slice().sort((a, b) => b.ValueExclusiveBreast - a.ValueExclusiveBreast);
    // let valueExclusiveBreast = exclusiveBreastSort.map(d => d.ValueExclusiveBreast);
    // let provinceExclusiveBreast = exclusiveBreastSort.map(d => d.Province);
    // let NPANTargetIYCF = IYCF.map(d => d.NPANTarget);
    // let getExclusiveBreastfeeding = document.getElementById('exclusive-breastfeeding-chart').getContext("2d");
    // let exclusiveBreastfeedingChart = new Chart(getExclusiveBreastfeeding, {
    //     type: 'bar',
    //     data: {
    //         labels: provinceExclusiveBreast,
    //         datasets: [{
    //             label: 'NPAN Taget 70%',
    //             data: NPANTargetIYCF,
    //             backgroundColor: uRed,
    //             borderColor: uRed,
    //             borderWidth: 0,
    //             type: 'line',
    //             pointStyle: "line",
    //             fill: false,
    //         },
    //             {
    //                 label: 'Exclusive Breastfeeding',
    //                 data: valueExclusiveBreast,
    //                 backgroundColor: uBlue,
    //                 hoverBackgroundColor: uDarkBlue,
    //                 borderWidth: 0,
    //             }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true,
    //                     maxTicksLimit: 5,
    //                 },
    //                 gridLines: {
    //                     borderDash: [3, 10]
    //                 }
    //             }],
    //             xAxes: [{
    //                 gridLines: {
    //                     drawOnChartArea: false,
    //                 }
    //             }],
    //         },
    //         maintainAspectRatio: false,
    //     }
    // });
    // let getEarlyInitiationOfBreastfeedingChart = document.getElementById('early-initiation-of-breastfeeding-chart').getContext("2d");
    // let earlyInitiationOfBreastfeedingChart = new Chart(getEarlyInitiationOfBreastfeedingChart, {
    //     type: 'bar',
    //     data: {
    //         labels: provinceInitiationBreast,
    //         datasets: [{
    //             label: 'NPAN Taget 70%',
    //             data: NPANTargetIYCF,
    //             backgroundColor: uRed,
    //             borderColor: uRed,
    //             borderWidth: 0,
    //             type: 'line',
    //             pointStyle: "line",
    //             fill: false,
    //         },
    //             {
    //                 label: 'Early Initiation of Breastfeeding',
    //                 data: valueInitiationBreast,
    //                 backgroundColor: uBlue,
    //                 hoverBackgroundColor: uDarkBlue,
    //                 borderWidth: 0,
    //             }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true,
    //                     maxTicksLimit: 5,
    //                 },
    //                 gridLines: {
    //                     borderDash: [3, 10]
    //                 }
    //             }],
    //             xAxes: [{
    //                 gridLines: {
    //                     drawOnChartArea: false,
    //                 }
    //             }],
    //         },
    //         maintainAspectRatio: false,
    //     }
    // });

    //By Province
    const creatDatasetForIYCFProvince = (provinceVariable, targetDatasetOfProvince) => {
        IYCF.map(d => {
            if (d["Province"] === provinceVariable) {
                targetDatasetOfProvince.push(+d["ValueEarlyBreast"]);
                targetDatasetOfProvince.push(+d["ValueExclusiveBreast"]);
            }
        });
        miniDiet.map(d => {
            if (d["Province"] === provinceVariable) {
                targetDatasetOfProvince.push(+d["ValueMiniDietDiversity"]);
                targetDatasetOfProvince.push(+d["ValueAcceptDiet"]);
            }
        });
        return targetDatasetOfProvince
    }
    const creatChartForIYCFProvince = (provinceShortName, chartID, provinceDataset) => {
        creatDatasetForIYCFProvince(provinceShortName, provinceDataset)
        let getTemporaryChartID = document.getElementById(chartID).getContext("2d");
        let thisChart = new Chart(getTemporaryChartID, {
            type: 'polarArea',
            data: {
                labels: labelsIYCF,
                datasets: [{
                    label: '',
                    data: provinceDataset,
                    backgroundColor: [uBlue, uDarkBlue, uGrey, uDarkGrey],
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    ticks: {
                        maxTicksLimit: 11,
                        min: 0,
                        max: 100,
                        suggestedMax: 100,
                    }
                },
            }
        });
    }

    //Create Chart for IYCF Section by Province
    //Set province variable for IYCF section
    let IYCFVientianeCapital = [];
    let IYCFPhongsaly = [];
    let IYCFLuangnamtha = [];
    let IYCFBokeo = [];
    let IYCFOudomxay = [];
    let IYCFLuangprabang = [];
    let IYCFHuaphanh = [];
    let IYCFXayabury = [];
    let IYCFXiengkhuang = [];
    let IYCFVientianeProvince = [];
    let IYCFBorikhamxay = [];
    let IYCFKhammuane = [];
    let IYCFSavannakhet = [];
    let IYCFSaravane = [];
    let IYCFSékong = [];
    let IYCFChampasak = [];
    let IYCFAttapeu = [];
    let IYCFXaysomboun = [];
    let labelsIYCF = ['Early Initiation of Breastfeeding', 'Exclusive Breastfeeding',
        'Minimum Diet Diversity', 'Minimum Acceptable Diet'];
    //Activated function for creat a chart for each province
    creatChartForIYCFProvince('VTE', 'IYCF-VientianeCapital-chart', IYCFVientianeCapital);
    creatChartForIYCFProvince('PHO', 'IYCF-Phongsaly-chart', IYCFPhongsaly);
    creatChartForIYCFProvince('LNT', 'IYCF-Luangnamtha-chart', IYCFLuangnamtha);
    creatChartForIYCFProvince('BK', 'IYCF-Bokeo-chart', IYCFBokeo);
    creatChartForIYCFProvince('ODX', 'IYCF-Oudomxay-chart', IYCFOudomxay);
    creatChartForIYCFProvince('LPB', 'IYCF-Luangprabang-chart', IYCFLuangprabang);
    creatChartForIYCFProvince('HPH', 'IYCF-Huaphanh-chart', IYCFHuaphanh);
    creatChartForIYCFProvince('XYB', 'IYCF-Xayabury-chart', IYCFXayabury);
    creatChartForIYCFProvince('XK', 'IYCF-Xiengkhuang-chart', IYCFXiengkhuang);
    creatChartForIYCFProvince('VTP', 'IYCF-VientianeProvince-chart', IYCFVientianeProvince);
    creatChartForIYCFProvince('BKX', 'IYCF-Borikhamxay-chart', IYCFBorikhamxay);
    creatChartForIYCFProvince('KHM', 'IYCF-Khammuane-chart', IYCFKhammuane);
    creatChartForIYCFProvince('SVK', 'IYCF-Savannakhet-chart', IYCFSavannakhet);
    creatChartForIYCFProvince('SLV', 'IYCF-Saravane-chart', IYCFSaravane);
    creatChartForIYCFProvince('SK', 'IYCF-Sékong-chart', IYCFSékong);
    creatChartForIYCFProvince('CPS', 'IYCF-Champasak-chart', IYCFChampasak);
    creatChartForIYCFProvince('ATP', 'IYCF-Attapeu-chart', IYCFAttapeu);
    creatChartForIYCFProvince('XSB', 'IYCF-Xaysomboun-chart', IYCFXaysomboun);

//MiniDiet Chart
//     //Set Variable for Minimum Diet Diversity Chart
//     let miniDietSort = miniDiet.slice().sort((a, b) => b.ValueMiniDietDiversity - a.ValueMiniDietDiversity);
//     let valueMiniDiet = miniDietSort.map(d => d.ValueMiniDietDiversity);
//     let provinceMiniDiet = miniDietSort.map(d => d.Province);
//     //Set Variable for Minimum Acceptable Diet
//     let acceptDietSort = miniDiet.slice().sort((a, b) => b.ValueAcceptDiet - a.ValueAcceptDiet);
//     let valueAcceptDiet = acceptDietSort.map(d => d.ValueAcceptDiet);
//     let provinceAcceptDiet = acceptDietSort.map(d => d.Province);
//     let NPANTargetMiniDiet = miniDiet.map(d => d.NPANTarget);
//     let getMiniDietChart = document.getElementById('prevalence-of-minimum-diet-diversity-chart').getContext("2d");
//     let miniDietChart = new Chart(getMiniDietChart, {
//         type: 'bar',
//         data: {
//             labels: provinceMiniDiet,
//             datasets: [{
//                 label: 'NPAN Taget 50%',
//                 data: NPANTargetMiniDiet,
//                 backgroundColor: uRed,
//                 borderColor: uRed,
//                 borderWidth: 0,
//                 type: 'line',
//                 pointStyle: "line",
//                 fill: false,
//             }, {
//                 label: 'Prevalence of Minimum Diet Diversity',
//                 data: valueMiniDiet,
//                 backgroundColor: uBlue,
//                 hoverBackgroundColor: uDarkBlue,
//                 borderWidth: 0,
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true,
//                         maxTicksLimit: 5,
//                     },
//                     gridLines: {
//                         borderDash: [3, 10]
//                     }
//                 }],
//                 xAxes: [{
//                     gridLines: {
//                         drawOnChartArea: false,
//                     }
//                 }],
//             },
//             maintainAspectRatio: false,
//         }
//     });
//     let getAcceptDietChart = document.getElementById('prevalence-of-minimum-acceptable-diet-chart').getContext("2d");
//     let acceptDietChart = new Chart(getAcceptDietChart, {
//         type: 'bar',
//         data: {
//             labels: provinceAcceptDiet,
//             datasets: [{
//                 label: 'NPAN Target 50%',
//                 data: NPANTargetMiniDiet,
//                 backgroundColor: uRed,
//                 borderColor: uRed,
//                 borderWidth: 0,
//                 type: 'line',
//                 pointStyle: "line",
//                 fill: false,
//             }, {
//                 label: 'Prevalence of Minimum Acceptable Diet',
//                 data: valueAcceptDiet,
//                 backgroundColor: uBlue,
//                 hoverBackgroundColor: uDarkBlue,
//                 borderWidth: 0,
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true,
//                         maxTicksLimit: 5,
//                     },
//                     gridLines: {
//                         borderDash: [3, 10]
//                     }
//                 }],
//                 xAxes: [{
//                     gridLines: {
//                         drawOnChartArea: false,
//                     }
//                 }],
//             },
//             maintainAspectRatio: false,
//         }
//     });

//Women Diet Chart
    let womenDietSort = womenDiet.slice().sort((a, b) => b.ValueWomenDiet - a.ValueWomenDiet);
    let valueWomenDiet = womenDietSort.map(d => d.ValueWomenDiet);
    let provinceWomenDiet = womenDietSort.map(d => d.Province)
    //Creat Chart Women Malnutrition
    let getWomenDietChart = document.getElementById('womenDietChart').getContext("2d");
    let womenDietChart = new Chart(getWomenDietChart, {
        type: 'horizontalBar',
        data: {
            labels: provinceWomenDiet,
            datasets: [
                {
                    label: 'Percentage of Women Dietary Diversity',
                    data: valueWomenDiet,
                    backgroundColor: uBlue,
                    borderWidth: 0,
                    order: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }]
            },
            maintainAspectRatio: false,
            annotation: {
                annotations: [{
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 32.4,
                    borderColor: uRed,
                    borderWidth: 1,
                    label: {
                        enabled: true,
                        content: "National 32.4%",
                        position: "center",
                    }
                }]
            }
        }
    });

//Section: Which nutrition-specific interventions are implemented?
    //Set Variable for Vitamin A Chart
    let vitaminASort = mapSec3.slice().sort((a, b) => b.ValueVitA - a.ValueVitA);
    let valueVitA = vitaminASort.map(d => d.ValueVitA);
    let provinceVitA = vitaminASort.map(d => d.Province);
    //Set Variable for Deworming Chart
    let dewormingSort = mapSec3.slice().sort((a, b) => b.ValueDeworm - a.ValueDeworm);
    let valueDeworm = dewormingSort.map(d => d.ValueDeworm);
    let provinceDeworm = dewormingSort.map(d => d.Province);
    //Set Variable for Iron Folic Chart
    let ironFolicSort = mapSec3.slice().sort((a, b) => b.ValueIronFolic - a.ValueIronFolic);
    let valueIronFolic = ironFolicSort.map(d => d.ValueIronFolic);
    let provinceIronFolic = ironFolicSort.map(d => d.Province);
    let nationalIronFolic = mapSec3.map(d => d.NationalIronFolic);

//Creat Chart Vitamin A Supplement Coverage
    let ChartVitA = document.getElementById('vitAChart').getContext("2d");
    let drawVitAChart = new Chart(ChartVitA, {
        type: 'horizontalBar',
        data: {
            labels: provinceVitA,
            datasets: [
                {
                    label: "Percentage of Vitamin A Supplement Coverage",
                    data: valueVitA,
                    backgroundColor: uBlue,
                    borderWidth: 0,
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }]
            },
            maintainAspectRatio: false,
            annotation: {
                events: ["mouseover"],
                annotations: [{
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 38.5,
                    borderColor: uRed,
                    borderWidth: 1,
                    label: {
                        enabled: true,
                        content: "National 38.5%",
                        position: "center",
                    },
                }]
            }
        }
    });

//Creat Chart Children Received Deworming Coverage
    let ChartDeworming = document.getElementById('dewormingChart').getContext("2d");
    let drawDewormingChart = new Chart(ChartDeworming, {
        type: 'horizontalBar',
        data: {
            labels: provinceDeworm,
            datasets: [
                {
                    label: 'Percentage of Who Received Deworming Coverage',
                    data: valueDeworm,
                    backgroundColor: uBlue,
                    borderWidth: 0,
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }]
            },
            maintainAspectRatio: false,
            annotation: {
                events: ["mouseover"],
                annotations: [{
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 38.7,
                    borderColor: uRed,
                    borderWidth: 1,
                    label: {
                        enabled: true,
                        content: "National 38.7%",
                        position: "center",
                    },
                }]
            }
        }
    });

//Creat Chart Iron Folic Coverage
    let chartIronFolic = document.getElementById('ironFolicChart').getContext("2d");
    let drawIronFolic = new Chart(chartIronFolic, {
        type: 'bar',
        data: {
            labels: provinceIronFolic,
            datasets: [
                {
                    label: 'National 25.4%',
                    data: nationalIronFolic,
                    type: 'line',
                    pointStyle: "line",
                    borderWidth: 0,
                    fill: false,
                    backgroundColor: uRed,
                    borderColor: uRed,
                },
                {
                    label: 'Iron/Folic Supplement Coverage',
                    data: valueIronFolic,
                    backgroundColor: uBlue,
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
                }],
            },
            maintainAspectRatio: false,
        }
    });

//---Section 4 Chart

//--->Socio Status Chart
    let socioStatusSort = socio.slice().sort((a, b) => b["ValueSocioStatus"] - a["ValueSocioStatus"]);
    let valueSocio = socioStatusSort.map(d => d["ValueSocioStatus"]);
    let nationalSocio = socioStatusSort.map(d => d["NationalSocioStatus"]);
    let provinceSocio = socioStatusSort.map(d => d["Province"]);
    let getSocioStatusChart = document.getElementById('socioStatusChart').getContext("2d");
    let socioStatusChart = new Chart(getSocioStatusChart, {
        type: 'bar',
        data: {
            labels: provinceSocio,
            datasets: [
                {
                    label: 'National 23.2%',
                    data: nationalSocio,
                    type: 'line',
                    pointStyle: "line",
                    borderWidth: 1,
                    fill: false,
                    backgroundColor: uRed,
                    borderColor: uRed,
                },
                {
                    label: 'Proportion of population below poverty line',
                    data: valueSocio,
                    backgroundColor: uBlue,
                    hoverBackgroundColor: uDarkBlue,
                    borderWidth: 0,
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 6,
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
        }
    });

    //Function to change Language
    function changeLanguage() {
        let inputLanguage = localStorage.getItem('language');
        if ((inputLanguage === null) || (inputLanguage === "en")) {
        } else {
            wastingAndOverweightChart.chart.data.datasets[0].label = 'ເດັກຂາດສານອາຫານຊໍາເຮື້ອແບບຈ໋ອຍ';
            wastingAndOverweightChart.chart.data.datasets[1].label = 'ເດັກນໍ້າໜັກເກີນມາດຕະຖານ';
            drawVitAChart.chart.data.datasets[0].label = "ເປີເຊັນການປົກຫຸ້ມວິຕາມິນເອ";
        }
    }

    changeLanguage();

}

//**********************************************/
//END All ChartJS Section//
//*********************************************/

//*******************************************
//---Section Create Map**********************
//*******************************************
//Open Defecation Map
const defecationMap = () => {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let openDefacePath = ("data/openDefaceMap.csv");
    //Set Scale
    let colorScale = d3.scaleQuantize([0, 40], ["#07d0ff", "#00b0ef", "#008fda", "#1a6fc1", "#374ea2"]);
    //Set tooltips
    let tooltipOpenDeface = d3.select("body").append("div")
        .attr("class", "tooltipOpenDeface")
        .style("opacity", 0);

    //Select DOM
    let svg = d3.select("#openDefaceMap");

    //Set variable to import data
    let openDefaceSort = d3.map();
    let promise = [
        d3.json(mapDraw),
        d3.csv(openDefacePath, d => openDefaceSort.set(d.feature_id, +d["ValueOpenDaface"]))
    ];

    Promise.all(promise).then(creatMap);

    function creatMap(value) {
        let lao = value[0];
        //Draw a graph use "g" because draw multiple path in one time
        //Import Map Topojson type as Geojson structure
        let openDefaceMap = topojson.feature(lao, lao.objects["LAO_ADM1"]);
        //Set projection map type
        let projection = d3.geoMercator()
            .fitSize([320, 320], openDefaceMap);

        svg.append("g")
            .selectAll("path")
            .data(openDefaceMap.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", d => {
                d.properties.feature_id = openDefaceSort.get(d.properties.feature_id);
                return (d.properties.feature_id === 64.6) ? `${uYellow}` : colorScale(d.properties.feature_id);
            });


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
            .datum(topojson.mesh(lao, lao.objects["LAO_ADM1"]))
            .attr("class", "mapBorder")
            .attr("d", d3.geoPath().projection(projection));


        //Add legend
        svg.append("g")
            .attr("transform", "translate(0,250)")
            .append(() => legend({
                color: d3.scaleThreshold(["<10", "20", "30", ">40"],
                    ["#07d0ff", "#00b0ef", "#008fda", "#1a6fc1", "#374ea2"]),
                title: "Open Defecation (%)",
                width: 190
            }));
    }
}
defecationMap();
//Women Status Map
const womenStatusMap = () => {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let womenStatusPath = ("data/womenStatusMap.csv");
    //Set to select SVG DOM
    let svg = d3.select("#womenStatusMap");
    //Set Scale
    let colorScale = d3.scaleThreshold()
        .domain([0.699, 0.799, 0.879, 0.967])
        .range([uGreen, uLightGreen, uBlue, uDarkBlue]);
    //Set tooltips
    let tooltipWomenStatus = d3.select("body").append("div")
        .attr("class", "tooltipWomenStatus")
        .style("opacity", 0);

    //Set variable to import data
    let womenStatusSort = d3.map();
    let promise = [
        d3.json(mapDraw),
        d3.csv(womenStatusPath, d => womenStatusSort.set(d.feature_id, +d["ValueWomenStatus"]))
    ];

    Promise.all(promise).then(creatMap);

    function creatMap(value) {
        let lao = value[0];
        //Set variable for import map data
        let womenStatusMap = topojson.feature(lao, lao.objects["LAO_ADM1"]);
        //Set porjection map type
        let projection = d3.geoMercator()
            .fitSize([320, 320], womenStatusMap);
        //Draw a graph use "g" because draw multiple path in one time
        svg.append("g")
            .selectAll("path")
            .data(womenStatusMap.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", d => colorScale(+(d.properties.feature_id = womenStatusSort.get(d.properties.feature_id)) / 100));

        svg.selectAll("path")
            .data(womenStatusMap.features)
            .on("mouseover", function (d) {
                tooltipWomenStatus.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltipWomenStatus.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltipWomenStatus.transition()
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
            .attr("transform", "translate(0,250)")
            .append(() => legend({
                color: d3.scaleThreshold(["70<", "80", ">88"],
                    [uGreen, uLightGreen, uBlue, uDarkBlue]),
                title: "GER Female Secondary School (%)",
                width: 190
            }));
    }
}
womenStatusMap();
//Stunting 2011 Map
const stunting2011Map = () => {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let stuntingData = ("data/stunting_map.csv");
    //Set to select SVG DOM
    let svg = d3.select("#test");
    //Set Scale
    let colorScale = d3.scaleThreshold()
        .domain([0, 0.025, 0.10, 0.20, 0.30])
        .range([uGrey, uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]);
    //Set tooltips
    let tooltip1 = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //Set variable to import data
    let stuntingSort = d3.map();
    let promise = [
        d3.json(mapDraw),
        d3.csv(stuntingData, d => stuntingSort.set(d.feature_id, +d.ValueStunting11))
    ];

    Promise.all(promise).then(creatMap);

    function creatMap(value) {
        let lao = value[0];
        let stunting = value[1];
        //Import Map Topojson type as Geojson structure
        let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
        //Set projection map type
        let projection = d3.geoMercator()
            .fitSize([320, 320], myMap); //Auto fit SVG refer to svg set at HTML

        //Draw a graph use "g" because draw multiple path in one time
        svg.append("g")
            .selectAll("path")
            .data(myMap.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", d => colorScale((d.properties.feature_id = stuntingSort.get(d.properties.feature_id)) / 100));
        svg.selectAll("path")
            .data(myMap.features)
            .on("mouseover", function (d) {
                tooltip1.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip1.html(d.properties.Name + '<br>' + 'value: ' + d.properties.feature_id)
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
            .attr("transform", "translate(0,250)")
            .append(() => legend({
                color: d3.scaleThreshold(["<2.5", "10", "20", ">=30"],
                    [uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]),
                title: "WHO Classification, 2017 (%)",
                width: 190
            }));


    }
}
stunting2011Map();
//Stunting 2017 Map
const stunting2017Map = () => {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let stuntingData = ("data/stunting_map.csv");
    //Set to select SVG DOM
    let svg = d3.select("#test1");
    //Set Scale
    let colorScale = d3.scaleThreshold()
        .domain([0, 0.025, 0.10, 0.20, 0.30])
        .range([uGrey, uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]);
    //Set tooltips
    let tooltip = d3.select("body").append("div")
        .attr("class", "tooltip1")
        .style("opacity", 0);

    //Set variable to import data
    let stuntingSort1 = d3.map();
    let promise = [
        d3.json(mapDraw),
        d3.csv(stuntingData, d => stuntingSort1.set(d.feature_id, +d.ValueStunting17))
    ];

    Promise.all(promise).then(creatMap);

    function creatMap(value) {
        let lao = value[0];
        let stunting = value[1];
        //Import Map Topojson type as Geojson structure
        let myMap = topojson.feature(lao, lao.objects.LAO_ADM1);
        //Set projection map type
        let projection = d3.geoMercator()
            .fitSize([320, 320], myMap); //Auto fit SVG refer to svg set at HTML

        //Draw a graph use "g" because draw multiple path in one time
        svg.append("g")
            .selectAll("path")
            .data(myMap.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", d => colorScale((d.properties.feature_id = stuntingSort1.get(d.properties.feature_id)) / 100));

        svg.selectAll("path")
            .data(myMap.features)
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.properties.Name + '<br>' + 'value: ' + d.properties.feature_id)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        //Draw a line border for each province
        svg.append("path")
            .datum(topojson.mesh(lao, lao.objects.LAO_ADM1))
            .attr("class", "mapBorder")
            .attr("d", d3.geoPath().projection(projection));

        //Add legend
        svg.append("g")
            .attr("transform", "translate(0,250)")
            .append(() => legend({
                color: d3.scaleThreshold(["<2.5", "10", "20", ">=30"],
                    [uGreen, uLightGreen, uYellow, uBlue, uDarkBlue]),
                title: "WHO Classification, 2017 (%)",
                width: 190
            }));


    }
}
stunting2017Map();
//************************
//END MAP SECTION*********
//************************

// function to save chart js as picture and download data
function downloadChartDataButton(buttonElement, link) {
    document.getElementById(buttonElement).addEventListener('click', () => {
        document.getElementById(buttonElement).href = link;
    });
}

//*******Test Chart on the top of Home tab

//When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function () {
    scrollFunction()
};
function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("navBarTop").style.fontSize = "1rem";
        document.getElementById("navBarTop").style["min-height"] = "auto";
    } else {
        document.getElementById("navBarTop").style.fontSize = "1rem";
        document.getElementById("navBarTop").style["min-height"] = "80px";
    }
}

//Metadata activate area
d3.selectAll('.metadataInfo')
    .on('click', () => {
        $('#metaData').modal('show');
    });
