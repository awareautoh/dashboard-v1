"use strict";


//File path for import data
const lec1Path = "data/Lect1.csv";
const lec2Path = "data/lec2.csv";
const lec3Path = "data/lec3.csv";
const lec4Path = "data/lec4.csv";
const lec5Path = "data/lec5.csv";
const lec6Path = "data/lec6.csv";
const lec7Path = "data/lec7.csv";
const lec8Path = "data/lec8.csv";


Promise.all([
    d3.csv(lec1Path),
    d3.csv(lec2Path),
    d3.csv(lec3Path),
    d3.csv(lec4Path),
    d3.csv(lec5Path),
    d3.csv(lec6Path),
    d3.csv(lec7Path),
    d3.csv(lec8Path),
]).then(buildChart);

function buildChart (value) {
    const lec1 = value[0];
    const lec2 = value[1];
    const lec3 = value[2];
    const lec4 = value[3];
    const lec5 = value[4];
    const lec6 = value[5];
    const lec7 = value[6];
    const lec8 = value[7];


     //start Lect1 chart

    let lec1Label = lec1.map(d=> d.Province);
    let lec1value = lec1.map(d=> d.rice);
    let lec1value2 = lec1.map(d=> d.meat);
    let lec1value3 = lec1.map(d=> d.fish);

    let getlec1Chart = document.getElementById('lec1Chart').getContext("2d");
    let lec1Chart = new Chart(getlec1Chart, {
        type: 'bar',
            data: {
                labels: lec1Label,
                datasets: [{
                        label: "Rice",
                        data: lec1value,
                        backgroundColor: 'rgba(0,168,240,0.9)',
                        borderColor:'rgba(0,168,240,0.5)',
                    }, {
                        label: "Meat",
                        data: lec1value2,
                        backgroundColor: 'rgba(213,51,105,0.8)',
                        borderColor:'rgba(213,51,105,0.5)',
                    }, {
                        label: "Fish",
                        data: lec1value3,
                        backgroundColor: 'rgba(245,193,14,0.7)',
                        borderColor:'rgba(245,193,14,0.5)',
                }]
            },
            options: {
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



 //End Lec1 chart 

 //Start lec2 
      let lec2Label = lec2.map(d=> d.Province);
      let lec2value = lec2.map(d=> d.cerialandbread);
      let lec2value2 = lec2.map(d=> d.milkcheeseeggs);
      let lec2value3 = lec2.map(d=> d.oilsandfat);
      let lec2value4 = lec2.map(d=> d.fruit);

      let getlec2Chart = document.getElementById('lec2Chart').getContext("2d");
       let lec2Chart = new Chart(getlec2Chart, {


                               type: 'line',
                               data: {
                                   labels: lec2Label,
                                   datasets: [
                                       {
                                           label: "Cerial and Bread",
                                           data: lec2value,
                                           backgroundColor: 'rgba(0,168,240,0.9)',
                                           borderColor:'rgba(0,168,240,0.5)',
                                           
                                           lineTension: 0,
                                           fill:false			
                       
                                       },
                                        {
                                           label: "Milk,Chees,Eeggs",
                                           data: lec2value2,
                                           backgroundColor: 'rgba(213,51,105,0.8)',
                                           borderColor:'rgba(213,51,105,0.5)',
                                           pointRadius: 3,
                                           lineTension: 0,
                                   
                                           fill:false			
                       
                                       },
                                        {
                                           label: "Oils and Fat",
                                           data: lec2value3,
                                           backgroundColor: 'rgba(245,193,14,0.7)',
                                           borderColor:'rgba(245,193,14,0.5)',
                                           pointRadius: 3,
                                           lineTension: 0,
                                           
                                           fill:false			
                       
                                       },
                                       {
                                           label: "Fruit",
                                           data: lec2value4,
                                           backgroundColor: 'rgba(33,168,27,0.7)',
                                           borderColor:'rgba(33,168,27,0.5)',
                                           pointRadius: 3,
                                           lineTension: 0,		
                                           fill:false			
                       
                                       },
                                       
                                                   
                                                             
                                   ]
                                   
                               },
                               options: {
                                  
                                   legend: {
                                       display: true,
                                       labels: {
                                                   usePointStyle: true
                                               }
                                                                           
                                   },
                                   maintainAspectRatio: false,
                                   scales: {
                               yAxes: [{
                                   //stacked: true,
                                   ticks: {
                                       beginAtZero: true,
                                       maxTicksLimit: 8,
                                   },
                                   gridLines: {
                                       borderDash: [3, 5]
                                   }
                               }],
                               xAxes: [{
                                   //stacked: true,
                                   gridLines: {
                                       drawOnChartArea: false,
                                   }
                               }]
                           },
                                   
                               }  	 						
       });




 //end lec2 
 //start lec3 
         let lec3Label = lec3.map(d=> d.Province);
         let lec3value = lec3.map(d=> d.rice);
         let lec3value2 = lec3.map(d=> d.meat);
         let lec3value3 = lec3.map(d=> d.fish);
             
         let getlec3Chart = document.getElementById('lec3Chart').getContext("2d");
           let lec3Chart = new Chart(getlec3Chart, {

                    type: 'line',
                                       data: {
                                           labels: lec3Label,
                                           datasets: [
                                               {
                                                   label: "Rice",
                                                   data: lec3value,
                                                   backgroundColor: 'rgba(0,144,241,0.2)',
                                                   borderColor:'rgba(10,168,240,0.5)',
                                                   
                                                   lineTension: 0,
                                                   fill:true			
                               
                                               },
                                                {
                                                   label: "Meat",
                                                   data: lec3value2,
                                                   backgroundColor: 'rgba(213,51,105,0.2)',
                                                   borderColor:'rgba(213,51,105,0.5)',
                                                   pointRadius: 3,
                                                   lineTension: 0,
                                           
                                                   fill:true			
                               
                                               },
                                                {
                                                   label: "Fish",
                                                   data: lec3value3,
                                                   backgroundColor: 'rgba(245,193,14,0.8)',
                                                   borderColor:'rgba(245,193,14,0.5)',
                                                   pointRadius: 3,
                                                   lineTension: 0,
                                                   
                                                   fill:true		
                               
                                               }
                                               
                                               
                                                           
                                                                     
                                           ]
                                           
                                       },
                                       options: {
                                          
                                           legend: {
                                               display: true,
                                               labels: {
                                                           usePointStyle: true
                                                       }
                                                                                   
                                           },
                                           maintainAspectRatio: false,
                                           scales: {
                                       yAxes: [{
                                           //stacked: true,
                                           ticks: {
                                               beginAtZero: true,
                                               maxTicksLimit: 8,
                                           },
                                           gridLines: {
                                               borderDash: [3, 5]
                                           }
                                       }],
                                       xAxes: [{
                                           //stacked: true,
                                           gridLines: {
                                               drawOnChartArea: false,
                                           }
                                       }]
                                   },
                                           
                                       }
           });


 //end lec3

 //strt Lec4

let lec4Label = lec4.map(d=> d.Province);
let lec4value = lec4.map(d=> d.pharmacy);
let lec4value2 = lec4.map(d=> d.licensedpharmacy);
let lec4value3 = lec4.map(d=> d.medical);

let getlec4Chart = document.getElementById('lec4Chart').getContext("2d");
let lec4Chart = new Chart(getlec4Chart, {
    type: 'bar',
        data: {
            labels: lec4Label,
            datasets: [{
                    label: "Pharmacy",
                    data: lec4value,
                    backgroundColor: 'rgba(0,144,241,0.9)',
                    borderColor:'rgba(10,168,240,0.5)',
                    }, {
                    label: "Licensed Pharmacy",
                    data: lec4value2,
                    backgroundColor: 'rgba(213,51,105,0.9)',
                    borderColor:'rgba(213,51,105,0.5)',
                }, {
                    label: "Medical",
                    data: lec4value3,
                    backgroundColor: 'rgba(245,193,14,1)',
                    borderColor:'rgba(245,193,14,0.5)',
                }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 8,
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

 //End Lec4 

 //start Lec5 

     let lec5Label = lec5.map(d=> d.Province);
     let lec5value = lec5.map(d=> d.primary);
     let lec5value2 = lec5.map(d=> d.lower);
     
     let getlec5Chart = document.getElementById('lec5Chart').getContext("2d");
      let lec5Chart = new Chart(getlec5Chart, {

          
                              type: 'bar',
                              data: {
                                  labels: lec5Label,
                                  datasets: [
                                      {
                                          label: "primary school in village %",
                                          data: lec5value,
                                          backgroundColor: '#ff7675',
                                          
                                          
                                          lineTension: 0,
                                          fill:true			
                      
                                      },
                                       {
                                          label: "lower secondary school in village %",
                                          data: lec5value2,
                                          backgroundColor: '#74b9ff',
                                          
                                          pointRadius: 3,
                                          lineTension: 0,
                                  
                                          fill:true			
                      
                                      },
                                  
                                      
                                                  
                                                            
                                  ]
                                  
                              },
                              options: {
                                 
                                  legend: {
                                      display: true,
                                      labels: {
                                                  usePointStyle: true,
                                                  fontSize:9
                                              }
                                                                          
                                  },
                                  maintainAspectRatio: false,
                                  scales: {
                              yAxes: [{
                                  stacked: true,
                                  ticks: {
                                      beginAtZero: true,
                                      maxTicksLimit: 8,
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

 //end Lec5 

 //start lec 6


      let lec6Label = lec6.map(d=> d.Province);
     let lec6value = lec6.map(d=> d.l_2003);
     let lec6value2 = lec6.map(d=> d.l_2008);
     let lec6value3 = lec6.map(d=> d.l_2013);

     let getlec6Chart = document.getElementById('lec6Chart').getContext("2d");
      let lec6Chart = new Chart(getlec6Chart, {

          type: 'line',
                                           data: {
                                               labels: lec6Label,
                                               datasets: [
                                                   {
                                                       label: "2003",
                                                       data: lec6value,
                                                       backgroundColor: 'rgba(0,168,240,0.9)',
                                                       fill:false,
                                                       lineTension: 0,
                                                       borderColor: 'rgba(0,168,240,0.3)',

                                                   },
                                                    {
                                                       label: "2008",
                                                       data: lec6value2,
                                                       backgroundColor: 'rgba(213,51,105,0.9)',
                                                       fill:false,
                                                       lineTension: 0,
                                                       borderColor:'rgba(213,51,105,0.3)',

                                                   },
                                                    {
                                                       label: "2013",
                                                       data: lec6value3,
                                                       backgroundColor: 'rgba(245,193,14,0.9)',
                                                       fill:false,
                                                       lineTension: 0,
                                                       borderColor: 'rgba(245,193,14,0.3)',
      

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
                                               //stacked: true,
                                               ticks: {
                                                   beginAtZero: true,
                                                   maxTicksLimit: 8,
                                               },
                                               gridLines: {
                                                   borderDash: [3, 5]
                                               }
                                           }],
                                           xAxes: [{
                                               //stacked: true,
                                               gridLines: {
                                                   drawOnChartArea: false,
                                               },

                                           }]
                                       },
                                               
                                           }  	
      });
 //end Lec6 

 //start lec 7

     let lec7Label = lec7.map(d=> d.Year);
     let lec7value = lec7.map(d=> d.LaoTai);
     let lec7value2 = lec7.map(d=> d.MonKhmer);
     let lec7value3 = lec7.map(d=> d.ChineseTibet);
     let lec7value4 = lec7.map(d=> d.HmongMien);

     let getlec7Chart = document.getElementById('lec7Chart').getContext("2d");
      let lec7Chart = new Chart(getlec7Chart, {


               type: 'bar',
                                                data: {
                                                    labels: lec7Label,
                                                    datasets: [
                                                        {
                                                            label: "Lao Tai",
                                                            data: lec7value,
                                                            backgroundColor: 'rgba(0,168,240,0.9)',
                                                            borderColor:'rgba(0,168,240,0.5)',
                                                            borderWidth:0
                  
                                                        },
                                                         {
                                                            label: "Mon Khmer",
                                                            data: lec7value2,
                                                            backgroundColor: 'rgba(213,51,105,0.8)',
                                                            borderColor:'rgba(213,51,105,0.5)',
                                                            borderWidth:0
                                                                    
                                        
                                                        },
                                                         {
                                                            label: "Chinese Tibet",
                                                            data: lec7value3,
                                                            backgroundColor: 'rgba(245,193,14,0.7)',
                                                            borderColor:'rgba(245,193,14,0.5)',
                                                            borderWidth:0
                                                            
                                                        },
                                                       {
                                                            label: "Hmong Mien",
                                                            data: lec7value4,
                                                            backgroundColor: 'rgba(13,129,92,0.7)',
                                                            borderColor:'rgba(13,129,92,0.5)',
                                                            borderWidth:0
                                                                    
                                        
                                                        },
                                                    
                                    
                                                    ]
                                                    
                                                },
                                                options: {
                                                   
                                                    legend: {
                                                        display: true,
                                                        labels: {
                                                           fontSize:9
                                                           
                                                           }
                                                                                            
                                                    },
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                yAxes: [{
                                                    //stacked: true,
                                                    ticks: {
                                                        beginAtZero: true,
                                                        maxTicksLimit: 8,
                                                    },
                                                    gridLines: {
                                                        borderDash: [3, 5]
                                                    }
                                                }],
                                                xAxes: [{
                                                    //stacked: true,
                                                    gridLines: {
                                                        drawOnChartArea: false,
                                                    }
                                                }]
                                            },
                                                    
                                                }  	 			

      });
             

 //end lec 7

 //start lec8 

     let lec8Label = lec8.map(d=> d.legen);
     let lec8value = lec8.map(d=> d.l_2003);
     let lec8value2 = lec8.map(d=> d.l_2008);
     let lec8value3 = lec8.map(d=> d.l_2013);

     let getlec8Chart = document.getElementById('lec8Chart').getContext("2d");
      let lec8Chart = new Chart(getlec8Chart, {

            type: 'line',
                                            data: {
                                                labels: lec8Label,
                                                datasets: [
                  
                                                    {
                                                        label: "2003",
                                                        data: lec8value,
                                                        backgroundColor: 'rgba(14,150,80,0.9)',
                                                        borderColor:'rgba(14,150,80,0.5)',
                                                      fill:false,
                                                      lineTension:0
              
                                                    },
                                                     {
                                                        label: "2008",
                                                        data: lec8value2,
                                                        backgroundColor: 'rgba(174,22,195,0.8)',
                                                        borderColor:'rgba(174,22,195,0.5)',
                                                      fill:false
                                                                
                                    
                                                    },
                                                     {
                                                        label: "2013",
                                                        data: lec8value3,
                                                        backgroundColor: 'rgba(245,193,14,0.7)',
                                                        borderColor:'rgba(245,193,14,0.5)',
                                                        fill:false
                                                    },

                                                ]
                                                
                                            },

                                                  options: {
                                                     
                                                      legend: {
                                                          display: true,
                                                          labels: {
                                                           fontSize:9
                                                           
                                                           }
                                                      
                                                      },
                                                      maintainAspectRatio: false,
                                                      scales: {
                                                  yAxes: [{
                                                      //stacked: true,
                                                      ticks: {
                                                          beginAtZero: true,
                                                          maxTicksLimit: 8,
                                                          
                                                      },
                                                      gridLines: {
                                                          borderDash: [3, 5]
                                                      }
                                                  }],
                                                  xAxes: [{
                                                      //stacked: true,
                                                      gridLines: {
                                                          drawOnChartArea: false,
                                                      },
                                                      ticks: {
                                                          fontSize: 10
                                                         }
                                                  }]
                                              },
                                                      
                                                  }  	 			

      });

 //end lec8 

}