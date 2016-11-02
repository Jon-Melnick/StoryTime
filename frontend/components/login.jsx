const React = require('react');

import map from 'lodash/map'
import axios from 'axios'
import { connect } from 'react-redux'

import { hashHistory } from 'react-router'
import { userLoginRequest } from '../actions/userActions'


class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      signInAs: "",
      password: "",
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    if (e.currentTarget.type === "password") {
      this.setState({password: e.currentTarget.value})
    } else {
      this.setState({signInAs: e.currentTarget.value})
    }
  }

  onSubmit(e){
    e.preventDefault();
    const formData = {
      signInAs: this.state.signInAs,
      password: this.state.password
    }
    this.props.userLoginRequest(formData).then(
      (res)=>{
        hashHistory.push('/dashboard/' + this.props.auth.user.id);
      },
      (err)=>this.setState({ errors: err.response.data.errors })
    )
  }

  render(){
    const things = {"thing1": "something1", "thing2": "something2"}
    const options = map(things, (val, key) => {
      return <div key={val} value={val}>{key}</div>
    });
    const errors = map(this.state.errors, (val) => {
      return <div key={val} value={val} className="alert alert-danger">{val}</div>
    })
    return (
      <div className='container top-pad'>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
          <form>
            <div className="form-group">
            <label className='control-label'>Email or Username </label>
            <input className='form-control' type="text" onChange={this.onChange} value={this.state.signInAs}/>
            </div>
            <div className="form-group">
              <label className='control-label'>Password </label>
              <input className='form-control' type="password" onChange={this.onChange} value={this.state.password}/>
                <br></br>
            </div>
            {errors}
            <div className="form-group">
              <button className="btn btn-primary btn-lg" onClick={this.onSubmit}>Sign in</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  userLoginRequest: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, { userLoginRequest })(Login);
