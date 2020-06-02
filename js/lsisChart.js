"use strict";


//File path for import data
const lsisOverviewPath = "data/lsis_indicator_overview.csv";
const lsisTrendPath = "data/lsis_indicator_trend.csv";
const lsisIndicatorSubPath = "data/lsis_indicator_sub.csv";
const lsisSubCategoryAreaPath = "data/lsis_sub_category_Area.csv";
const lsisSubCategoryEducationPath = "data/lsis_sub_category_Education.csv";
const lsisSubCategoryEthnicityPath = "data/lsis_sub_category_Ethnicity.csv";
const lsisSubCategoryWealthPath = "data/lsis_sub_category_Wealth.csv";


Promise.all([
  d3.csv(lsisOverviewPath),
  d3.csv(lsisTrendPath),
  d3.csv(lsisIndicatorSubPath),
  d3.csv(lsisSubCategoryAreaPath),
  d3.csv(lsisSubCategoryEducationPath),
  d3.csv(lsisSubCategoryEthnicityPath),
  d3.csv(lsisSubCategoryWealthPath),
]).then(buildChart);


//**********************************/
//Build Chart All ChartJS gose here
//*********************************/


function buildChart (value) {
  const lsisOverview = value[0];
  const lsisTrend = value[1];
  const lsisIndicatorSub = value[2];
  const lsisSubCategoryArea = value[3];
  const lsisSubCategoryEducation = value[4];
  const lsisSubCategoryEthnicity = value[5];
  const lsisSubCategoryWealth = value[6];


  //**********************************************/
  //LSIS Tab
  //*********************************************/

  //Creat LSIS Overview Indicator
  let valueLSISOverview = (lsisOverview.slice().sort((a, b) => b.Value - a.Value)).map(d => d.Value);
  let LSISIndicator = (lsisOverview.slice().sort((a, b) => b.Value - a.Value)).map(d => d.Indicator);

  //Customize selected 1st index of bar chart
  const lsisOverviewChartLabelLenght = LSISIndicator.length;
  let initialBackgroundColor = [];
  for (let i = 0; i < lsisOverviewChartLabelLenght; i++) {
    initialBackgroundColor.push('#e0e0e0');
  }
  initialBackgroundColor[0] = blue;


  //Creat LSIS Overview Indicator
  let getLsisOverviewChart = document.getElementById('lsisOverviewChart').getContext("2d");
  let lsisOverviewChart = new Chart(getLsisOverviewChart, {
    type: 'horizontalBar',
    data: {
      labels: LSISIndicator,
      datasets: [{
        label: "Indicator",
        data: valueLSISOverview,
        backgroundColor: initialBackgroundColor,
        borderWidth: 0,
      }],
    },
    plugins: [ChartDataLabels],
    options: {
      scales: {
        xAxes: [{
          ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
          },
          gridLines: {
              borderDash: [3, 5],
          }
        }],
        yAxes: [{
          gridLines: {
              drawOnChartArea: false,
          },
          display: false,
        }]
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      onClick: activateLSISSubChart,
      plugins: {
        datalabels: {
          formatter: function(value, context) {
            return context.chart.data.labels[context.dataIndex];
          },
          anchor: "start",
          align: "end",
        },
      },
    }
  });

  //Create LSIS Overview Provincial
  let provinceLSIS = lsisIndicatorSub.map(d => d.Province);
  let getLsisProvincialOverview = document.getElementById('lsisProvincialOverview').getContext("2d");
  let initialChoosedIndicator = LSISIndicator[0];
  let initailValueLSISOverviewSub = lsisIndicatorSub.map(d => d[initialChoosedIndicator])
  let lsisProvincialOverview = new Chart(getLsisProvincialOverview, {
    type: 'bar',
    data: {
      labels: provinceLSIS,
      datasets: [{
        label: initialChoosedIndicator,
        data: initailValueLSISOverviewSub,
        backgroundColor: '#80d8ff',
        borderColor: '#0ABDE3',
        borderWidth: 0,
      }],
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
          },
        }]
      },
      title: {
        display: true,
        text: initialChoosedIndicator,
      },
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
    }
  });

  //Create LSIS Overview Indicator
  let getLsisOverviewTrend = document.getElementById('lsisOverviewTrend').getContext("2d");
  let LsisYear = lsisTrend.map(d => d.Year);
  let initialValueLsisTrend = lsisTrend.map(d=> d[initialChoosedIndicator]);
  let lsisOverviewTrend = new Chart(getLsisOverviewTrend, {
      type: 'line',
      data: {
          labels: LsisYear,
          datasets: [
              {
                  label: initialChoosedIndicator,
                  data: initialValueLsisTrend,
                  backgroundColor: '#80d8ff',
                  borderColor: '#0ABDE3',
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
                  },
              }]
          },
          title: {
              display: true,
              text: initialChoosedIndicator,
          },
          legend: {
              display: false,
          },
          maintainAspectRatio: false,
      }
  });

    //Set function for onClick event of LSIS overview chart
    function activateLSISSubChart(chart) {
        let activePoints = this.getElementsAtEvent(chart);
        let choosedIndicator = LSISIndicator[activePoints[0]._index];

        //Creat LSIS Overview Provincial
        let valueLSISOverviewSub = lsisIndicatorSub.map(d => d[choosedIndicator]);

        //Creat LSIS Overview Indicator
        let valueLsisTrend = lsisTrend.map(d=> d[choosedIndicator]);

        //Create LSIS Sub Category Area
        let valueLsisSubCategoryArea = lsisSubCategoryArea.map(d=> d[choosedIndicator]);

        //Create LSIS Sub Category Education
        let valueLsisSubCategoryEducation = lsisSubCategoryEducation.map(d=> d[choosedIndicator]);

        //Create LSIS Sub Category Ethinicity
        let valueLsisSubCategoryEthnicity = lsisSubCategoryEthnicity.map(d=> d[choosedIndicator]);

        //Create LSIS Sub Category Wealth
        let valueLsisSubCategoryWealth = lsisSubCategoryWealth.map(d=> d[choosedIndicator]);

        //Set viriable to change color on click for bar chart
        let labelCount = activePoints[0]._chart.data.labels.length;
        let backgroundColorToChange = [];
        for (let i = 0; i < labelCount; i++) {
            backgroundColorToChange.push('#e0e0e0');
        }
        backgroundColorToChange[activePoints[0]._index] = blue;

        //Set Function for adding new data to chart
        function updateData(chart, dataLabel, data) {

            chart.data.datasets.forEach((datasets) => {
                datasets.label = dataLabel;
            });
            chart.data.datasets.forEach((dataset) => {
                dataset.data = data;
            });
            chart.options.title.text = dataLabel;
            chart.update();
        }

        //Function updateData specifc for polar chart on LSIS tab
        function updateDataPolar(chart, dataLabel, data) {

            chart.data.datasets.forEach((datasets) => {
                datasets.label = dataLabel;
            });
            chart.data.datasets.forEach((dataset) => {
                dataset.data = data;
            });
            chart.options.title.text = dataLabel;
            chart.update();
        }

        //Set function to change data based on click
        function changeBackgoundColor (chart, color) {
            activePoints[0]._chart.config.data.datasets[0].backgroundColor = color;
            chart.update();
        }

        //Activate all function above to the desired chart
        changeBackgoundColor(lsisOverviewChart, backgroundColorToChange);
        updateData(lsisProvincialOverview, choosedIndicator, valueLSISOverviewSub);
        updateData(lsisOverviewTrend, choosedIndicator, valueLsisTrend);
        updateDataPolar(lsisSubCategoryAreaChart, choosedIndicator, valueLsisSubCategoryArea);
        updateDataPolar(lsisSubCategoryEducationChart, choosedIndicator, valueLsisSubCategoryEducation);
        updateDataPolar(lsisSubCategoryEthnicityChart, choosedIndicator, valueLsisSubCategoryEthnicity);
        updateDataPolar(lsisSubCategoryWealthChart, choosedIndicator, valueLsisSubCategoryWealth);
    }

    //Create LSIS Sub Category Indicator

    //LSIS Sub Category Area
    let getLsisSubCategoryArea = document.getElementById('lsisSubCategoryArea').getContext("2d");
    let initialValueLsisArea = lsisSubCategoryArea.map(d=> d[initialChoosedIndicator]);
    let categoryArea = lsisSubCategoryArea.map(d => d.Sub_Category);
    let lsisSubCategoryAreaChart = new Chart(getLsisSubCategoryArea, {
        type: 'polarArea',
        data: {
            labels: categoryArea,
            datasets: [
                {
                    label: initialChoosedIndicator,
                    data: initialValueLsisArea,
                    backgroundColor: colorSetLSISAreaChart,
                    borderWidth: 0,
                }
            
            ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: initialChoosedIndicator,
            }
        }
    });

    //LSIS Sub Category Education
    let getLsisSubCategoryEducation = document.getElementById('lsisSubCategoryEducation').getContext("2d");
    let initialValueLsisEducation = lsisSubCategoryEducation.map(d=> d[initialChoosedIndicator]);
    let categoryEducation= lsisSubCategoryEducation.map(d => d.Sub_Category);
    let lsisSubCategoryEducationChart = new Chart(getLsisSubCategoryEducation, {
        type: 'polarArea',
        data: {
            labels: categoryEducation,
            datasets: [
                {
                    label: initialChoosedIndicator,
                    data: initialValueLsisEducation,
                    backgroundColor: colorSetLSISEducationChart,
                    borderWidth: 0,
                }
            
            ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: initialChoosedIndicator,
            }
        }
    });

    //LSIS Sub Category Ethnicity
    let getLsisSubCategoryEthnicity = document.getElementById('lsisSubCategoryEthnicity').getContext("2d");
    let initialValueLsisEthicity = lsisSubCategoryEthnicity.map(d=> d[initialChoosedIndicator]);
    let categoryEthnicity= lsisSubCategoryEthnicity.map(d => d.Sub_Category);
    let lsisSubCategoryEthnicityChart = new Chart(getLsisSubCategoryEthnicity, {
        type: 'polarArea',
        data: {
            labels: categoryEthnicity,
            datasets: [
                {
                    label: initialChoosedIndicator,
                    data: initialValueLsisEthicity,
                    backgroundColor: colorSetLSISEthnicityChart,
                    borderWidth: 0,
                }
            
            ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: initialChoosedIndicator,
            }
        }
    });

    //LSIS Sub Category Wealth
    let getLsisSubCategoryWealth = document.getElementById('lsisSubCategoryWealth').getContext("2d");
    let valueLsisWealth = lsisSubCategoryWealth.map(d => d["Skill delivery"]);
    let categoryWealth = lsisSubCategoryWealth.map(d => d.Sub_Category);
    let lsisSubCategoryWealthChart = new Chart(getLsisSubCategoryWealth, {
        type: 'polarArea',
        data: {
            labels: categoryWealth,
            datasets: [
                {
                    label: initialChoosedIndicator,
                    data: valueLsisWealth,
                    backgroundColor: colorSetLSISWealthChart,
                    borderWidth: 0,
                }
            
            ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: initialChoosedIndicator,
            },
        },
    });

}


//*****************************************************//
//**************WARNING: Test Section*****************//
//***************************************************//
//Sankey Graph
    $(document).ready(function () {
        let sankeyDataImport = 'data/mulnutrition_sankey.csv'; //Data directory path
        Promise.resolve(d3.csv(sankeyDataImport, d3.autoType)).then(importSankeyData); //Import data, use promise.resolve function to handle data import
        let svg = d3.select("#sankey"); //crate variale svg to select DOM
        function importSankeyData (data) {
            let width = 800;
            let height = 800;
            let edgeColor = "input";
            let align = "justify";
            let keys = data.columns.slice(0, -1)


            let dataNodes = Array.from(new Set(data.flatMap(l => [l.source, l.target])), name => ({name}));
            let dataLinks = data;

            function graph () { //Function to minipulate data in sankey format
                let index = -1;
                const nodes = [];
                const nodeByKey = new Map;
                const indexByKey = new Map;
                const links = [];
            
                for (const k of keys) {
                for (const d of data) {
                    const key = JSON.stringify([k, d[k]]);
                    if (nodeByKey.has(key)) continue;
                    const node = {name: d[k]};
                    nodes.push(node);
                    nodeByKey.set(key, node);
                    indexByKey.set(key, ++index);
                }
                }
            
                for (let i = 1; i < keys.length; ++i) {
                const a = keys[i - 1];
                const b = keys[i];
                const prefix = keys.slice(0, i + 1);
                const linkByKey = new Map;
                for (const d of data) {
                    const names = prefix.map(k => d[k]);
                    const key = JSON.stringify(names);
                    const value = d.value || 1;
                    let link = linkByKey.get(key);
                    if (link) { link.value += value; continue; }
                    link = {
                    source: indexByKey.get(JSON.stringify([a, d[a]])),
                    target: indexByKey.get(JSON.stringify([b, d[b]])),
                    names,
                    value
                    };
                    links.push(link);
                    linkByKey.set(key, link);
                }
                }
            
                return {nodes, links};
            };


            let test = graph(data);

            let useData = {dataNodes, dataLinks};

            const color = d3.scaleOrdinal(d3.schemePastel1);
            
            let sankey = d3.sankey()
                .nodeId(d => d.name)
                .nodeAlign(d3[`sankey${align[0].toUpperCase()}${align.slice(1)}`])
                .nodeWidth(15)
                .nodePadding(10)
                .extent([[1, 5], [width - 1, height - 5]]);
            let {nodes, links} = sankey({
                nodes: dataNodes.map(d => Object.assign({}, d)),
                links: dataLinks.map(d => Object.assign({}, d))
            });

            svg.append("g")
            .attr("stroke", "#000")
            .selectAll("rect")
            .data(nodes)
            .join("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", d => d.y1 - d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("fill", d => color(d.name))
            .append("title")
            .text(d => `${d.name}\n ${d.value}`);


            const link = svg.append("g")
                .attr("fill", "none")
                .attr("stroke-opacity", 0.5)
                .selectAll("g")
                .data(links)
                .join("g")
                .style("mix-blend-mode", "multiply");

            if (edgeColor === "path") {
                const gradient = link.append("linearGradient")
                    .attr("id", d => (d.uid = DOM.uid("link")).id)
                    .attr("gradientUnits", "userSpaceOnUse")
                    .attr("x1", d => d.source.x1)
                    .attr("x2", d => d.target.x0);
            
                gradient.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", d => {
                        let name = d.source.name;
                        return color(name.replace(/ .*/, ""));
                    });
            
                gradient.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", d => {
                        let name = d.target.name;
                        return color(name.replace(/ .*/, ""));
                    });
                }

            link.append("path")
                .attr("d", d3.sankeyLinkHorizontal())
                .attr("stroke", d => edgeColor === "none" ? "#aaa"
                    : edgeColor === "path" ? d.uid 
                    : edgeColor === "input" ? color(d.source.name) 
                    : color(d.target.name))
                .attr("stroke-width", d => Math.max(1, d.width));

            link.append("title")
            .text(d => `${d.source.name} → ${d.target.name}\n` + d.value);
        
            svg.append("g")
                .style("font", "10px sans-serif")
                .selectAll("text")
                .data(nodes)
                .join("text")
                .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
                .attr("y", d => (d.y1 + d.y0) / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
                .text(d => d.name);
            svg.node();
        }
    });