import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions'
import { hashHistory } from 'react-router'

class NavigationBar extends React.Component {

  componentDidMount(){
    if (!currentUser) {
      hashHistory.push('/home');
      return ;
    }
  }

  logout(e){
    this.props.logout();
    hashHistory.push('/login')
  }


  redirectTo(e){
    e.preventDefault();
    if (e.target.name === "/logout") {
      this.logout()
    } else {
      hashHistory.push(e.target.name)
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const links = localStorage.jwtToken ?
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={this.redirectTo.bind(this)} name="/logout">Logout</a></li>
      </ul>
      :
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={this.redirectTo.bind(this)} name="/signup">Sign up</a></li>
        <li><a href="#" onClick={this.redirectTo.bind(this)} name="/login">Login</a></li>
      </ul>;

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                                aria-expanded="false">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
            <Link to={`/home`} className="navbar-brand">Epic Story Time</Link>

          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className='nav navbar-nav'>
              <li className='hidden'><a href='#'
                      name='/home'
                      onClick={this.redirectTo.bind(this)}>home</a></li>
                    <li className={localStorage.jwtToken ? '' : 'hidden'}><a href='#'
                     name={`/dashboard/${this.props.auth.user.id}`}
                     onClick={this.redirectTo.bind(this)}>Dashboard</a></li>
              <li><a href='#'
                     name='/genre'
                     onClick={this.redirectTo.bind(this)}>Genres</a></li>
            </ul>
            { links }
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return{
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
