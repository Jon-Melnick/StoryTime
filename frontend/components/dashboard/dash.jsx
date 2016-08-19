const React = require('react'),
      Profile = require('./profile'),
      Friends = require('./friends');

import { Link } from 'react-router'
import { getAllStoriesBy } from '../../actions/storyActions'
import { connect } from 'react-redux'
import Stories from './stories'


class Dash extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount(){
    if (this.props.fetched === false) {
      this.props.getAllStoriesBy()
    }
  }

  onClick(e){
    e.preventDefault();
    this.props.getAllStoriesBy()
  }


  render(){
    return (
      <div>
        <Profile />
        <Stories stories={this.props.stories}/>
        <Link to="/newStory">New Story</Link>
        <Friends />
      </div>
    )
  }
}

Dash.propTypes = {
  getAllStoriesBy: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return{
    auth: state.auth,
    stories: state.story.stories,
    fetched: state.story.fetched
  };
}

export default connect(mapStateToProps, { getAllStoriesBy
})(Dash);
