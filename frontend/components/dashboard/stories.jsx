const React = require('react')
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import { hashHistory } from 'react-router'
import { getStory } from '../../actions/storyActions'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Stories extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    e.preventDefault();
    const target = e.currentTarget.value
    this.props.getStory(target).then(()=>{
      hashHistory.push(`/story/${target}`)
    })
  }

  render(){
    let stories = []
    if (!isEmpty(this.props.stories)){
      this.props.stories.forEach((story) => {
        let authors = ``
        map(story.authorNames, (val)=>{
          if (authors === '') {
            authors += val
          } else {
            authors += ', ' + val
          }
        })
         stories.push(<li key={story.id} value={story.id} onClick={this.onClick} className='story-list'><div><span className='story-title-view'>{story.title}</span> -- {story.description}</div><div className='author-list'>Authors: {authors}</div></li>)
      });
    }
    const klass = 'stories border ' + this.props.klass
    return (
      <div className={this.props.klass}>
        <div className='page-header'><h1>Your Stories: {isEmpty(this.props.stories) ? <small> you currently have none</small> : ''}</h1></div>
        <div className='pull-right' ><Link to="/newStory">New Story</Link></div>
        <ul className='list-group'>
        {stories}
        </ul>
      </div>
    )
  }
}

Stories.propTypes = {
  getStory: React.PropTypes.func.isRequired
}


export default connect(null, { getStory })(Stories);
