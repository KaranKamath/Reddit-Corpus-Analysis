var React = require('react');
var ReactDOM = require('react-dom');
var QueryForm = require('./form').form;

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
}

var Main = React.createClass({
  render: function() {
    return (
    <div style={{ fontFamily: "'Roboto', san-serif",}}>
      <QueryForm month={defaults.month} year={defaults.year} subreddit={defaults.sub} />
    </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('container'));
