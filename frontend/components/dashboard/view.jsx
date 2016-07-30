const React = require('react'),
      Profile = require('./profile'),
      Stories = require('./stories'),
      Friends = require('./friends');

const View = React.createClass({
  render(){
    return (
      <div>
        <Profile />
        <Stories />
        <Friends />
      </div>
    )
  }
})

module.exports = View;
