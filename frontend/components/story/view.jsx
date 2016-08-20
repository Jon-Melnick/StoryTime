const Segment = require('./segments'),
      Hand = require('./hand');

import React from 'react'
import { connect } from 'react-redux'
import { getStory } from '../../actions/storyActions'
import { removeStory } from '../../actions/storyActions'
import { createSection } from '../../actions/storyActions'
import { getNewCards } from '../../actions/storyActions'


class View extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newSection: false,
      body: '',
      sectionContent: '',
      hand: null,
      selectedCards: [null, null, null, null, null]
    }
    this.newSection = this.newSection.bind(this);
    this.onChange = this.onChange.bind(this);
    this.redraw = this.redraw.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this._changeView = this._changeView.bind(this);
  }

  componentDidMount(){
    if (this.props.story.fetched === false){
      let id = this.props.routeParams.storyId;
      this.props.getStory(id).then(()=>{
        if (this.props.story.currentSection) {
          this.setState({sectionContent: this.props.story.currentSection.body,
                         hand: this.props.story.hand})
        }
      })
    } else {
      if (this.props.story.currentSection) {
        this.setState({sectionContent: this.props.story.currentSection.body,
                       hand: this.props.story.hand})
      }
    }
  }

  selectCard(e){
    if (!this.state.newSection) {
      return
    }
    let body = this.state.body;
    body = body.replace(/--/g, "");
    const word = e.target.textContent
    const idx = e.target.value
    let state = this.state.selectedCards
    if (state[idx]) {
      state[idx] = null
    } else {
      state[idx] = word
    }
    state.forEach(word => {
      if (word) {
        let bodyIndex = body.toLowerCase().indexOf(word.toLowerCase())
        if (bodyIndex > -1) {
          body = body.slice(0, bodyIndex) + "--" + body.slice(bodyIndex, bodyIndex + word.length) + "--" + body.slice(bodyIndex+word.length)
        } else {
          state[idx] = null
        }
      }

    })
    this.setState({selectedCards: state, body: body})
  }

  redraw(){
    let card_ids = [];
    this.state.selectedCards.forEach((card, idx)=>{
      if (card) {
        card_ids.push(this.state.hand[idx].id)
      }
    })
    this.props.getNewCards(this.props.story.writer_id, card_ids).then(()=>{
      this.setState({hand: this.props.story.hand})
    })
  }

  _changeView(e){
    let idx = e.target.value;
    this.setState({sectionContent: this.props.story.sections[idx].body});
  }

  onChange(e){
    this.setState({body: e.target.value});
  }

  newSection(e){
    e.preventDefault();
    if (this.state.newSection && this.state.body !== '') {
      const data = {
        body: this.state.body.replace(/--/g, ""),
        story_id: parseInt(this.props.params.storyId)
      }
      this.redraw();
      this.props.createSection(data).then(
        ()=>{
          this.setState({sectionContent: this.props.story.currentSection.body});
        });
    }
    this.setState({newSection: !this.state.newSection, body: ''})
  }

  render(){
    const { user, story, auth } = this.props
    const sections = story.sections
    let hand = ["", "", "", "", ""]
    const view = this.state.newSection ? <textarea id='new-section-form' className='form-control' rows="12" onChange={this.onChange} value={this.state.body} /> : <div>{this.state.sectionContent}</div>

    return(
      <div className="story-view">
        <div id="view" className="story"> {view} </div>
        <Segment changeView={this._changeView} sections={sections}/>
        <div className="story-bar"><button onClick={this.newSection}>Create new section</button></div>
        <Hand words={this.state.hand || hand} selectCard={this.selectCard} selectedCards={this.state.selectedCards}/>
      </div>
    )
  }
}

View.propTypes = {
  getStory: React.PropTypes.func.isRequired,
  removeStory: React.PropTypes.func.isRequired,
  createSection: React.PropTypes.func.isRequired,
  getNewCards: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return{
    auth: state.auth,
    story: state.story.story,
    user: state.user
  };
}

export default connect(mapStateToProps, { getStory, createSection, removeStory, getNewCards })(View);
