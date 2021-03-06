
/*----------------------------------------------------------------------------
This is a hacked version of the code I found here:

  http://mbostock.github.com/d3/talk/20111116/bundle.html

There are several variations of that graph floating around on the web.  That
one has the highlighting effect and drag-to-spin fetaures you see here.  I
modified a lot of the code to make it more understandable (to me).  But I
still don't really know the math or most of the d3 features.
/*---------------------------------------------------------------------------*/

var rotate = 0;
var div;
var m0;

//----------------------------------------------------------------------------

var jsonURL = d3.select("#wheel").attr("data-json-url");

d3.json(jsonURL, function(prereqs) {

    if (!prereqs.length) {
        d3.select("#wheel").html("<p class='lead nodata'>No Data Available</p>");
        return;
    }

    var data    = transform(prereqs);
    var bundle  = d3.layout.bundle();

    var maxInnerRadius   = 500,
        minInnerRadius   = 75,
        minNameTightness = 12,
        longNameLength   = 180,
        numberOfNodes    = data.children.length;

    var innerRadius   = Math.max(minInnerRadius,
                            Math.min(maxInnerRadius,
                                          (numberOfNodes * minNameTightness / (2 * Math.PI))));

    var outerDiameter = (innerRadius + longNameLength) * 2;
    var outerRadius   = outerDiameter / 2;

    div = d3.select("#wheel")
        .style("width", outerDiameter + "px")
        .style("margin", "0 auto");

    var cluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(function(a, b) { return d3.ascending(a.key, b.key); });

    var nodes   = cluster.nodes(data);
    var links   = linkNodes(nodes);
    var splines = bundle(links);

    var line = d3.svg.line.radial()
        .radius(function(d) { return d.y; })
        .angle(function(d) { return d.x / 180 * Math.PI; })
        .interpolate("bundle")
        .tension(1);

    // Remve contents of the container
    // This is usually a spinner graphic
    div.selectAll("div").remove();

    var svg = div.append("svg:svg")
        .attr("width", outerDiameter)
        .attr("height", outerDiameter)
        .append("svg:g")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    svg.selectAll("path.link")
        .data(links)
        .enter().append("svg:path")
        .attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key; })
        .attr("d", function(d, i) { return line(splines[i]); });

    svg.selectAll("g.node")
        .data(nodes.filter(function(n) { return !n.children; }))
        .enter().append("svg:g")
        .attr("class", "node")
        .attr("id", function(d) { return "node-" + d.key; })
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .append("svg:text")
        .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
        .text(function(d) { return d.name; })
        .on("mouseover", function(d) { mouseover(d, svg); } )
        .on("mouseout",  function(d) { mouseout(d, svg);  } );

    d3.select(window)
        .on("mousedown", function(d) { mousedown(svg, outerRadius); } )
        .on("mousemove", function(d) { mousemove(svg, outerRadius); } )
        .on("mouseup",   function(d) { mouseup(svg, outerRadius); } );

    var wrapper;
    if (wrapper = d3.select("#wheel-wrapper")[0]) {
        wrapper[0].scrollTop  = (outerDiameter - wrapper[0].clientHeight) / 2;
        wrapper[0].scrollLeft = (outerDiameter - wrapper[0].clientWidth) / 2;
    }
});


//----------------------------------------------------------------------------

function transform (prereqs) {
    var map = {};

    function find(name, data) {
        var node = map[name], i;
        if (!node) {
            node = map[name] = data || {name: name, children: []};
            if (name.length) {
                node.parent = find('');
                node.parent.children.push(node);

                // Literal '.' not allowed in selector,
                // so replace it with an underscore.
                node.key = name.replace(/\./g, "_");
            }
        }

        return node;
    }

    prereqs.forEach(function(d) { find(d.name, d); });

    return map[""];
}

//----------------------------------------------------------------------------

function linkNodes (nodes) {
    var map = {},
    links = [];

    // Compute a map from name to node.
    nodes.forEach(function(d) {
        map[d.name] = d;
    });

    // For each prereq, construct a link from the source to target node.
    nodes.forEach(function(d) {
        if (d.prereqs) d.prereqs.forEach(function(i) {
            links.push({source: map[d.name], target: map[i]});
        });
    });

    return links;
}

//----------------------------------------------------------------------------

function mouseover(d, svg) {

    svg.selectAll("path.link.target-" + d.key)
        .classed("target", true)
        .each(updateNodes(svg, "source", true));

    svg.selectAll("path.link.source-" + d.key)
        .classed("source", true)
        .each(updateNodes(svg, "target", true));

    return true;
}

//----------------------------------------------------------------------------

function mouseout(d, svg) {

    svg.selectAll("path.link.source-" + d.key)
        .classed("source", false)
        .each(updateNodes(svg, "target", false));

    svg.selectAll("path.link.target-" + d.key)
        .classed("target", false)
        .each(updateNodes(svg, "source", false));

}

//----------------------------------------------------------------------------

function mousedown(svg, r) {

    m0 = mouse(d3.event, r, r);
    d3.event.preventDefault();
}

//----------------------------------------------------------------------------

function mousemove(svg, r) {

    if (! m0) return;

    var m1 = mouse(d3.event, r, r);
    rotate += Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

    if (rotate > 360) rotate -= 360;
    else if (rotate < 0) rotate += 360;

    svg.attr("transform", "translate(" + r + "," + r + ")rotate(" + rotate + ")");

    // Some alternatives. Not sure if we need these for browser compatibility:
    // var translation = "translate(" + r + "px," + r + "px)rotate(" + rotate + "deg)";
    // svg.style("-webkit-transform", translation);
    // svg.style("-ms-transform", translation);
    // svg.style("transform", translation);

    m0 = m1;
}

//----------------------------------------------------------------------------

function mouseup(svg, rx, ry) {

    m0 = null;

    svg.selectAll("g.node text")
        .attr("dx", function(d) { return (d.x + rotate) % 360 < 180 ? 8 : -8; })
        .attr("text-anchor", function(d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; });

    return true;
}

//----------------------------------------------------------------------------

function cross(a, b) {

    return a[0] * b[1] - a[1] * b[0];
}

//----------------------------------------------------------------------------

function dot(a, b) {

    return a[0] * b[0] + a[1] * b[1];
}

//----------------------------------------------------------------------------

function mouse(e, rx, ry) {

    var containerRect =  div[0][0].getBoundingClientRect();
    var xOffset = containerRect.left + window.scrollX;
    var yOffset = containerRect.top  + window.scrollY;

    return [e.pageX - rx - xOffset, e.pageY - ry - yOffset];
}

//----------------------------------------------------------------------------

function updateNodes(svg, name, value) {

    return function(d) {
        if (value) this.parentNode.appendChild(this);
            svg.select("#node-" + d[name].key).classed(name, value);
    };
}
