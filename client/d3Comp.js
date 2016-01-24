var React = require('react');
var ReactDOM = require('react-dom');

var d3 = require('d3'),
    cloud = require('d3-cloud');

var fill = d3.scale.category20();

var WordCloud = React.createClass({
    propTypes: {
        wordmap: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        var newlayout = this.getLayout();
        return {wordmap: this.props.wordmap, layout: newlayout};
    },

    getLayout: function() {
        return cloud().size([500, 500]).words(this.props.wordmap).padding(5).rotate(function() {
            return ~~ (Math.random() * 2) * 90;
        }).font("Impact").fontSize(function(d) {
            return d.size;
        }).on("end", this.draw);
    },

    draw: function(words) {
        d3.select(ReactDOM.findDOMNode(this)).append("svg").attr("width", this.state.layout.size()[0]).attr("height", this.state.layout.size()[1]).style("cursor", "default").style("-webkit-user-select", "none").append("g").attr("transform", "translate(" + this.state.layout.size()[0] / 2 + "," + this.state.layout.size()[1] / 2 + ")").selectAll("text").data(words).enter().append("text").style("font-size", function(d) {
            return d.size + "px";
        }).style("font-family", "Impact").style("fill", function(d, i) {
            return fill(i);
        }).attr("text-anchor", "middle").attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        }).text(function(d) {
            return d.text;
        });
        d3.selectAll("text").on("mouseover", function(d) {
            d3.select(this).transition().style("font-size", function(d, i) {
                return (1.25 * d.size) + "px";
            });
        }).on("mouseout", function(d) {
            d3.select(this).transition().style("font-size", function(d, i) {
                return d.size + "px";
            });
        }).on("click", function(d) {
            console.log(d);
            debugger;
        });
        
    },

    componentDidMount: function() {
        this.setState({layout: this.getLayout()});
        this.state.layout.start();
    },

    render: function() {
        return (
            <div className="Chart"></div>
        );
    }
});

module.exports = {
    cloud: WordCloud
};
