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

        function format(test) {
            const f = d3.format(",.0f");
            return test => `${f(test)} TWh`;
          }
        
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
        .text(d => `${d.name}\n${format(d.value)}`);


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
        console.log(nodes);
        svg.node();
    }
});