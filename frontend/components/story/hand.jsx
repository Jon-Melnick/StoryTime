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
      <ul className="hand container">
        <div id='card-refresh'
             className='black'
             data-toggle="tooltip"
             data-placement="left"
             title="Redraw Cards">
          <span class="glyphicon glyphicon-refresh"
                onClick={this.props.redrawAll.bind(this)}
                aria-hidden="true"></span>
        </div>
        {hand}
      </ul>
    )
  }
})

module.exports = Hand;
