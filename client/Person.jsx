Person = React.createClass({

  componentDidMount() {
      var _this = this
      if (this.props.name !== Meteor.userId()) {
        stream.on('notification-' +  this.props.name, function(message) {
          document.querySelector('#' + _this.props.name).src = message;
        });
      } else {
        var video = document.querySelector("#local");

        // check for getUserMedia support
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        if (navigator.getUserMedia) {
          navigator.getUserMedia({video: {
            optional: [
              { width: 640 },
              { width: { min: 320 }},
              { frameRate: 1 },
              { width: { max: 800 }},
              { facingMode: "user" }
            ]
          }}, function(_stream) {
            video.src = window.URL.createObjectURL(_stream)
          }, function(error) {
            console.error(error)
          });
        }

        var v,canvas,context,w,h;
        v = document.getElementById('local');
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        w = canvas.width;
        h = canvas.height;

        function draw(v,c,w,h) {
          context.drawImage(v,0,0,w,h);
          var uri = canvas.toDataURL("image/jpeg", .4);
          stream.emit('notification-'+_this.props.name, uri);
        }

        setInterval(function() {
          draw(v,context,w,h);
        }, 5000);
      }

  },

  render() {

    let elements = [];
    if (this.props.name === Meteor.userId()) {
      elements.push(<canvas width="640" height="480" id="canvas"></canvas>)
      elements.push(<video width="640" height="480" style={{display: 'none'}} id="local" autoPlay></video>)
    } else {
      elements.push(<img width="640" height="480"  id={this.props.name} autoPlay />)
    }

    return(
      <div className="video-card">
      {elements}
      <div className="description">
      <h3>{this.props.name}</h3>
      </div>
      </div>
    )
  }
});
