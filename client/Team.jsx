
Team = React.createClass({

  createTeam(event) {
    event.preventDefault();
    var check = TeamCollection.findOne({name: React.findDOMNode(this.refs.createName).value});
    if (!check) {
      TeamCollection.insert({
        name: React.findDOMNode(this.refs.createName).value,
        members: [Meteor.userId()],
        creator: Meteor.userId()
      });
    }
  },

  joinTeam(event) {
    event.preventDefault();
    var check = TeamCollection.findOne({name: React.findDOMNode(this.refs.joinName).value});
    if (check) {
      TeamCollection.update(check._id, {
        '$addToSet': {
          members: Meteor.userId()
        }
      })
      Meteor.users.update(Meteor.userId(),{
        '$addToSet': {
          'profile.teams': check._id
        }
      })
    }
  },

  render() {
    return(
      <div className="ui segment inverted very padded">
        <form onSubmit={this.createTeam}>
          <div className="ui input">
            <input placeholder="Create a new team" ref="createName" type="text" />
          </div>
          <button type="submit" className="ui button">create</button>
        </form>

        <form onSubmit={this.joinTeam}>
          <div className="ui input">
            <input placeholder="Join an existing team" ref="joinName" type="text" />
          </div>
          <button type="submit" className="ui button">join</button>
        </form>
      </div>
    );
  }
});
