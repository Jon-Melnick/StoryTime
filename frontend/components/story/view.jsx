const React = require('react'),
      Segment = require('./segments'),
      Hand = require('./hand');

const View = React.createClass({

  _changeView(e){
    e.preventDefault();
    let view = document.getElementById('view');
    view.textContent = e.currentTarget.textContent;
  },

  render(){
    return(
      <div className="story-view">
        <div id="view" className="story"> Current Story </div>
        <Segment changeView={this._changeView}/>
        <Hand />
      </div>
    )
  }
})

module.exports = View;
