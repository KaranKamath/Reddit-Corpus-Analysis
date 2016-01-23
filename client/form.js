var React = require('react');

var QueryForm = React.createClass({
  propTypes: {
    start: React.PropTypes.string.isRequired,
    end: React.PropTypes.string.isRequired,
    subreddit: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return { 
      start: this.props.start,
      end: this.props.end,
      subreddit: this.props.subreddit
    };
  },

  onStartChange: function(evt) {
    this.setState({ start: evt.target.value });
  },

  onEndChange: function(evt) {
    this.setState({ end: evt.target.value });
  },

  onSubredditChange: function(evt) {
    this.setState({ subreddit: evt.target.value });
  },

  render: function() {
    return (
      <form>
        From: <input name='start' type='date' value={this.state.start} onChange={this.onStartChange}/>
        To: <input name='end' type='date' value={this.state.end} onChange={this.onEndChange}/>
        /r/<input name='subreddit' type='string' value={this.state.subreddit} onChange={this.onSubredditChange}/>
      </form>
    );
  },
});

module.exports = {
  form: QueryForm,
};
