const React = require('react')
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import { hashHistory } from 'react-router'
import { getStory } from '../../actions/storyActions'
import { connect } from 'react-redux'

class Stories extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    e.preventDefault();
    this.props.getStory(e.currentTarget.value)
    hashHistory.push(`/story/${e.currentTarget.value}`)
  }

  render(){
    console.log(this.props.stories);
    let stories = []
    if (!isEmpty(this.props.stories)){
      this.props.stories.forEach((story) => {
         stories.push(<li key={story.id} value={story.id} onClick={this.onClick}>{story.title}</li>)
      });
    }
    return (
      <div className='stories'>
        <ul>
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
