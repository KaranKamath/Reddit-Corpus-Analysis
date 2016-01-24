var fill = d3.scale.category20();

var layout = d3.layout.cloud()
    .size([500, 500])
    .words([
        "Hello", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "world", "normally", "you", "want", "more",
        "Hello", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "world", "normally", "you", "want", "more",
        "Hello", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "world", "normally", "you", "want", "more",
        "Hello", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "world", "normally", "you", "want", "more",
        "Hello", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "fuck", "world", "normally", "you", "want", "more", "words",
        "than", "this", "kappa"
    ].map(function(d) {
        return {
            text: d,
            size: 10 + Math.random() * 90,
            test: "haha"
        };
    }))
    .padding(5)
    .rotate(function() {
        return ~~(Math.random() * 2) * 90;
    })
    .font("Impact")
    .fontSize(function(d) {
        return d.size;
    })
    .on("end", draw);

layout.start();

function draw(words) {
    d3.select("#chart").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) {
            return d.size + "px";
        })
        .style("font-family", "Impact")
        .style("fill", function(d, i) {
            return fill(i);
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) {
            return d.text;
        });
    d3.select("#chart").selectAll("text")
        .on("mouseover", function(d) {
            d3.select(this).transition().style("font-size", function(d, i) {
                return (1.25 * d.size) + "px";
            });
        })
        .on("mouseout", function(d) {
            d3.select(this).transition().style("font-size", function(d, i) {
                return d.size + "px";
            });
        });
}

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'mmmm, yyyy'
});