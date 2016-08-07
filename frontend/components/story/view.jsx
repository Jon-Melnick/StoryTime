const Segment = require('./segments'),
      Hand = require('./hand');

import React from 'react'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    auth: store.auth,
    currentUser: store.user.user,
    userFetched: store.user.fetched,
    // story: store.stories.story,
  };
})


export default class View extends React.Component {

  _changeView(e){
    e.preventDefault();
    let view = document.getElementById('view');
    view.textContent = e.currentTarget.textContent;
  }

  render(){
    const { user, story, auth } = this.props
    console.log(auth);
    let hand = ["King", "Queen", "Dragon", "Sword", "Wizard"]
    return(
      <div className="story-view">
        <div id="view" className="story"> Current Story </div>
        <Segment changeView={this._changeView}/>
        <Hand words={hand}/>
      </div>
    )
  }
}
