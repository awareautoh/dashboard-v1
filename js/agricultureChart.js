"use strict";

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

//*************************************/
//Chart.js global config
//*************************************/
Chart.plugins.unregister(ChartDataLabels); //cogfig Chart.JS label pugin not to show label on all chart by default
Chart.defaults.global.plugins.deferred.delay = 250; //Global set up for ChartJS plugin: deffer, delay transition: 500
Chart.defaults.global.plugins.deferred.xOffset = "50%"; //Global set up for ChartJS plugin: deffer, 50% view point to activate plugin
Chart.defaults.global.defaultFontFamily = "'Noto Sans', Helvetica, Arial, sans-serif, 'Noto Sans Lao', Phetsarath OT"; //set font family
Chart.defaults.global.plugins.datalabels.color = '#fff';

//File path for import data
const agri1Path = "data/agri1.csv";
const agri2Path = "data/yield.csv";
const agri3Path = "data/pro.csv";
const agriVet1Path = "data/agriVet1.csv";
const agriVet2Path = "data/agriVet2.csv";
const agriVet3Path = "data/agriVet3.csv";
const agriVet4Path = "data/bc.csv";
const agriVet5Path = "data/pgs.csv";
const agriVet6Path = "data/fish.csv";
const agriVet7Path = "data/poul.csv";

Promise.all([
    d3.csv(agri1Path),
    d3.csv(agri2Path),
    d3.csv(agri3Path),
    d3.csv(agriVet1Path),
    d3.csv(agriVet2Path),
    d3.csv(agriVet3Path),
    d3.csv(agriVet4Path),
    d3.csv(agriVet5Path),
    d3.csv(agriVet6Path),
    d3.csv(agriVet7Path),
]).then(buildChart);

function buildChart (value) {
    const agri1 = value[0];
    const agri2 = value[1];
    const agri3 = value[2];
    const agriVet1 = value[3];
    const agriVet2 = value[4];
    const agriVet3 = value[5];
    const agriVet4 = value[6];
    const agriVet5 = value[7];
    const agriVet6 = value[8];
    const agriVet7 = value[9];


    // create agri culture1  chart	
    let aLabel = agri1.map(d=> d.Year);
    let avalue = agri1.map(d=> d.Total);
    let avalue2 = agri1.map(d=> d.Lowlandrainfedpaddy);
    let avalue3 = agri1.map(d=> d.DrySeasonpaddy);
    let avalue4 = agri1.map(d=> d.Upland);

    let getagri1Chart = document.getElementById('agri1Chart').getContext("2d");
    let agri1Chart = new Chart(getagri1Chart, {
        type: 'bar',
            data: {
                labels: aLabel,
                datasets: [
                    {
                        label: "Total",
                        data: avalue,
                        backgroundColor: blue,
                        borderWidth: 0,

                        
    
                    },
                    {
                        label: "Low land rainfed paddy",
                        data: avalue2,
                        backgroundColor: darkBlue,
                        borderWidth: 0,
                        
    
                    },
                    {
                        label: "Dry Season paddy",
                        data: avalue3,
                        backgroundColor: darkGrey,
                        borderWidth: 0,
                        
    
                    },
                    {
                        label: "Upland rainfed paddy",
                        data: avalue4,
                        backgroundColor: grey,
                        borderWidth: 0,
                        
                    }
                                            
                ]
            },
            plugins: [ChartDataLabels],
            options: {
                scales: {
                yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 10,
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
                legend: {
                    display: true
                },
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                    align: 'middle',
                    color:'#fff'
                    },
                }
            }

    });

   //end gri1 

   //agri2 chart 

       let agri2Label = agri2.map(d=> d.Year);
       let agri2value = agri2.map(d=> d.Total);
       let agri2value2 = agri2.map(d=> d.Lowlandrainfedpaddy);
       let agri2value3 = agri2.map(d=> d.DrySeasonpaddy);
       let agri2value4 = agri2.map(d=> d.Upland);

       let getagri2Chart = document.getElementById('agri2Chart').getContext("2d");
        let agri2Chart = new Chart(getagri2Chart, {

                    type: 'line',
                                data: {
                                    labels: agri2Label,
                                    datasets: [
                                        {
                                            label: "Total",
                                            data: agri2value,
                                            backgroundColor: blue,
                                            borderColor: blue,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:false
                                            
                                            
                        
                                        },
                                        {
                                            label: "Low landrainfed paddy",
                                            data: agri2value2,
                                            backgroundColor: darkBlue,
                                            borderColor: darkBlue,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:false
                                            
                        
                                        },
                                        {
                                            label: "Dry Season paddy",
                                            data: agri2value3,
                                            backgroundColor: darkGrey,
                                            borderColor: darkGrey,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:false
                                            
                        
                                        },
                                        {
                                            label: "Upland rainfed paddy",
                                            data: agri2value4,
                                            backgroundColor: grey,
                                            borderColor: grey,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:false
                                            
                        
                                        }
                                                              
                                    ]
                                    
                                },
                                options: {
                                   
                                    legend: {
                                        display: false,
                                        usePointStyle: true,
                                        labels: {
                                             
                                              
                                              boxWidth: 20,
                                              boxHeight: 2
                                            }
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        maxTicksLimit: 8,
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
                                    
                                }


        });


   //end agri 2

   // agri 3 graph 
       let agri3Label = agri3.map(d=> d.Year);
       let agri3value = agri3.map(d=> d.Total);
       let agri3value2 = agri3.map(d=> d.Lowlandrainfedpaddy);
       let agri3value3 = agri3.map(d=> d.DrySeasonpaddy);
       let agri3value4 = agri3.map(d=> d.Upland);

       let getagri3Chart = document.getElementById('agri3Chart').getContext("2d");
        let agri3Chart = new Chart(getagri3Chart, {

            type: 'bar',
                                data: {
                                    labels: agri3Label,
                                    datasets: [
                                        {
                                            label: "Total",
                                            data: agri3value,
                                            backgroundColor: blue,
                                            borderColor: blue,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:false
                                            
                                            
                        
                                        },
                                        {
                                            label: "Lowland rainfed paddy",
                                            data: agri3value2,
                                            backgroundColor: darkBlue,
                                            borderColor: darkBlue,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:false
                                            
                        
                                        },
                                        {
                                            label: "Dry Season paddy",
                                            data: agri3value3,
                                            backgroundColor: darkGrey,
                                            borderColor: darkGrey,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:false
                                            
                        
                                        },
                                        {
                                            label: "Upland rainfed paddy",
                                            data: agri3value4,
                                            backgroundColor: grey,
                                            borderColor: grey,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:false
                                            
                        
                                        }
                                                              
                                    ]
                                    
                                },
                                options: {
                                   
                                    legend: {
                                        display: false,
                                        usePointStyle: true,
                                        labels: {
                                             
                                              
                                              boxWidth: 20,
                                              boxHeight: 2
                                            }
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                yAxes: [{
                                     stacked: true ,
                                    ticks: {
                                        beginAtZero: true,
                                        maxTicksLimit: 7,
                                    },
                                    gridLines: {
                                        borderDash: [3, 5]
                                    }
                                }],
                                xAxes: [{
                                     stacked: true,
                                    gridLines: {
                                        drawOnChartArea: false,
                                    }
                                }]
                            },
                                    
                                }
        });

   //end agri 3 graph 

   //strat agriVet1 

          let agriVet1Label = agriVet1.map(d=> d.Year);
       let agriVet1value = agriVet1.map(d=> d.leaf);
       let agriVet1value2 = agriVet1.map(d=> d.root);
       let agriVet1value3 = agriVet1.map(d=> d.fruit);

       let getagriVet1Chart = document.getElementById('agriVet1Chart').getContext("2d");
        let agriVet1Chart = new Chart(getagriVet1Chart, {

             type: 'bar',
                                data: {
                                    labels: agriVet1Label,
                                    datasets: [
                                        {
                                            label: "Leafy Stem Vegetables",
                                            data: agriVet1value,
                                            backgroundColor: blue,
                                            
                                            
                                            
                        
                                        },
                                        {
                                            label: "Root, Bulb and Tuberous",
                                            data: agriVet1value2,
                                            backgroundColor: darkBlue,
                                        
                                            
                        
                                        },
                                        {
                                            label: "Fruitbearing",
                                            data: agriVet1value3,
                                            backgroundColor: darkGrey,
                                            
                                            
                        
                                        }
                                        
                                                              
                                    ]
                                    
                                },
                                plugins: [ChartDataLabels],
                                options: {
                                   
                                    legend: {
                                        display: true,
                                        usePointStyle: true,
                                        
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                yAxes: [{
                                     
                                    ticks: {
                                        beginAtZero: true,
                                        maxTicksLimit: 7,
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

                            plugins: {
                                            datalabels: {
                                                align: 'middle',
                                                color:'#fff'

                                            },
                                            
                                        }  
                                    
                                }


        });	

   //enf agriVet1  

   //start agriVet2

        let agriVet2Label = agriVet2.map(d=> d.Year);
       let agriVet2value = agriVet2.map(d=> d.leaf);
       let agriVet2value2 = agriVet2.map(d=> d.root);
       let agriVet2value3 = agriVet2.map(d=> d.fruit);

       let getagriVet2Chart = document.getElementById('agriVet2Chart').getContext("2d");
        let agriVet2Chart = new Chart(getagriVet2Chart, {

             type: 'bar',
                                data: {
                                    labels: agriVet2Label,
                                    datasets: [
                                        {
                                            label: "Leafy Stem Vegetables",
                                            data: agriVet2value,
                                            backgroundColor: blue,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:true
                                            
                                            
                        
                                        },
                                        {
                                            label: "Root, Bulb and Tuberous",
                                            data: agriVet2value2,
                                            backgroundColor: darkBlue,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:true
                                            
                        
                                        },
                                        {
                                            label: "Fruitbearing",
                                            data: agriVet2value3,
                                            backgroundColor: darkGrey,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:true
                                            
                        
                                        }
                                        
                                                              
                                    ]
                                    
                                },
                                plugins: [ChartDataLabels],
                                options: {
                                   
                                    legend: {
                                        display: false,
                                        usePointStyle: true,
                                        labels: {
                                             
                                              
                                              boxWidth: 20,
                                              boxHeight: 2
                                            }
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                yAxes: [{
                                     stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                        maxTicksLimit: 5,
                                    },
                                    gridLines: {
                                        borderDash: [3, 5]
                                    }
                                }],
                                xAxes: [{
                                     stacked: true,
                                    gridLines: {
                                        drawOnChartArea: false,
                                    }
                                }]
                            },
                               
                             plugins: {
                                            datalabels: {
                                                align: 'middle',
                                                color:'#fff'

                                            },
                                            
                                        }    
                                }
                                


        });


   //End agriVet2

   //start agriVet3 

       let agriVet3Label = agriVet3.map(d=> d.Year);
       let agriVet3value = agriVet3.map(d=> d.leaf);
       let agriVet3value2 = agriVet3.map(d=> d.root);
       let agriVet3value3 = agriVet3.map(d=> d.fruit);


       let getagriVet3Chart = document.getElementById('agriVet3Chart').getContext("2d");
        let agriVet3Chart = new Chart(getagriVet3Chart, {


             type: 'line',
                                data: {
                                    labels: agriVet3Label,
                                    datasets: [
                                        {
                                            label: "Leafy Stem Vegetables",
                                            data: agriVet3value,
                                            backgroundColor: blue,
                                            pointRadius: 3,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:true
                                            
                                            
                        
                                        },
                                        {
                                            label: "Root, Bulb and Tuberous",
                                            data: agriVet3value2,
                                            backgroundColor: darkBlue,
                                            pointRadius: 3,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:true
                                            
                        
                                        },
                                        {
                                            label: "Fruitbearing",
                                            data: agriVet3value3,
                                            backgroundColor: darkGrey,
                                            pointRadius: 3,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:true
                                            
                        
                                        }
                                        
                                                              
                                    ]
                                    
                                },

                                options: {
                                   
                                    legend: {
                                        display: false,
                                        usePointStyle: true,
                                        
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                yAxes: [{
                                     stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                        maxTicksLimit: 7,
                                    },
                                    gridLines: {
                                        borderDash: [3, 5]
                                    }
                                }],
                                xAxes: [{
                                     stacked: true,
                                    gridLines: {
                                        drawOnChartArea: false,
                                    }
                                }]
                            },
                                    
                                }


        });


   //end Agrivet3 

   //start chartVet4 

       let agriVet4Label = agriVet4.map(d=> d.Year);
       let agriVet4value = agriVet4.map(d=> d.buffalo);
       let agriVet4value2 = agriVet4.map(d=> d.cattle);

       let getagriVet4Chart = document.getElementById('agriVet4Chart').getContext("2d");
        let agriVet4Chart = new Chart(getagriVet4Chart, {

             type: 'bar',
                                data: {
                                    labels: agriVet4Label,
                                    datasets: [
                                        {
                                            label: "Buffalo",
                                            data: agriVet4value,
                                            backgroundColor: blue,
                                            borderColor: blue,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:true
                                            
                                            
                        
                                        },
                                        {
                                            label: "Cattle",
                                            data: agriVet4value2,
                                            borderColor: darkBlue,
                                            backgroundColor: darkBlue,
                                            pointRadius: 5,
                                            pointBorderColor:'#7e807e',
                                            pointBorderwidth:1,
                                            fill:true
                                            
                        
                                        },
                                                    
                                                              
                                    ]
                                    
                                },
                                options: {
                                   
                                    legend: {
                                        display: true,
                                        usePointStyle: true,
                                        
                                    },
                                    maintainAspectRatio: false,
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
                                    
                                }

        });

   //end chartVet4 

   //Start chart5 

    let agriVet5Label = agriVet5.map(d=> d.Year);
    let agriVet5value = agriVet5.map(d=> d.pig);
    let agriVet5value2 = agriVet5.map(d=> d.gs);

    let getagriVet5Chart = document.getElementById('agriVet5Chart').getContext("2d");
    
    let agriVet5Chart = new Chart(getagriVet5Chart, {
        type: 'bar',
            data: {
                labels: agriVet5Label,
                datasets: [
                    {
                        label: "Pig",
                        data: agriVet5value,
                        backgroundColor: blue,
                        borderColor: blue,
                        fill: false,
                    },
                    {
                        label: "Goat and Sheep",
                        data: agriVet5value2,
                        
                        borderColor: darkBlue,
                        backgroundColor: darkBlue,
                        fill: false,
                    },
                ]
            },
            options: {
                legend: {
                    display: true,
                },
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 4,
                        },
                        gridLines: {
                            borderDash: [3, 5]
                        }
                    }],
                    xAxes: [{
                            
                        gridLines: {
                            drawOnChartArea: false,
                        }
                    }],
                },
            }
    });


   //End agriVet5

   //Start AgriVet 6

        let agriVet6Label = agriVet6.map(d=> d.Year);
        let agriVet6value = agriVet6.map(d=> d.culturefish);
        let agriVet6value2 = agriVet6.map(d=> d.capturefish);

        let getagriVet6Chart = document.getElementById('agriVet6Chart').getContext("2d");
         let agriVet6Chart = new Chart(getagriVet6Chart, {

                  type: 'bar',
                                     data: {
                                         labels: agriVet6Label,
                                         datasets: [
                                             {
                                                 label: "Culture fish",
                                                 data: agriVet6value,
                                                 backgroundColor: blue,
                                                 borderColor: blue,
                                                 pointRadius: 5,
                                                 pointBorderColor:'#7e807e',
                                                 pointBorderwidth:1,
                                                 fill:true
                                                 
                                                 
                             
                                             },
                                             {
                                                 label: "Capture fish",
                                                 data: agriVet6value2,
                                                 borderColor: darkBlue,
                                                 backgroundColor: darkBlue,
                                                 pointRadius: 5,
                                                 pointBorderColor:'#7e807e',
                                                 pointBorderwidth:1,
                                                 fill:true
                                                 
                             
                                             },
                                                         
                                                                   
                                         ]
                                         
                                     },
                                     plugins: [ChartDataLabels],
                                     options: {
                                        
                                         legend: {
                                             display: true,
                                             usePointStyle: true,
                                             
                                         },
                                         maintainAspectRatio: false,
                                         scales: {
                                     yAxes: [{
                                         stacked: true,
                                         ticks: {
                                             beginAtZero: true,
                                             maxTicksLimit: 5,
                                         },
                                         gridLines: {
                                             borderDash: [3, 5]
                                         }
                                     }],
                                     xAxes: [{
                                         stacked: true, 
                                         gridLines: {
                                             drawOnChartArea: false,
                                         }
                                     }]
                                 },
                                 plugins: {
                                            datalabels: {
                                                align: 'middle',
                                                color:'#fff'

                                            },
                                            
                                        }
                                         
                              }
                                     
         });


   //End agriVet6  


   // start agriVet7 

    let agriVet7Label = agriVet7.map(d=> d.Year);
    let agriVet7value = agriVet7.map(d=> d.poultry);

    let getagriVet7Chart = document.getElementById('agriVet7Chart').getContext("2d");
    let agriVet7Chart = new Chart(getagriVet7Chart, {
        type: 'bar',
        data: {
            labels: agriVet7Label,
            datasets: [
                {
                    label: "Poultry",
                    data: agriVet7value,
                    backgroundColor: blue,
                    fill: true,
                }
            ]
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
                        drawOnChartArea: false,
                    }
                }],
            },
            legend: {
                display: false,
            },
            maintainAspectRatio: false,
        }

    });


   //End agriVet7
}