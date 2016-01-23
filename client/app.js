var React = require('react')
var ReactDOM = require('react-dom')

var data = {
  title: 'Professional Node.js',
  author: 'Pedro Teixeira'
};

var Book = React.createClass({
  render: function() {
    return (
    <div>
      <p>{this.props.data.title}</p>
      <p>{this.props.data.author}</p>
    </div>
    );
  }
});

ReactDOM.render(<Book data={data}/>, document.getElementById('container'));
