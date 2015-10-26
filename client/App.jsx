// Content Wrapper
MainLayout = React.createClass({
  render() {
    return(
      <div className="container">
        {this.props.content}
      </div>
    )
  }
});


// App component - represents the whole app
App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  render() {

    var _team = []

    _team.push(<Team />)

    var team = TeamCollection.findOne(Meteor.user().profile.teams[0]).members;
    for (var i = 0; i < team.length; i++) {
      _team.push(<Person name={team[i]}/>);
    }

    return (
      <h1>{ this.data.currentUser ? _team : 'Not logged in!' }</h1>
    );
  }
});
