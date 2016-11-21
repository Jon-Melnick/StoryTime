const Segment = require('./segments'),
      Hand = require('./hand');

import React from 'react'
import { connect } from 'react-redux'
import { getStory, removeStory, createSection, getNewCards, markSeen } from '../../actions/storyActions'
import map from 'lodash/map'
import { hashHistory } from 'react-router'
import Authors from '../authors/authors'
import isEmpty from 'lodash/isEmpty'
import Quill from 'react-quill'


class View extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newSection: false,
      body: '',
      sectionContent: '',
      sectionContentLoc: 0,
      hand: null,
      view: 'story',
      selectedCards: [],
      errors: {},
      selectedText: '',
      sideOpen: false,
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
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
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
    e.preventDefault();
    // document.execCommand('bold')
    // console.log(document);
    // document.execCommand('bold')
    if (!this.state.newSection) {
      return
    }
    // let el = document.getElementById('new-section-form')
    // console.log(el.textContent);
    // console.log(this.state.body);

    // let selected = document.createElement('strong');
    // selected.style.color = 'red';
    // selected.textContent = this.state.selectedText;
    let body = this.state.body;
    // body = body.replace(/--/g, "");
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
        // let bodyIndex = body.toLowerCase().indexOf(this.state.selectedText.toLowerCase())
        if (bodyIndex > -1) {
          // body = body.slice(0, bodyIndex) + "--" + body.slice(bodyIndex, bodyIndex + word.length) + "--" + body.slice(bodyIndex+word.length)
          // el.textContent = body.slice(0, bodyIndex);
          // el.appendChild(selected);
          // el.textContent += body.slice(bodyIndex+word.length)

        } else {
          state[idx] = null
        }
      }

    })
    this.setState({selectedCards: state, body: body})
  }

  getSelectionText() {
    var text = "";
    var activeEl = document.getElementById('new-section-form');
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea" || activeElTagName == "input") &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
      (typeof activeEl.selectionStart == "number")
    ) {
      text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    console.log(text);
    this.setState({selectedText: text});
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

  redrawAll(){
    let card_ids = map(this.state.hand, (card)=>{
      return card.id;
    });
    console.log(card_ids)
    this.props.getNewCards(this.props.story.writer_id, card_ids).then(()=>{
      this.setState({hand: this.props.story.hand})
    })
  }

  addWriter(){
    const view = this.state.view === 'story' ? 'find authors' : 'story'
    this.setState({view: view, newSection: false, selectedCards: []})
  }

  _changeView(i){
    const {story, user} = this.props
    if (isEmpty(story.sections)) {
      return;
    }
    let idx = (i === 0 || !!(parseInt(i))) ? i : (i === "next" ? this.state.sectionContentLoc + 1 : this.state.sectionContentLoc - 1);

    if (!story.sections[idx].seen[user.user.id.toString()]){
      this.props.markSeen(user.user.id, story.sections[idx].id);
    }
    this.setState({sectionContent: story.sections[idx], sectionContentLoc: idx});
  }

  _changeSegmentsView(){
    let container = document.getElementById('segments-container')

    container.style.right = container.style.right === '0px' ? '-220px' : '0px';

    let tab = document.getElementById('segments-tab')

    if (this.state.sideOpen){
      tab.style.right = '0px';
    } else {
      tab.style.right = '220px';
    }
    this.setState({sideOpen: !this.state.sideOpen})
  }

  onChange(e){
    this.setState({body: e.target.textContent, selectedText: ''});
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
    let errors = this.state.errors;
    if (this.state.newSection && this.state.body !== '' && this.selectedCards()) {
      const data = {
        body: this.state.body.replace(/--/g, ""),
        story_id: parseInt(this.props.params.storyId)
      }
      this.redraw();
      this.props.createSection(data).then(
        ()=>{
          this.setState({sectionContent: this.props.story.currentSection, body: '', selectedCards: []});
          setTimeout(()=>{
            let segments = document.getElementsByClassName('segment');
            segments[segments.length-1].scrollIntoView();
          })
        });
    } else {
      errors['section'] = 'You did not select any cards.'
    }
    this.setState({newSection: !this.state.newSection, view: 'story', selectedCards: [], errors: errors})
    setTimeout(()=>{
      var input = document.getElementById('new-section-form');
      if (input){input.focus()}
      // input.select();
    });
  }

  getView(){
    let view;
    switch (this.state.view) {
      case 'story':
        view = <div className='story-inner'>
          {this.state.newSection ?
            <div contentEditable='true' id='new-section-form'
                      className='form-control'
                      rows="12"
                      onKeyUp={this.onChange}
                      onChange={this.onChange}
                      value={this.state.body} />
                    : <div className='black'>{this.state.sectionContent.body}</div>}
        </div>
        break;
      case 'find authors':
        view = <div>
            <Authors/>
            </div>
        break;
    }
    let holer = <Quill ref='editor'
           value={this.state.body}
           theme='snow'
           toolbar={false}/>
    return view;
  }

  render(){
    const { user, story, auth } = this.props
    const sections = story.sections
    let hand = ["", "", "", "", ""]
    const view = this.getView()
    let background = {}
    if (story.info){
      background = {backgroundImage: story.info.genre.genre_background_url, backgroundPosition: 'center', backgroundSize: 'cover'}
    }

    return (
      <div style={background}>
        <div className = 'container full-height'>
          <div className='story-view2 border'>
          <div className='col-md-9 col-xs-12'>
            <div id="view" className="story">{view}</div>

            <div className="btn-group btn-group-justified story-bar"
                 role="group"
                 aria-label="...">
               <div className="btn-group" role="group">
                 <button className='btn btn-default'
                         onClick={this._changeView.bind(this, 'prev')}
                         disabled={sections[0] && sections[0].id === this.state.sectionContent.id ? true : false}>
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
                        {this.state.view === 'find authors' ? 'Story' : 'Add Authors'}
                </button>

              </div>

              <div className="btn-group" role="group">
                <button className='btn btn-default'
                        onClick={this._changeView.bind(this, 'next')}
                        disabled={sections[0] && sections[sections.length -1].id === this.state.sectionContent.id ? true : false}>
                        Next &raquo;
                </button>
              </div>
            </div>
            <Hand words={this.state.hand || hand}
                  selectCard={this.selectCard}
                  redrawAll={this.redrawAll.bind(this)}
                  selectedCards={this.state.selectedCards}/>
          </div>

          <div id="segments-tab"
               className='btn btn-default btn-lg col-xs-1'
               onClick={this._changeSegmentsView.bind(this)}>
            {this.state.sideOpen ? <span className="glyphicon glyphicon-menu-right"></span> : <span className="glyphicon glyphicon-menu-left"></span>}
          </div>

          <div id="segments-container" className='col-md-3 col-xs-6 border-left'>
            <Segment changeView={this._changeView}
                     sections={sections}
                     section={this.state.sectionContent} user={this.props.user.user}/>
          </div>
        </div>
        </div>
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



      // <div style={background}>
      //   <div className='container'>
      //     <div className="story-view">
      //       <div className='story-container'>
      //         <div id="view" className="story"> {view} </div>
      //           <div className="btn-group btn-group-justified story-bar"
      //                role="group"
      //                aria-label="...">
      //
      //              <div className="btn-group" role="group">
      //                <button className='btn btn-default'
      //                        onClick={this._changeView.bind(this, -1)}
      //                        disabled={sections[0] && sections[0].id === this.state.sectionContent.id ? true : false}>
      //                        &laquo; Previous
      //                </button>
      //              </div>
      //
      //             <div className="btn-group" role="group">
      //               <button className='btn btn-default'
      //                       onClick={this.newSection}>
      //                       {this.state.newSection ? (this.state.body === '' ? 'Cancel':'Submit') : 'Create new section'}
      //               </button>
      //             </div>
      //
      //             <div className="btn-group" role="group">
      //               <button className='btn btn-default'
      //                       onClick={this.addWriter.bind(this)}>
      //                       {this.state.view === 'find authors' ? 'Story' : 'Add A Writer'}
      //               </button>
      //
      //             </div>
      //
      //             <div className="btn-group" role="group">
      //               <button className='btn btn-default'
      //                       onClick={this._changeView.bind(this, 1)}
      //                       disabled={sections[0] && sections[sections.length -1].id === this.state.sectionContent.id ? true : false}>
      //                       Next &raquo;
      //               </button>
      //             </div>
      //           </div>
      //         <Hand words={this.state.hand || hand}
      //               selectCard={this.selectCard}
      //               selectedCards={this.state.selectedCards}/>
      //       </div>
      //       <Segment changeView={this._changeView} sections={sections} section={this.state.sectionContent} user={this.props.user.user}/>
      //     </div>
      //   </div>
      // </div>


// const holder = {'div': {return(
// <div className = 'container'>
//   <div className='col-md-9 border'>
//     <div className='story2'>{view}</div>
//     <div className="btn-group btn-group-justified story-bar"
//          role="group"
//          aria-label="...">
//
//        <div className="btn-group" role="group">
//          <button className='btn btn-default'
//                  onClick={this._changeView.bind(this, (this.state.sectionContent.id - 2))}
//                  disabled={this.state.sectionContent.id === 1 ? true : false}>
//                  &laquo; Previous
//          </button>
//        </div>
//
//       <div className="btn-group" role="group">
//         <button className='btn btn-default'
//                 onClick={this.newSection}>
//                 {this.state.newSection ? (this.state.body === '' ? 'Cancel':'Submit') : 'Create new section'}
//         </button>
//       </div>
//
//       <div className="btn-group" role="group">
//         <button className='btn btn-default'
//                 onClick={this.addWriter.bind(this)}>
//                 {this.state.view === 'find authors' ? 'Story' : 'Add A Writer'}
//         </button>
//
//       </div>
//
//       <div className="btn-group" role="group">
//         <button className='btn btn-default'
//                 onClick={this._changeView.bind(this, (this.state.sectionContent.id))}
//                 disabled={this.state.sectionContent.id < sections.length ? false : true}>
//                 Next &raquo;
//         </button>
//       </div>
//     </div>
//     <Hand words={this.state.hand || hand}
//           selectCard={this.selectCard}
//           selectedCards={this.state.selectedCards}/>
//   </div>
//   <div className='col-md-3 border'>
//     <Segment changeView={this._changeView}
//              sections={sections}
//              section={this.state.sectionContent} user={this.props.user.user}/>
//   </div>
// </div>
