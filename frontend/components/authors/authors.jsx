import React from 'react'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { getAuthors } from '../../actions/userActions'
import { sendAuthorInvite } from '../../actions/storyActions'
import findIndex from 'lodash/findIndex'



class Authors extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      text: '',
      authors: null,
      view: 'friends',
      search: '',
      offset: 0,
      limit: 10,
      flagged: false
    }
    this.cached = false;
  }

  setFriends(){
    this.cached = true
    this.friends = map(this.props.friends, (friend)=>{
      if (findIndex(this.props.story.story.authors, {id: friend.id}) >= 0) {
        return ;
      } else {
      return <li key={friend.id}
              className='list-group-item'>
                <img src="http://res.cloudinary.com/arkean/image/upload/c_scale,w_75/v1468007818/llc305fxyhmea41phzne.png" className='pull-left'/>
                  Name: {friend.username}
                  <br/>
                  Email: {friend.email}
                  <br/>
                  stories: {friend.coauthors}
                  <br/>
                  sections: {friend.contributions}
                <button className='btn btn-default btn-xs pull-right'
                        onClick={this.inviteAuthor.bind(this)}
                        value={friend.id}>Add Author</button>
              </li>
      }
    })
  }

  setUsers(){
    this.authors = map(this.state.authors, author=>{
      if (author.storyIds.indexOf(this.props.story.story.id) >= 0) {
        return ;
      } else {
      return <li key={author.id}
              className='list-group-item'
              value={author.id}>
                  Name: {author.username}
                  <br/>
                  Email: {author.email}
                  <br/>
                  stories: {author.coauthors}
                  <br/>
                  sections: {author.contributions}
                  <button className='btn btn-default btn-xs pull-right'
                          onClick={this.inviteAuthor.bind(this)}
                          value={author.id}>Add Author</button>
              </li>
      }
    })
  }

  inviteAuthor(e){
    e.preventDefault();
    e.stopPropagation();
    const id = parseInt(e.target.value);
    let target = e.target;
    let parent = target.parentElement;
    target.disabled = true;
    target.textContent = 'Request Sent'
    target.className += ' btn-success'
    let storyId = this.props.story.story.id;
    this.props.sendAuthorInvite(storyId, id).then(
      (res)=>{
        parent.className += ' disabled';
      }
    )
  }

  changeView(e){
    const { search, offset, limit } = this.state;
    if (e === 'add') {
      this.props.getAuthors({search: search,
                             offset: 0,
                             limit: limit,
                             searchBy: ''}).then(
          (res)=>{
            this.setState({view: e, authors: res.data, offset: offset + limit})
          })
    } else {
      this.setState({view: e, offset: 0})
    }
    this.cached = false
  }

  onScroll(e){
    if (this.state.view !== 'add') {
      return;
    }
    const { authors, offset, limit, flagged, search } = this.state
    let height = e.target.scrollHeight
    let top = e.target.scrollTop
    if ((top + 400 > height) && flagged === false) {
      this.setState({flagged: true})
      this.props.getAuthors({search: search,
                             offset: offset,
                             limit: limit}).then(
        (res)=>{
          console.log(offset);
          console.log(res.data);
          this.setState({authors: authors.concat(res.data), offset: offset + limit, flagged: false})
        })
    }
  }

  onChange(e){
    const { search, offset, limit, authors } = this.state;
    e.preventDefault();
    this.setState({search: e.target.value})
    if (this.state.view !== 'add') {
      return;
    }
    this.props.getAuthors({search: e.target.value,
                           offset: 0,
                           limit: limit,
                           searchBy: ''}).then(
      (res)=>{
        this.setState({authors: res.data, offset: limit})
      })
  }

  render(){
    if (!this.cached && this.props.friends) {
      this.setFriends();
    }
    if (this.state.authors) {
      this.setUsers()
    }
    return(
      <div>
      <div className="page-header">
        <h1>Authors Unite!</h1>
        </div>
        <div className='btn-group'>
          <button className="btn btn-default"
                  onClick={this.changeView.bind(this, 'friends')}>Friends </button>
          <button className="btn btn-default"
                  onClick={this.changeView.bind(this, 'add')}>Other Authors </button>
        </div>
        <div>
          <input type='text'
                 className='form-control'
                 onChange={this.onChange.bind(this)}
                 value={this.state.search}
                 placeholder='search'/>
        </div>
        <ul className='list-group authors-container'
            onScroll={this.onScroll.bind(this)}
            id='ul-list'>
          { this.state.view === 'add' ? this.authors : this.friends }
        </ul>
      </div>
    )
  }

}

Authors.propTypes = {
  getAuthors: React.PropTypes.func.isRequired,
  sendAuthorInvite: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
    friends: state.user.friendships.friends,
    story: state.story
  }
}



export default connect(mapStateToProps, { getAuthors, sendAuthorInvite })(Authors);
