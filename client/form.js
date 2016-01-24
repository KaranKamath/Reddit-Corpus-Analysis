var React = require('react');

var SelectField = require('material-ui/lib/select-field');
var DropDownMenu = require('material-ui/lib/DropDownMenu');
var MenuItem = require('material-ui/lib/menus/menu-item');
var RaisedButton = require('material-ui/lib/raised-button');

var QueryForm = React.createClass({
  propTypes: {
    month: React.PropTypes.string.isRequired,
    year: React.PropTypes.string.isRequired,
    subreddit: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return { 
      month: this.props.month,
      year: this.props.year,
      subreddit: this.props.subreddit,
    };
  },

  handleMonthChange: function(evt) {
    this.setState({month:evt.target.innerText});
    //console.log(evt);
    //console.log(this.state);
  },

  handleSubredditChange: function(evt) {
    this.setState({subreddit:evt.target.innerText});
  },

  handleYearChange: function(evt) {
    this.setState({year:evt.target.innerText});
  },

  onTouchTap: function(e) {
    this.props.onSubmit(this.state);
  },
   
  render: function() {
    return (
      <form style={styles.form}>
          <span style={styles.field}>
            <DropDownMenu value={this.state.subreddit} onChange={this.handleSubredditChange}>
              <MenuItem value="/r/politics" primaryText="politics"/>
            </DropDownMenu>
          </span>  
          <span style={styles.field}>
              <SelectField value={this.state.month} onChange={this.handleMonthChange}>
                <MenuItem value="January" primaryText="January"/>
                <MenuItem value="February" primaryText="February"/>
                <MenuItem value="March" primaryText="March"/>
                <MenuItem value="April" primaryText="April"/>
                <MenuItem value="May" primaryText="May"/>
                <MenuItem value="June" primaryText="June"/>
                <MenuItem value="July" primaryText="July"/>
                <MenuItem value="August" primaryText="August"/>
                <MenuItem value="September" primaryText="September"/>
                <MenuItem value="October" primaryText="October"/>
                <MenuItem value="November" primaryText="November"/>
              </SelectField>
          </span>
          <span style={styles.field}>
            <SelectField value={this.state.year} onChange={this.handleYearChange}>
              <MenuItem value="2015" primaryText="2015" />
            </SelectField>
          </span>
          <span style={styles.blankspace}></span>
          <RaisedButton label="Query" secondary={true} onTouchTap={this.onTouchTap}/>
      </form>
    );
  },
});

var styles = {
  form: {
    display: 'flex'
  },

  field: {
    flexGrow: 1,
  },

  blankspace: {
    flexGrow: 3,
  },
};

module.exports = {
  form: QueryForm,
};
