const React = require('react'),
      Card = require('./card');

const Hand = React.createClass({

  render(){
    return (
      <ul className="hand">
        <li className="card">card 1</li>
        <li className="card">card 2</li>
        <li className="card">card 3</li>
        <li className="card">card 4</li>
        <li className="card">card 5</li>
      </ul>
    )
  }
})

module.exports = Hand;
