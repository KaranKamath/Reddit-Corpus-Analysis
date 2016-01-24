var React = require('react');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var ActionInfo = require('material-ui/lib/svg-icons/action/info');

var TopicList = React.createClass({
  propTypes: {
    topics: React.PropTypes.array.isRequired,
  },

  getInitialState: function() {
    return {
      topics: this.props.topics,
    };
  },

  render: function() {
    return (
      <List>
      </List>
    );
  },
});

module.exports = {
  topiclist: TopicList,
};
