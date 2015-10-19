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
    return (
      <h1>{ this.data.currentUser ? 'welcome' : 'Not logged in!' }</h1>
    );
  }
});
