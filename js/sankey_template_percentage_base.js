$(document).ready(function () {
    let sankeyDataImport = 'data/sankey.csv'; //Data directory path
    Promise.resolve(d3.csv(sankeyDataImport, d3.autoType)).then(importSankeyData); //Import data, use promise.resolve function to handle data import
    let svg = d3.select("#sankey"); //crate variale svg to select DOM
    function importSankeyData (data) {
        let keys = data.columns.slice(0, -1)
        console.log(keys);
        color = d3.scaleOrdinal(["Perished"], ["#da4f81"]).unknown("#ccc");
        console.log(color);

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

        console.log(test);

        let sankey =
            d3.sankey() //Set-up Sankey
            .nodeSort(null)
            .linkSort(null)
            .nodeWidth(4)
            .nodePadding(20)
            .extent([[0, 5], [640, 960 - 5]]); //Width: 640, Height: 960 NOTE: Manual Entry

        let {nodes, links} = sankey({
            nodes: test.nodes.map(d => Object.assign({}, d)),
            links: test.links.map(d => Object.assign({}, d))
            });

        console.log(links);
        let width = 975;
        let height = 920;

        svg.append("g")
            .selectAll("rect")
            .data(nodes)
            .join("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", d => d.y1 - d.y0)
            .attr("width", d => d.x1 - d.x0)
            .append("title")
            .text(d => `${d.name}\n${d.value.toLocaleString()}`);
        
        svg.append("g")
            .attr("fill", "none")
            .selectAll("g")
            .data(links)
            .join("path")
            .attr("d", d3.sankeyLinkHorizontal())
            .attr("stroke", d => color(d.names[0]))
            .attr("stroke-width", d => d.width)
            .style("mix-blend-mode", "multiply")
            .append("title")
            .text(d => `${d.names.join(" → ")}\n${d.value.toLocaleString()}`);
    
      svg.append("g")
            .style("font", "10px sans-serif")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
            .text(d => d.name)
            .append("tspan")
            .attr("fill-opacity", 0.7)
            .text(d => ` ${d.value.toLocaleString()}`);
    }

    svg.nodes();
});