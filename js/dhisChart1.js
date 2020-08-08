var ctx = document.getElementById('myChart1').getContext("2d");

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["2015", "2016", "2017", "2018", "2019"],
        datasets: [{
            label: "Low birth weight among estimated live birth",
            borderColor: "#80b6f4",
            pointBorderColor: "#80b6f4",
            pointBackgroundColor: "#80b6f4",
            pointHoverBackgroundColor: "#80b6f4",
            pointHoverBorderColor: "#80b6f4",
            pointBorderWidth: 4,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 2,
            fill: false,
            borderWidth: 2,
            data: [3.6, 3.1, 3.3, 3.6, 3.9]
        }]
    },
    options: {
        legend: {
            position: "bottom"
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 3,
                    padding: 20
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }

            }],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent"
                },
                ticks: {
                    //padding: 20,
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold"
                }
            }]
        },
        plugins: {
            datalabels: {
                display: false,
            },
        }
        
    }
});