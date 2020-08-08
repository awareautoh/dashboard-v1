var ctx = document.getElementById('myChart2').getContext("2d");

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["2015", "2016", "2017", "2018", "2019"],
        datasets: [{
            label: "Newborn breastfeeding within first 60 minutes of birth",
            borderColor: "rgba( 131, 209, 152, 1)",
            backgroundColor: "rgba( 131, 209, 152,0.8)",
            data: [46.8, 51.9, 56.8, 59.7, 62.4]
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
                    maxTicksLimit: 5,
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