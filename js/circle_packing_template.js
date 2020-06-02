    //Circle Packing Graph
    $(document).ready(function () {

        //Import Data
        d3.json("data/LSIS2.json").then(makeCircle);

        //Set Color Scale
        let color = d3.scaleLinear()
            .domain([0, 5])
            .range(d3.schemeGreys[5]);
        
        //Set data format
        let format = d3.format(",d");


        //Set Height and Width
        let height = 600;
        let width =  600;

        
        //Build Chart Function
        function makeCircle (circle) { //Add function
            let root = d3.pack() //This for set up circle
                .size([width, width])
                .padding(3)
                (d3.hierarchy(circle)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value));

            //Set Variable
            let focus = root;
            let view;

            //Check that data was added to root viaable
            console.log(root);

            //Function to creat zoom
            function zoom(d) {
                let focus0 = focus;
                //Set d to fucus; d refer to root later
                focus = d;
                //set annimation while zooming
                let transition = svg.transition()
                    .duration(d3.event.altKey ? 7500 : 750)
                    .tween("zoom", d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => zoomTo(i(t));
                    });
                label
                .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .transition(transition)
                .style("fill-opacity", d => d.parent === focus ? 1 : 0)
                .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
                select();
                let database = [];
                database = (root.data.children.map(d => d.name));    
                
                let checkParent  = () => {
                    let maxHeight = root.height;
                    let selectedHeight = d.height;
                    let marginHeight = maxHeight - 1;
                    let toAdd = "parent";
                    let selectCircle = d;
                    let a = [];
                    while (selectedHeight < maxHeight) {
                        selectCircle = selectCircle[toAdd];
                        if (selectedHeight == marginHeight) {
                            a.push(d.data.name);
                            selectedHeight++;
                        }
                        a.push(selectCircle.data.name);
                        selectedHeight++;
                    }
                    let b =[];
                    database.forEach(d => a.includes(d) ? b.push(d): null);
                }
                checkParent();
            }

            function zoomTo(v) {
                let k = width / v[2];
                view = v;
                label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
                node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
                node.attr("r", d => d.r * k);
            }


            //Select SVG from DOM
            let svg = d3.select("#circlePacking")
                        .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
                        .style("background", "none")
                        .style("cursor", "pointer")
                        .on("click", () => {
                            zoom(root);
                        });
            
            //Below to create element for circle packing

            let node = svg.append("g") //This create each circle
                .selectAll("circle")
                .data(root.descendants().slice(1))
                .join("circle")
                .attr("fill", d => d.children ? color(d.depth) : "white")
                .attr("pointer-events", d => !d.children ? "none" : null)
                .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
                .on("mouseout", function() { d3.select(this).attr("stroke", null); })
                .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));

            let label = svg.append("g") //This create text inside circle
                .style("font", "10px sans-serif")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .selectAll("text")
                .data(root.descendants())
                .join("text")
                .style("fill-opacity", d => d.parent === root ? 1 : 0)
                .style("display", d => d.parent === root ? "inline" : "none")
                .text(d => d.data.name);


            zoomTo([root.x, root.y, root.r * 2]);
            svg.node();


            //Add Chart
                //Creat Chart Women Mulnutrtion
                let ctx = document.getElementById('subBarChartforCirclePacking').getContext("2d");
                let subChart = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: ["VTE", "PH"],
                        datasets: [
                            {
                                label: 'Percentage of Women Anemia Prevalence',
                                data: [],
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255, 99, 132, 0.1)',
                                order: 1
                            }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    drawOnChartArea: false,
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                },
                                gridLines: {
                                    borderDash: [3, 10]
                                }
                            }]
                        },
                        maintainAspectRatio: false,
                    }
                });
                let x = 0;
                function select() {
                    if (x === 0) {
                        subChart.data.datasets.forEach(function(dataset) {
                            dataset.data = [2,10];
                        });
                        subChart.update();
                        x = 1;
                    } else {
                        subChart.data.datasets.forEach(function(dataset) {
                            dataset.data = [];
                        });
                        subChart.update();
                        x = 0;
                    }
                };
        }
});