const Segment = require('./segments'),
      Hand = require('./hand');

import React from 'react'
import { connect } from 'react-redux'
import { getStory, removeStory, createSection, getNewCards, markSeen } from '../../actions/storyActions'
import map from 'lodash/map'
import { hashHistory } from 'react-router'
import Authors from '../authors/authors'
import isEmpty from 'lodash/isEmpty'


class View extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newSection: false,
      body: '',
      sectionContent: '',
      hand: null,
      view: 'story',
      selectedCards: []
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
        this._redirectIfNotAllowed(this.setThisState.bind(this))
      })
    } else {
      this._redirectIfNotAllowed(this.setThisState.bind(this))
    }
  }

  componentWillReceiveProps(props){
    if (this.props.routeParams.storyId !== props.routeParams.storyId) {
      const prevId = this.props.routeParams.storyId;
      this.props.getStory(props.routeParams.storyId).then(
        (res)=>this._redirectIfNotAllowed(this.setThisState.bind(this)),
        (err) =>{hashHistory.push('/dashboard/' + this.props.auth.user.id);
                 return}
    )}
  }

  setThisState(){
    if (this.props.story.currentSection) {
      this.setState({sectionContent: this.props.story.currentSection,
                     hand: this.props.story.hand})
      this._changeView(0)
    }
  }

  _redirectIfNotAllowed(callback) {
    const { user, story, auth } = this.props
    const writer_ids = map(story.authors, (author)=>{
      return author.id
    })
    if (writer_ids.indexOf(auth.user.id) < 0) {
      hashHistory.push('/dashboard/' + auth.user.id);
      return
    }
    callback()
  }

  selectCard(e){
    console.log(this.state);
    if (!this.state.newSection) {
      return
    }
    let body = this.state.body;
    body = body.replace(/--/g, "");
    const word = e.target.textContent
    const idx = e.target.value
    let state = this.state.selectedCards
    console.log('word ' + word + ', idx ' + idx + ', state ' + state);
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

  addWriter(){
    const view = this.state.view === 'story' ? 'find authors' : 'story'
    this.setState({view: view, newSection: false, selectedCards: []})
  }

  _changeView(idx){
    const {story, user} = this.props
    if (isEmpty(story.sections)) {
      return;
    }
    if (!story.sections[idx].seen[user.user.id.toString()]){
      this.props.markSeen(user.user.id, story.sections[idx].id);
    }
    this.setState({sectionContent: story.sections[idx]});
  }

  onChange(e){
    this.setState({body: e.target.value});
  }

  selectedCards(){
    let result = false;
    this.state.selectedCards.forEach(card =>{
      if (card) {
        result = true;
      }
    })
    return result;
  }

  newSection(e){
    e.preventDefault();
    if (this.state.newSection && this.state.body !== '' && this.selectedCards()) {
      const data = {
        body: this.state.body.replace(/--/g, ""),
        story_id: parseInt(this.props.params.storyId)
      }
      this.redraw();
      this.props.createSection(data).then(
        ()=>{
          this.setState({sectionContent: this.props.story.currentSection, body: '', selectedCards: []});
        });
    }
    this.setState({newSection: !this.state.newSection, view: 'story', selectedCards: []})
  }

  getView(){
    let view;
    switch (this.state.view) {
      case 'story':
        view = <div className='story-inner'>
          {this.state.newSection ?
            <textarea id='new-section-form'
                      className='form-control'
                      rows="12"
                      onChange={this.onChange}
                      value={this.state.body} />
            : <div>{this.state.sectionContent.body}</div>}
        </div>
        break;
      case 'find authors':
        view = <div>
            <Authors/>
            </div>
        break;
    }
    return view;
  }

  render(){
    const { user, story, auth } = this.props
    const sections = story.sections
    let hand = ["", "", "", "", ""]
    const view = this.getView()
    return(
      <div className="story-view">
        <div className='story-container'>
          <div id="view" className="story"> {view} </div>
            <div className="btn-group btn-group-justified story-bar"
                 role="group"
                 aria-label="...">

               <div className="btn-group" role="group">
                 <button className='btn btn-default'
                         onClick={this._changeView.bind(this, (this.state.sectionContent.id - 2))}
                         disabled={this.state.sectionContent.id === 1 ? true : false}>
                         &laquo; Previous
                 </button>
               </div>

              <div className="btn-group" role="group">
                <button className='btn btn-default'
                        onClick={this.newSection}>
                        {this.state.newSection ? (this.state.body === '' ? 'Cancel':'Submit') : 'Create new section'}
                </button>
              </div>

              <div className="btn-group" role="group">
                <button className='btn btn-default'
                        onClick={this.addWriter.bind(this)}>
                        {this.state.view === 'find authors' ? 'Story' : 'Add A Writer'}
                </button>

              </div>

              <div className="btn-group" role="group">
                <button className='btn btn-default'
                        onClick={this._changeView.bind(this, (this.state.sectionContent.id))}
                        disabled={this.state.sectionContent.id < sections.length ? false : true}>
                        Next &raquo;
                </button>
              </div>
            </div>
          <Hand words={this.state.hand || hand}
                selectCard={this.selectCard}
                selectedCards={this.state.selectedCards}/>
        </div>
        <Segment changeView={this._changeView} sections={sections} section={this.state.sectionContent} user={this.props.user.user}/>
      </div>
    )
  }
}

View.propTypes = {
  getStory: React.PropTypes.func.isRequired,
  removeStory: React.PropTypes.func.isRequired,
  createSection: React.PropTypes.func.isRequired,
  getNewCards: React.PropTypes.func.isRequired,
  markSeen: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return{
    auth: state.auth,
    story: state.story.story,
    user: state.user
  };
}

export default connect(mapStateToProps, { getStory, createSection, removeStory, getNewCards, markSeen })(View);
