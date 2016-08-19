import React from 'react'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { userSignupRequest } from '../actions/userActions'
import { userExist } from '../actions/userActions'
import { hashHistory } from 'react-router'

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password1: "",
      password2: "",
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e){
      let update = {}
      update[e.currentTarget.id] = e.currentTarget.value
      this.setState(update)
  }

  isValid(){
    validateInput(this.state)
  }

  checkUserExists(e){
    let data = {}
    const id = e.target.id;
    data[e.target.id] = e.target.value
    if (e.target.value !== ''){
      this.props.userExist(data).then(res => {
        let errors = this.state.errors;
        if (res.data.email){
          errors[id] = 'There is a user with such ' + id;
        } else {
          errors[id] = ''
        }
        this.setState({ errors })
      })
    } else {
      let errors = this.state.errors;
      errors[id] = '';
      this.setState({ errors });
    }
  }

  checkPassword(e){
    e.preventDefault();
    let errors = this.state.errors;
    if (e.target.value !== '') {
      if (e.target.value.length < 6) {
        errors['password1'] = 'Password is too short'
      } else {
        errors['password1'] = ''
      }
    } else {
      errors['password1'] = ''
    }
    this.setState({errors})
    this.confirmPassword();
  }

  confirmPassword(){
    let errors = this.state.errors;
    const pass2 = document.getElementById('password2')
    const btn = document.getElementById('signup-btn')
    console.log(btn);
    if (pass2.value !== '') {
      const pass1 = document.getElementById('password1')
      if (pass2.value !== pass1.value) {
        errors['password2'] = 'Passwords don\'t match'
      } else {
        errors['password2'] = ''
      }
    } else {
      errors['password2'] = ''
    }
    this.setState({errors})
  }

  validateForm(){
    const errors = []
    map(this.state.errors, (val)=>{
      if (val !== '') {
        errors.push(val)
      }
    })
    if (errors.length > 0){
      return true
    } else {
      return false
    }
  }

  onSubmit(e){
    e.preventDefault();
    if (this.validateForm()) {
      return
    }
    const formData = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password1
    }
    this.props.userSignupRequest(formData).then(
      (res) =>hashHistory.push('/'),
      (err) =>this.setState({errors: err.response.data.errors})
    )
  }

  render(){
    const things = {"thing1": "something1", "thing2": "something2"}
    const options = map(things, (val, key) => {
      return <div key={val} value={val}>{key}</div>
    });
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
        <form>

          <div className="form-group">
          <label className='control-label'>Email </label>
          <input className='form-control'
                 type="text"
                 onChange={this.onChange}
                 onBlur={this.checkUserExists}
                 value={this.state.email}
                 id="email"/>
                 {this.state.errors['email'] ? <div className="alert alert-danger"> {this.state.errors['email']} </div> : ''}
          </div>

          <div className="form-group">
          <label className='control-label'>Username </label>
          <input className='form-control'
                 type="text"
                 onChange={this.onChange}
                 onBlur={this.checkUserExists}
                 value={this.state.username}
                 id="username"/>
                 {this.state.errors['username'] ? <div className="alert alert-danger"> {this.state.errors['username']} </div> : ''}
          </div>

          <div className="form-group">
            <label className='control-label'>Password </label>
            <input className='form-control'
                   type="password"
                   onChange={this.onChange}
                   onBlur={this.checkPassword}
                   value={this.state.password}
                   id="password1"/>
                 {this.state.errors['password1'] ? <div className="alert alert-danger"> {this.state.errors['password1']} </div> : ''}
          </div>

          <div className="form-group">
            <label className='control-label'>Retype Password </label>
            <input className='form-control'
                   type="password"
                   onChange={this.onChange}
                   value={this.state.password}
                   onBlur={this.confirmPassword}
                   id="password2"/>
                 {this.state.errors['password2'] ? <div className="alert alert-danger"> {this.state.errors['password2']} </div> : ''}
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-lg"
                    onClick={this.onSubmit}
                    id='signup-btn'>Sign up</button>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  userExist: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, userExist })(Signup);
