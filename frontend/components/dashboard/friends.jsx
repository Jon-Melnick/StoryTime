import React from 'react'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { getAuthors } from '../../actions/userActions'



class Friends extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      view: 'friends',
      sort: 'friends',
      authors: null,
    }
  }

  changeView(){
    this.props.getAuthors().then(
      (res)=>{
        this.setState({view: 'add', authors: res.data})
    })
  }

  cancel(e){
    e.preventDefault();
    e.stopPropagation();
  }

  confirm(e){
    e.preventDefault();
    let klass = e.target.className
    klass = klass.indexOf(' active') > -1 ? klass ="list-group-item" : klass += ' active'
    e.target.className = klass
  }

  sendReuest(){
  }

  setUsers(){
    this.authors = map(this.state.authors, author=>{
      return <li key={author.id}
              className='list-group-item'
              onClick={this.confirm.bind(this)}
              value={author.id}>
                  Name: {author.username}
                  <br/>
                  Email: {author.email}
              </li>
    })
  }

  render(){
    let friendsList;
    if (this.state.view === 'friends' && this.props.friends) {
      friendsList = map(this.props.friends, (friend)=>{
        return <button key={friend.id}
                className='list-group-item'>
                  <img src="http://res.cloudinary.com/arkean/image/upload/c_scale,w_75/v1468007818/llc305fxyhmea41phzne.png" className='pull-left'/>
                  <div className='pull-left'>
                    Name: {friend.username}
                    <br/>
                    Email: {friend.email}
                    <br/>
                    Coauthor on {friend.coauthors } stories
                    <br/>
                    Total sections written: {friend.contributions}
                  </div>
                </button>
      })
    }
    if (this.state.view === 'add'){
      this.setUsers();
    }
    return (
      <div className={this.props.klass}>
        List of Friends <small onClick={this.changeView.bind(this)}>add a friend</small>
        <ul className='list-group'>
          { this.state.view === 'friends' ? friendsList : this.authors}
        </ul>
      </div>
    )
  }
}

Friends.propTypes={
  getAuthors: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    friends: state.user.friendships.friends,
    pending: state.user.friendships.pending,
  }
}

export default connect(mapStateToProps, { getAuthors })(Friends);
