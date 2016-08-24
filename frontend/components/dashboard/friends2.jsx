import React from 'react'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { getAuthors, sendRequest, acceptRequest } from '../../actions/userActions'



class Friends extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      view: 'friends',
      sort: 'friends',
      authors: null,
      search: '',
      offset: 0,
      limit: 10,
      flagged: false,
    }
  }

  changeView(e){
    const { search, offset, limit } = this.state;
    if (e === 'add') {
      this.props.getAuthors({search: search,
                             offset: 0,
                             limit: limit,
                             searchBy: ''}).then(
        (res)=>{
          this.setState({authors: res.data, view: e, offset: offset + limit})
        })
    } else {
      this.setState({view: e, offset: 0})
    }
  }

  setFriends(status){
    let friends = status === 'friends' ? this.props.friends : this.props.pending
    this.friendsList = map(friends, (friend)=>{
      if ((friend.username.indexOf(this.state.search) === -1 && friend.email.indexOf(this.state.search) === -1)) {
        return;
      } else {
        return <li key={friend.id}
                className='list-group-item'>
                  <img src="http://res.cloudinary.com/arkean/image/upload/c_scale,w_75/v1468007818/llc305fxyhmea41phzne.png" className='pull-left'/>

                    Name: {friend.username}
                    <br/>
                    Email: {friend.email}
                    <br/>
                    Coauthor on {friend.coauthors} {friend.coauthors == 1 ? 'story' : 'stories'}
                    <br/>
                    Total sections written: {friend.contributions}

                  {this.state.view === 'pending' ? <button className='btn btn-success btn-xs pull-right'
                          onClick={this.accept.bind(this)}
                          value = {friend.friendshipId}> Accept </button>
                        :
                        <div className='btn-xs pull-right'>
                          {friend.status}
                        </div>}
                </li>
      }
    })
  }

  setUsers(){
    this.authors = map(this.state.authors, author=>{
      // if ((author.username.indexOf(this.state.search) === -1 && author.email.indexOf(this.state.search) === -1)) {
      //   return;
      // } else {
      return <li key={author.id}
              className='list-group-item'
              value={author.id}>
                  Name: {author.username}
                  <br/>
                  Email: {author.email}
                  <button className='btn btn-default btn-xs pull-right'
                          onClick={this.requestFriendship.bind(this)}
                          value={author.id}>Add Friend</button>
              </li>
      // }
    })
  }

  requestFriendship(e){
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.value;
    let target = e.target;
    let parent = target.parentElement;
    target.disabled = true;
    target.textContent = 'Request Sent'
    target.className += ' btn-success'
    this.props.sendRequest(id).then(
      (res)=>{
        parent.className += ' disabled';
      }
    )
  }

  accept(e){
    e.preventDefault();
    let target = e.target;
    target.disabled = true;
    let parent = target.parentElement;
    target.textContent = 'Request Accepted'
    this.props.acceptRequest(target.value).then(
      (res)=>{
        parent.className += ' disabled'
      }
    )
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
          this.setState({authors: authors.concat(res.data), offset: offset + limit, flagged: false})
        })
    }
  }

  render(){
    if (this.state.view !== 'add' && this.props.friends) {
      this.setFriends(this.state.view);
      this.pending =
      <div class="nav nav-pills pull-right" role="tablist" onClick={this.changeView.bind(this, 'pending')}>
        <small role='presentation'>
          pending <span class="badge">{this.props.pending.length}</span>
      </small>
    </div>
    }
    if (this.state.view === 'add'){
      this.setUsers();
    }
    let klass = this.props.klass
    let holder =         <div className='page-header'>
            { this.state.view === 'add' ?
              <h1>
                Search <small onClick={this.changeView.bind(this, 'friends')} >back to friends</small>
              { this.pending }
            </h1>
              :
              <h1>
              Friends <small onClick={this.changeView.bind(this, 'add')} >add a friend</small>
              { this.pending }
            </h1>
            }
            </div>
    return (
      <div className={klass}>

        <div>

  <ul className="nav nav-tabs" role="tablist">
    <li role="presentation" className="active"><a aria-controls="home" role="tab" data-toggle="tab">Friends</a></li>
    <li role="presentation"><a aria-controls="profile" role="tab" data-toggle="tab"><small role='presentation'>
      pending <span class="badge">{this.props.pending.length}</span>
  </small></a></li>
    <li role="presentation"><a aria-controls="messages" role="tab" data-toggle="tab">Find</a></li>
  </ul>
</div>
        <div >
          <input type='text'
                 className='form-control'
                 onChange={this.onChange.bind(this)}
                 value={this.state.search}
                 placeholder='search'/>
        </div>
        <ul className='list-group friends-container'
            onScroll={this.onScroll.bind(this)}
            id='ul-list'>
          { this.state.view === 'add' ? this.authors : this.friendsList }
        </ul>
      </div>
    )
  }
}

Friends.propTypes={
  getAuthors: React.PropTypes.func.isRequired,
  sendRequest: React.PropTypes.func.isRequired,
  acceptRequest: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    friends: state.user.friendships.friends,
    pending: state.user.friendships.pending,
  }
}

export default connect(mapStateToProps, { getAuthors, sendRequest, acceptRequest })(Friends);
