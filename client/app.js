var React = require('react');
var ReactDOM = require('react-dom');
var QueryForm = require('./form').form;
var WordCloud = require('./d3Comp').cloud;
var TopicList = require('./topiclist').topiclist;

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
    topics: [
        { words:[ 'bernie', 'democratic', 'ellen', 'second'], 'rating': { 'happy':44, 'sad': 433 }},
        { words:[ 'hillary', 'democratic', 'benghazi', 'email'], 'rating': { 'happy':56, 'sad': 43 }},    
        { words:[ 'trump', 'guns', 'cruz', 'canada', 'republican'], 'rating': { 'happy':74, 'sad': 298 }},
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
      <div style={{ display: 'flex'}}>
        <WordCloud style={{ flexGrow: 1 }} wordmap={defaults.wordmap}/>
        <TopicList topics={defaults.topics} style={{ flexGrow: 3}}></TopicList>
      </div>
    </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('container'));
