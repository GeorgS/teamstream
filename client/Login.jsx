Login = React.createClass({

  sendVerification(event) {
    event.preventDefault();

    Meteor.sendVerificationCode(React.findDOMNode(this.refs.email).value, function(error, result) {
      error ? console.error(error.error) : console.log(result);
    });
  },

  render() {
    return(
      <form onSubmit={this.sendVerification}>
        <div className="ui input">
          <input ref="email" type="text" />
        </div>
        <button type="submit" className="ui button">okay</button>
      </form>
    );
  }
});
