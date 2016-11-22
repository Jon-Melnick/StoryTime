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

  getStories(){
    this.stories = map(this.props.stories, (story)=>{
      return <li key={story.id}
                 value={story.id}
                 onClick={this.onClick}
                 className='story-list list-group-item'>
                   <div>
                     <h2 className='story-title-view'>
                       {story.title} {story.unseen > 0 ?
                         <small>
                           <span className='badge'
                                 aria-hidden="true" data-toggle="tooltip" data-placement="right" title="Unseen Segments">
                             {story.unseen}
                           </span>
                         </small> : <div></div>}
                     </h2>
                       {story.description}
                     <h5>
                       Authors: {story.authorNames.join(', ')}
                     </h5>
                   </div>
                 </li>
    })
  }

  render(){
    if (!isEmpty(this.props.stories)){
      this.getStories();
    }
    const klass = 'stories border ' + this.props.klass
    return (
      <div className={this.props.klass}>
        <div className='page-header'>
          <h1>Your Stories:
            { this.props.fetched && !this.props.stories.length
            ? <small> you currently have none</small>
            : ''}
            <div className='pull-right' >
              <Link to="/newStory">
                <div className="success">
                  <span className="new-story glyphicon glyphicon-plus" aria-hidden="true" data-toggle="tooltip" data-placement="left" title="Add New Story"></span>
                </div>
              </Link>
            </div>
          </h1>
        </div>

        <ul className='list-group' id='stories'>
          {this.stories}
        </ul>

      </div>
    )
  }
}

Stories.propTypes = {
  getStory: React.PropTypes.func.isRequired
}


export default connect(null, { getStory })(Stories);
