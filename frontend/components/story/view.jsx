const Segment = require('./segments'),
      Hand = require('./hand');

import React from 'react'
import { connect } from 'react-redux'
import { getStory } from '../../actions/storyActions'
import { createSection } from '../../actions/storyActions'


class View extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newSection: false,
      body: ''
    }
    this.newSection = this.newSection.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    if (this.props.story.fetched == false){
      let id = this.props.routeParams.storyId;
      this.props.getStory(id)
    }
  }

  _changeView(e){
    e.preventDefault();
    let view = document.getElementById('view');
    view.textContent = e.currentTarget.textContent;
  }

  onChange(e){
    this.setState({body: e.target.value});
  }

  newSection(e){
    e.preventDefault();
    if (this.state.newSection) {
      const data = {
        body: this.state.body,
        // user_id: this.props.auth.user.id,
        story_id: parseInt(this.props.params.storyId)
      }
      this.props.createSection(data).then(res =>{
        console.log(res);
      });
    }
    this.setState({newSection: !this.state.newSection, body: ''})
  }

  render(){
    const { user, story, auth } = this.props
    const sections = story.sections
    if (sections.length > 0 && this.state.currentSection == null) {
      this.setState ({currentSection: sections[sections.length - 1].body})
    }
    let hand = ["King", "Queen", "Dragon", "Sword", "Wizard"]
    const view = this.state.newSection ? <textarea onChange={this.onChange} value={this.state.body} /> : this.state.currentSection
    return(
      <div className="story-view">
        <div id="view" className="story"> {view} </div>
        <Segment changeView={this._changeView} sections={sections}/>
        <div className="story-bar"><button onClick={this.newSection}>Create new section</button></div>
        <Hand words={hand}/>
      </div>
    )
  }
}

View.propTypes = {
  getStory: React.PropTypes.func.isRequired,
  createSection: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  console.log(state);
  return{
    auth: state.auth,
    story: state.story.story,
    user: state.user
  };
}

export default connect(mapStateToProps, { getStory, createSection })(View);
