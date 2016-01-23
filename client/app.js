var React = require('react');
var ReactDOM = require('react-dom');
var QueryForm = require('./form').form;

defaults = {
    start: '2015-11-01',
    end: '2016-01-01',
    sub: 'politics',
}

var Book = React.createClass({
  render: function() {
    return (
    <div>
      <QueryForm start={defaults.start} end={defaults.end} subreddit={defaults.sub} />
    </div>
    );
  }
});

ReactDOM.render(<Book />, document.getElementById('container'));
