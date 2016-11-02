import React from 'react'
import { Link } from 'react-router'
import { getAllStoriesBy } from '../../actions/storyActions'
import { connect } from 'react-redux'
import Stories from './stories'
import Friends from './friends'
import Profile from './profile'
import {hashHistory} from 'react-router'


class Dash extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount(){
    if (this.props.auth.user.id !== parseInt(this.props.routeParams.userId)) {
      if (!currentUser) {
        hashHistory.push('/login');
        return ;
      }
      let id = this.props.auth.user.id ? this.props.auth.user.id : currentUser.id
      hashHistory.push('/dashboard/' + id)
    }
    if (this.props.fetched === false) {
      this.props.getAllStoriesBy()
    }
  }

  onClick(e){
    e.preventDefault();
    this.props.getAllStoriesBy()
  }


  render(){
    let holder = <Profile klass='col-xs-12 col-md-12'/>
    return (
      <div className='container top-pad'>
        <div className='row'>
          <Stories klass='col-xs-12 col-md-8' stories={this.props.stories}/>
          <Friends klass='col-xs-12 col-md-4'/>
        </div>
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
