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
    console.log(evt);
    console.log(this.state);
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
              <MenuItem value={1} primaryText="news"/>
              <MenuItem value={2} primaryText="politics"/>
            </DropDownMenu>
          </span>  
          <span style={styles.field}>
              <SelectField value={this.state.month} onChange={this.handleMonthChange}>
                <MenuItem value={1} primaryText="January"/>
                <MenuItem value={2} primaryText="February"/>
                <MenuItem value={3} primaryText="March"/>
                <MenuItem value={4} primaryText="April"/>
                <MenuItem value={5} primaryText="May"/>
                <MenuItem value={6} primaryText="June"/>
                <MenuItem value={7} primaryText="July"/>
                <MenuItem value={8} primaryText="August"/>
                <MenuItem value={9} primaryText="September"/>
                <MenuItem value={10} primaryText="October"/>
                <MenuItem value={11} primaryText="November"/>
                <MenuItem value={12} primaryText="December"/>
              </SelectField>
          </span>
          <span style={styles.field}>
            <SelectField value={this.state.year} onChange={this.handleYearChange}>
              <MenuItem value={1} primaryText="2014" />
              <MenuItem value={2} primaryText="2015" />
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
