const React = require('react'),
      Card = require('./card');
      import map from 'lodash/map'



const Hand = React.createClass({

  render(){
    let klass = "card"
    const hand = map(this.props.words, (val, key)=>{
      return <li key={key}
                 value={key}
                 className={
                   (this.props.selectedCards.indexOf(val['word']) > -1) ? klass + " selected-card" : klass}
                 onClick={this.props.selectCard}>{val['word']}</li>
    })
    return (
      <ul className="hand">
        {hand}
      </ul>
    )
  }
})

module.exports = Hand;
