import React from 'react'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { getAuthors } from '../../actions/userActions'



class Authors extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      text: '',
      authors: null,
      view: 'friends'
    }
    this.cached = false;
  }

  setFriends(){
    this.cached = true
    this.friends = map(this.props.friends, (friend)=>{
      return <button key={friend.id}
              className='list-group-item'>
                <img src="http://res.cloudinary.com/arkean/image/upload/c_scale,w_75/v1468007818/llc305fxyhmea41phzne.png" className='pull-left'/>
                <div className='pull-left'>
                  Name: {friend.username}
                  <br/>
                  Email: {friend.email}
                </div>
              </button>
    })
  }

  setUsers(){
    this.authors = map(this.state.authors, author=>{
      return <button key={author.id}
              className='list-group-item'>
                  Name: {author.username}
                  <br/>
                  Email: {author.email}
              </button>
    })
  }


  changeView(){
    this.props.getAuthors('jon').then(
      (res)=>{
        this.setState({view: 'authors', authors: res.data})
    })
  }

  render(){
    if (!this.cached && this.props.friends) {
      this.setFriends();
    }
    if (this.state.authors) {
      this.setUsers()
    }
    console.log(this.state);
    return(
      <div>
        <h1>authors!</h1>
        Friends:
        { this.friends || <div>You have no friends. you should change that</div>}

        Other Authors:
        { this.authors || <div onClick={this.changeView.bind(this)}>No One Here</div>}
      </div>
    )
  }

}

Authors.propTypes = {
  getAuthors: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
    friends: state.user.friendships.friends,
    story: state.story
  }
}



export default connect(mapStateToProps, { getAuthors })(Authors);
