const React = require('react'),
      Card = require('./card');

const Hand = React.createClass({

  render(){

    return (
      <ul className="hand">
        {this.props.words.map((word) => {
          return <li className="card" key={word}>{word}</li>
        })}
      </ul>
    )
  }
})

module.exports = Hand;
