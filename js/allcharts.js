"use strict";

/*
  Version: 1.0
  Created date: 29 Nov 2019
  The national platforms for Nutrition project Lao PDR
  Data Analysis Unit, Center for Development Policy Research
  Ministry of Planning and Inestment

*/

//Color shade
const red = "#E2231A"; //UNICEF CODEBOOK COLOR
const blue = "#1CABE2"; //UNICEF CODEBOOK COLOR
const darkBlue = "#374EA2"; //UNICEF CODEBOOK COLOR
const yellow = "#FFC20E"; //UNICEF CODEBOOK COLOR
const orange = "#F26A21"; //UNICEF CODEBOOK COLOR
const darkorange = "#806F37";
const lightorange = "#FFDD6E";
const green = "#00833D"; //UNICEF CODEBOOK COLOR
const grey = "#bdbdbd";
const purpleXorange = "#999EFF";
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
Chart.defaults.global.defaultFontFamily ='Phetsarath OT', 'sans-serif', 'Arial', 'Helvetica'; //set font family
Chart.defaults.global.defaultFontSize=14; //set font size


//**********************************/
//Build Chart All ChartJS gose here
//*********************************/
function buildChart (value) {
  const wasting = value[0];
  const anemia = value[1];
  const overWeightObese = value[2];
  const IYCF = value[3];
  const miniDiet = value[4];
  const womenDiet = value[5];
  const mapSec3 = value[6];
  const socio = value[7];



  //---Child Mulnutrtion Chart
  //*******************************/
  //START Home Tab Chart
  //*******************************/
  //---Wasting Chart---
  //Create a sub data from main file (sorting list)
  let wastingSort = wasting.slice().sort((a, b) => a.ValueWasting - b.ValueWasting);
  let overWeightSort = wasting.slice().sort((a, b) => a.ValueOverWeight - b.ValueOverWeight);
  //Create Variable by Stat index
  let provinceW = wasting.map(d => d.Province);
  let valueW = wasting.map(d => d.ValueWasting);
  let provinceO = wasting.map(d => d.Province);
  let valueO = wasting.map(d => d.ValueOverWeight);
  //Sorted Variable for Wasting
  let provinceWSort = wastingSort.map(d => d.Province);
  let valueWSort = wastingSort.map(d => d.ValueWasting);
  let valueOByWSort = wastingSort.map(d => d.ValueOverWeight);
  //Sorted Variable for Overweight
  let provinceOSort = overWeightSort.map(d => d.Province);
  let valueOSort = overWeightSort.map(d => d.ValueWasting);
  let valueSByOSort = overWeightSort.map(d => d.ValueOverWeight);
  let getWastingAndOverweightChart = document.getElementById('wastingAndOverweightChart').getContext("2d");
  let wastingAndOverweightChart = new Chart(getWastingAndOverweightChart, {
    type: 'bar',
    data: {
      labels: provinceW,
      datasets: [{
        label: 'Wasting',
        data: valueW,
        backgroundColor: blue,
        borderWidth: 0,
      },{
        label: 'Overweight',
        data: valueO,
        backgroundColor: darkBlue,
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
        onComplete: function() {
          let wastingAndOverweightChartURL = wastingAndOverweightChart.toBase64Image();
          downloadChartDataButton( "#wastingAndOverweightChartPNGDownload", wastingAndOverweightChartURL );
          downloadChartDataButton( "#wastingAndOverweightChartDataDownload", wastingPath );
        }
      }
    }
  });

  //Variable for update on click button
  let overviewWastingButton = [valueWSort, valueOByWSort, provinceW];
  let overviewOverweightButton = [valueOSort, valueSByOSort, provinceOSort];
  let overviewResetButton = [valueW, valueO, provinceW];

  let overviewTestChart = [
    {"overviewWastingButton":overviewWastingButton},
    {"overviewOverweightButton": overviewOverweightButton},
    {"overviewResetButton": overviewResetButton},
  ]

  //Function to highlight activated button and update data based on click button
  $(document).ready(function () {
    let toolbarOverview = document.getElementById("toolbarOverview");
    let btnClass = toolbarOverview.getElementsByClassName("btn btn-outline-primary");

    //Create a list of this button
    let listOverviewButton = [];
    for (let i = 0; i < btnClass.length; i++) {
      listOverviewButton.push(btnClass[i].id);
    }

    for (let i=0; i< btnClass.length; i++) {
      btnClass[i].addEventListener("click", function () { //Add event to capture click
        for (let j = 0; j < btnClass.length; j++) { //remove previous actived element
          listOverviewButton.map(element => {
            document.getElementById(element).classList.remove("active");
          });
        }
        //this.classList.add("active"); //Add color highlight for activated button
        //Update data for Child Mulnutrition Chart
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
  });


//---Women Undernutrition Chart---
    //Creat Women Mulnutriotion
    let province = anemia.map(d => d.Province); //This province variable represent every province variable in home tab chart
    let WHO = anemia.map(d => d.WHOCutOff);
    let valueAnemia = anemia.map(d=> d.ValueAnemia);


    //Creat Women Mulnutrtion
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
                    borderColor: red,
                    pointStyle: "line",
                    borderWidth: 0,
                },
                {
                    label: 'Percentage of Women Anemia Prevalence',
                    data: valueAnemia,
                    backgroundColor: blue,
                    borderColor: blue,
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

//Creat Women Overweight and Obesiry Chart
  let valueWOverWeight = overWeightObese.map(d => d.ValueWomenOverWeight);
  let valueWObese = overWeightObese.map(d => d.ValueObese);
  let getWomenOverweightAndObese = document.getElementById('womenOverweightAndObese').getContext("2d");
  let womenOverweightAndObese = new Chart(getWomenOverweightAndObese, {
    type: 'bar',
    data: {
      labels: province,
      datasets: [{
        label: 'Women Overweight',
        data: valueWOverWeight,
        backgroundColor: blue,
        borderWidth: 0,
      },
      {
        label: 'Women Obese',
        data: valueWObese,
        backgroundColor: darkBlue,
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

//Section 2 Chart: Immediate determinants of undernutrition

//IYCF Chart
  let valueInitiationBreast = IYCF.map(d => d.ValueEarlyBreast);
  let valueExclusiveBreast = IYCF.map(d => d.ValueExclusiveBreast);
  let NPANTagetIYCF = IYCF.map(d => d.NPANTarget);
  let getIYCFChart = document.getElementById('IYCFChart').getContext("2d");
  let IYCFChart = new Chart(getIYCFChart, {
    type: 'bar',
    data: {
      labels: province,
      datasets: [{
          label: 'NPAN Taget 70%',
          data: NPANTagetIYCF,
          backgroundColor: red,
          borderColor: 'red',
          borderWidth: 0,
          type: 'line',
          pointStyle: "line",
          fill: false,
      },
      {
        label: 'Early Initiation of Breastfeeding',
        data: valueInitiationBreast,
        backgroundColor: blue,
        borderWidth: 0,
      },
      {
        label: 'Exclusive Breastfeeding',
        data: valueExclusiveBreast,
        backgroundColor: darkBlue,
        borderWidth: 0,
      }]
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

//MiniDiet Chart
    let valueMiniDiet = miniDiet.map(d => d.ValueMiniDietDiversity);
    let valueAcceptDiet = miniDiet.map(d => d.ValueAcceptDiet);
    let NPANTagetMiniDiet = miniDiet.map(d => d.NPANTarget);
    let getMiniDietChart = document.getElementById('miniDietChart').getContext("2d");
    let miniDietChart = new Chart(getMiniDietChart, {
        type: 'bar',
        data: {
            labels: province,
            datasets: [{
                label: 'NPAN Taget 50%',
                data: NPANTagetMiniDiet,
                backgroundColor: red,
                borderColor: 'red',
                borderWidth: 0,
                type: 'line',
                pointStyle: "line",
                fill: false,
            }, {
                label: 'Prevalance of Minimum Diet Diversity',
                data: valueMiniDiet,
                backgroundColor: blue,
                borderWidth: 0,
            }, {
                label: 'Prevalance of Minimum Acceptable Diet',
                data: valueAcceptDiet,
                backgroundColor: darkBlue,
                borderWidth: 0,
            }]
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

//Women Diet Chart
    let valueWomenDiet = womenDiet.map(d => d.ValueWomenDiet);
    //Creat Chart Women Mulnutrtion
    let getWomenDietChart = document.getElementById('womenDietChart').getContext("2d");
    let womenDietChart = new Chart(getWomenDietChart, {
        type: 'horizontalBar',
        data: {
            labels: province,
            datasets: [
                {
                    label: 'Percentage of Women Dietary Diversity',
                    data: valueWomenDiet,
                    backgroundColor: blue,
                    borderWidth: 0,
                    order: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
						maxTicksLimit:10,
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 9,
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
                    borderColor: red,
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

//Map Section 3
    let valueVitA = mapSec3.map(d => d.ValueVitA);
    let valueDeworm = mapSec3.map(d => d.ValueDeworm);
    let valueIronFolic = mapSec3.map(d => d.ValueIronFolic);
    let nationalIronFolic = mapSec3.map(d => d.NationalIronFolic);

//Creat Chart Vitamin A Supplement Coverage
    let ChartVitA = document.getElementById('vitAChart').getContext("2d");
    let drawVitAChart = new Chart(ChartVitA, {
        type: 'horizontalBar',
        data: {
            labels: province,
            datasets: [
                {
                    label: "Percentage of Vitamin A Supplement Coverage",
                    data: valueVitA,
                    backgroundColor: blue,
                    borderWidth: 0,
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
						maxTicksLimit: 10,
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 9,
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
                    borderColor: red,
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
            labels: province,
            datasets: [
                {
                    label: 'Percentage of Who Received Deworming Coverage',
                    data: valueDeworm,
                    backgroundColor: blue,
                    borderWidth: 0,
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
						maxTicksLimit: 10,
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 9,
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
                    borderColor: red,
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
            labels: province,
            datasets: [
                {
                    label: 'National 25.4%',
                    data: nationalIronFolic,
                    type: 'line',
                    pointStyle: "line",
                    borderWidth: 0,
                    fill: false,
                    backgroundColor: red,
                    borderColor: red,
                },
                {
                    label: 'Iron/Folic Supplement Coverage',
                    data: valueIronFolic,
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
                }],
            },
            maintainAspectRatio: false,
        }
    });

//---Section 4 Chart

//--->Socio Status Chart
    let valueSocio = socio.map(d => d.ValueSocioStatus);
    let nationalSocio = socio.map(d => d.NationalSocioStatus);
    let getSocioStatusChart = document.getElementById('socioStatusChart').getContext("2d");
    let socioStatusChart = new Chart(getSocioStatusChart, {
        type: 'bar',
        data: {
            labels: province,
            datasets: [
                {
                    label: 'National 23.2%',
                    data: nationalSocio,
                    type: 'line',
                    pointStyle: "line",
                    borderWidth: 1,
                    fill: false,
                    backgroundColor: red,
                    borderColor: red,
                },
                {
                    label: 'Proportion of population below proverty line',
                    data: valueSocio,
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
                        maxTicksLimit: 6,
                    },
                    gridLines: {
                        borderDash: [3, 10]
                    }
                }],
                xAxes: [{
					ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 12,
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
            },
            maintainAspectRatio: false,
        }
    });

//Provincial Nutrition Committee Graph
//--> Provincial Nutrition Committee Graph
    let getProNutriCommitChart = document.getElementById('proNutriCommitChart').getContext("2d");
    let proNutriCommitChart = new Chart(getProNutriCommitChart, {
        type: 'doughnut',
        data: {
            labels: ['Provincial Nutrition Committees 100%'],
            datasets: [{
                    label: '',
                    data: [100,0],
                    backgroundColor: blue,
                    borderWidth: 0

                }]
        },
        options: {
            maintainAspectRatio: false,
            cutoutPercentage: 88,
            pluginDH2:[],
            tooltips: {
                enabled: false
            },
            legend: {
                display: false,
            },
        },

    });


    //--> Provincial Using DHIS2 Graph
    let getDistrictDHIS2Chart = document.getElementById('districtDHIS2Chart').getContext("2d");
    let districtDHIS2Chart = new Chart(getDistrictDHIS2Chart, {
        type: 'doughnut',
        data: {
            labels: ['Districts using DHIS2 100%'],
            datasets: [{
                    label: '',
                    data: [100],
                    backgroundColor: blue,
                    borderWidth: 0

                }]
        },
        options: {
            maintainAspectRatio: false,
            cutoutPercentage: 88,
            pluginDH2:[],
            tooltips: {
                enabled: false
            },
            legend: {
                display: false
            },
        }
    });

    //Function to change Language
    function changeLanguage() {
        let inputLanguage = localStorage.getItem( 'language' );
        if ( ( inputLanguage === null ) || ( inputLanguage === "en" ) ) {
        } else {
            wastingAndOverweightChart.chart.data.datasets[0].label = 'ເດັກຂາດສານອາຫານຊໍາເຮື້ອແບບຈ໋ອຍ';
            wastingAndOverweightChart.chart.data.datasets[1].label = 'ເດັກນໍ້າໜັກເກີນມາດຕະຖານ';
            drawVitAChart.chart.data.datasets[0].label = "ເປີເຊັນການປົກຫຸ້ມວິຕາມິນເອ";
        }
        //console.log(drawVitAChart);
    }

    changeLanguage();

};

//**********************************************/
//END All ChartJS Section//
//*********************************************/

//*******************************************
//---Section Create Map**********************
//*******************************************
//Open Defaction Map
$(document).ready(function () {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let openDefacePath = ("data/openDefaceMap.csv");
    //Set Scale
    let colorScale = d3.scaleQuantize([0, 40], d3.schemeOranges[5]);
    //Set tooltips
    let tooltipOpenDeface = d3.select(".tab-content").append("div")
    .attr("class", "tooltipOpenDeface")
    .style("opacity", 0);

    //Select DOM
    let svg = d3.select("#openDefaceMap");

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
            .on("mouseover", function(d) {
                tooltipOpenDeface.transition()
                .duration(200)
                .style("opacity", .9);
                tooltipOpenDeface.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltipOpenDeface.transition()
                .duration(500)
                .style("opacity", 0);
            });

        //Draw a line border for each province
        svg.append("path")
            .datum(topojson.mesh(lao, lao.objects.LAO_ADM1, function(a, b) { return a !== b; }))
            .attr("class", "mapBorder")
            .attr("d", d3.geoPath().projection(projection));


        //Add legend
        svg.append("g")
        .attr("transform", "translate(0,250)")
        .append(() => legend({
            color: d3.scaleThreshold(["<10", "<20", "<30", ">=40"],
            d3.schemeOranges[5]),
            title: "Open Defaction (%)",
            width: 190}));
        }
    });

//---->Women Status Map
$(document).ready(function () {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let womenStatusPath = ("data/womenStatusMap.csv");
    //Set to select SVG DOM
    let svg = d3.select("#womenStatusMap");
    //Set Scale
    let colorScale = d3.scaleThreshold()
        .domain([0, 0.699, 0.799, 0.879, 0.967])
        .range(["#fbe9e7", "#f44336", "#ffeb3b", "#8bc34a", "#4caf50"]);
    //Set tooltips
    let tooltipWomenStatus = d3.select(".tab-content").append("div")
    .attr("class", "tooltipWomenStatus")
    .style("opacity", 0);

    //Set variable to import data
    let womenStatusSort = d3.map();
    let promise = [
        d3.json(mapDraw),
        d3.csv(womenStatusPath, d => womenStatusSort.set(d.feature_id, +d.ValueWomenStatus))
    ];

    Promise.all(promise).then(creatMap);
    function creatMap(value) {
        let lao = value[0];
        //Set variable for import map data
        let womenStatusMap = topojson.feature(lao, lao.objects.LAO_ADM1);
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
            .attr("fill", d => colorScale(+(d.properties.feature_id = womenStatusSort.get(d.properties.feature_id))/100));

        svg.selectAll("path")
            .data(womenStatusMap.features)
            .on("mouseover", function(d) {
                tooltipWomenStatus.transition()
                .duration(200)
                .style("opacity", .9);
                tooltipWomenStatus.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltipWomenStatus.transition()
                .duration(500)
                .style("opacity", 0);
            });

        //Draw a line border for each province
        svg.append("path")
            .datum(topojson.mesh(lao, lao.objects.LAO_ADM1, function(a, b) { return a !== b; }))
            .attr("class", "mapBorder")
            .attr("d", d3.geoPath().projection(projection));

        //Add Legend
        svg.append("g")
            .attr("transform", "translate(0,250)")
            .append(() => legend({
                color: d3.scaleThreshold(["70<", "80<", "87.9<", ">88"],
                ["#f44336", "#ffeb3b", "#8bc34a", "#4caf50"]),
                title: "GER Female Secondary School (%)",
                width: 190}));
    }
});

//Stunting 2011 Map
$(document).ready(function () {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let stuntingData = ("data/stunting_map.csv");
    //Set to select SVG DOM
    let svg = d3.select("#test");
    //Set Scale
    let colorScale = d3.scaleThreshold()
        .domain([0, 0.025, 0.10, 0.20, 0.30])
        .range(["#fafafa", "#0091ea",  "#00c853",  "#ffd600", "#ff6d00", "#d50000"]);
    //Set tooltips
    let tooltip1 = d3.select(".tab-content").append("div")
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
            .attr("fill", d => colorScale((d.properties.feature_id = stuntingSort.get(d.properties.feature_id))/100));
        svg.selectAll("path")
            .data(myMap.features)
            .on("mouseover", function(d) {
                tooltip1.transition()
                .duration(200)
                .style("opacity", .9);
                tooltip1.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip1.transition()
                .duration(500)
                .style("opacity", 0);
            });

        //Draw a line border for each province
        svg.append("path")
            .datum(topojson.mesh(lao, lao.objects.LAO_ADM1, function(a, b) { return a !== b; }))
            .attr("class", "mapBorder")
            .attr("d", d3.geoPath().projection(projection));

        //Add Legend
        svg.append("g")
        .attr("transform", "translate(0,250)")
        .append(() => legend({
            color: d3.scaleThreshold(["<2.5", "2.5", "10", "20", ">=30"],
            ["#0091ea",  "#00c853",  "#ffd600", "#ff6d00", "#d50000"]),
            title: "WHO Classification, 2017 (%)",
            width: 190}));


    }
});

//Stunting 2017 Map
$(document).ready(function () {
    //Set variable map directory
    let mapDraw = ("map/LAO_ADM1.json");
    let stuntingData = ("data/stunting_map.csv");
    //Set to select SVG DOM
    let svg = d3.select("#test1");
    //Set Scale
    let colorScale = d3.scaleThreshold()
        .domain([0, 0.025, 0.10, 0.20, 0.30])
        .range(["#fafafa", "#0091ea",  "#00c853",  "#ffd600", "#ff6d00", "#d50000"]);
    //Set tooltips
    let tooltip = d3.select(".tab-content").append("div")
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
            .attr("fill", d => colorScale((d.properties.feature_id = stuntingSort1.get(d.properties.feature_id))/100));

        svg.selectAll("path")
            .data(myMap.features)
            .on("mouseover", function(d) {
                tooltip.transition()
                .duration(200)
                .style("opacity", .9);
                tooltip.html(d.properties.Name + '<br>' + 'value:' + d.properties.feature_id)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            });

        //Draw a line border for each province
        svg.append("path")
            .datum(topojson.mesh(lao, lao.objects.LAO_ADM1, function(a, b) { return a !== b; }))
            .attr("class", "mapBorder")
            .attr("d", d3.geoPath().projection(projection));

        //Add legend
        svg.append("g")
        .attr("transform", "translate(0,250)")
        .append(() => legend({
            color: d3.scaleThreshold(["<2.5", "2.5", "10", "20", ">=30"],
            ["#0091ea",  "#00c853",  "#ffd600", "#ff6d00", "#d50000"]),
            title: "WHO Classification, 2017 (%)",
            width: 190}));



    }
});
//************************
//END MAP SECTION*********
//************************


//Custom plugins for DHIS2 and provinacial committee **********
const jsPluginDH2 = {
  beforeDraw: function(chart)  {

        if(chart.config.options.pluginDH2){
                    var width = chart.chart.width,
                        height = chart.chart.height,
                        ctt = chart.chart.ctx;

                    ctt.restore();
                    var fontSize = (height / 75).toFixed(2);
                    ctt.font = fontSize + "em sans-serif";
                    ctt.textBaseline = "middle";

                    var text = "100%",
                        textX = Math.round((width - ctt.measureText(text).width) / 2),
                        textY = height / 2;

                    ctt.fillText(text, textX, textY);
                    ctt.save();
          ctt.restore();

        }

      }
};

//Add Custom plugins ****************************
Chart.pluginService.register(jsPluginDH2);

//end custom plugins ****************************


//for  Sentinel  survey ********************************************************************
// For the first block graph
// all of these charts are consisted of custom plugin called
//******************************************************************************************

const myChartJSPlugin = {
  beforeDraw: function(chart)  {

        if(chart.config.options.plugins1){
                    var width = chart.chart.width,
                        height = chart.chart.height,
                        ctt = chart.chart.ctx;

                    ctt.restore();
                    var fontSize = (height / 70).toFixed(2);
                    ctt.font = fontSize + "em sans-serif";
                    ctt.textBaseline = "middle";

                    var text = "24.3%",
                        textX = Math.round((width - ctt.measureText(text).width) / 2),
                        textY = height / 2;

                    ctt.fillText(text, textX, textY);
                    ctt.save();
          ctt.restore();

        }

      }
};

Chart.pluginService.register(myChartJSPlugin);
$(document).ready(function() {
var tohCanvas = document.getElementById("stunts");

var stData = {
    labels: [
       '',

    ],
    datasets: [
        {
      label: '',
            data: [24.3,(100-24.3)],
            backgroundColor: [
                "#75C050",


            ],

            borderWidth: 0
        }]
};

var chartOptions = {
 cutoutPercentage: 88,
  legend: {
    display:false
  },
  tooltips: {
    enabled: false

  },
  plugins1: [myChartJSPlugin],
  maintainAspectRatio : false

};


var pieChart = new Chart(tohCanvas, {
  type: 'doughnut',
  data: stData,
  options: chartOptions
});

});

//chart wasting

const myChartJSPlugin1 = {
  beforeDraw: function(chart)  {

        if(chart.config.options.plugins2){
                    var width = chart.chart.width,
                        height = chart.chart.height,
                        ctt = chart.chart.ctx;

                    ctt.restore();
                    var fontSize = (height / 70).toFixed(2);
                    ctt.font = fontSize + "em sans-serif";
                    ctt.textBaseline = "middle";

                    var text = "9.9%",
                        textX = Math.round((width - ctt.measureText(text).width) / 2),
                        textY = height / 2;

                    ctt.fillText(text, textX, textY);
                    ctt.save();
          ctt.restore();

        }

      }
};

Chart.pluginService.register(myChartJSPlugin1);
$(document).ready(function() {
var tohCanvas = document.getElementById("wastingS");

var stData = {
    labels: [
       '',

    ],
    datasets: [
        {
      label: '',
            data: [9.9,(100-9.9)],
            backgroundColor: [
                "#EA528F",


            ],

            borderWidth: 0
        }]
};

var chartOptions = {
 cutoutPercentage: 88,
  legend: {
    display:false
  },
  tooltips: {
    enabled: false

  },
  plugins2: [myChartJSPlugin1],
  maintainAspectRatio : false

};


var pieChart = new Chart(tohCanvas, {
  type: 'doughnut',
  data: stData,
  options: chartOptions
});

});

//Underweight graph

const myChartJSPlugin2 = {
  beforeDraw: function(chart)  {

        if(chart.config.options.plugins3){
                    var width = chart.chart.width,
                        height = chart.chart.height,
                        ctt = chart.chart.ctx;

                    ctt.restore();
                    var fontSize = (height / 70).toFixed(2);
                    ctt.font = fontSize + "em sans-serif";
                    ctt.textBaseline = "middle";

                    var text = "20.1%",
                        textX = Math.round((width - ctt.measureText(text).width) / 2),
                        textY = height / 2;

                    ctt.fillText(text, textX, textY);
                    ctt.save();
          ctt.restore();

        }

      }
};

Chart.pluginService.register(myChartJSPlugin2);
$(document).ready(function() {
    var tohCanvas = document.getElementById("underweightS");

    var stData = {
        labels: [
        '',

        ],
        datasets: [
            {
                label: '',
                data: [20.1,(100-20.1)],
                backgroundColor: [
                    "#F27B53",


                ],

                borderWidth: 0
            }]
    };

    var chartOptions = {
    cutoutPercentage: 88,
    legend: {
        display:false
    },
    tooltips: {
        enabled: false

    },
    plugins3: [myChartJSPlugin2],
    maintainAspectRatio : false

    };


    var pieChart = new Chart(tohCanvas, {
    type: 'doughnut',
    data: stData,
    options: chartOptions
    });
});

// function to save chart js as picture and download data
function downloadChartDataButton ( buttonElement, link ) {
  $( buttonElement ).click( function () {
    $( buttonElement ).attr( 'href', link );
  });
}


// Tooltips
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});


//*******Test Chart on the top of Home tab

// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("navBarTop").style.fontSize = "1rem";
        document.getElementById("navBarTop").style.height = "70px";
    } else {
        document.getElementById("navBarTop").style.fontSize = "1rem";
        document.getElementById("navBarTop").style.height = "100px";
    }
}
