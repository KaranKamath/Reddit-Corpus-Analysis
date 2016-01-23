var React = require('react');
var ReactDOM = require('react-dom');
var QueryForm = require('./form').form;
var WordCloud = require('./d3Comp').cloud;

var injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

defaults = {
    month: 'December',
    year: '2015',
    sub: 'politics',
    wordmap: [
        { text: "Hello", size: 10 + Math.random() * 90 },
        { text: "world", size: 10 + Math.random() * 90 },
        { text: "normally", size: 10 + Math.random() * 90 },
        { text: "you", size: 10 + Math.random() * 90 },
        { text: "want", size: 10 + Math.random() * 90 },
        { text: "more", size: 10 + Math.random() * 90 },
        { text: "words", size: 10 + Math.random() * 90 },
        { text: "kappa", size: 10 + Math.random() * 90 },
    ],              
};

var Main = React.createClass({
 
 handleSubmit: function(query) {
    console.log(query);
 },

 render: function() {
    return (
    <div style={{ fontFamily: "'Roboto', san-serif",}}>
      <QueryForm month={defaults.month} year={defaults.year} subreddit={defaults.sub} onSubmit={this.handleSubmit}/>
      <WordCloud wordmap={defaults.wordmap}/>
    </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('container'));
