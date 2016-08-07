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
      password: "",
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    data[e.target.id] = e.target.value
    // if (e.target.value !== ''){
    //   this.props.userExist(data).then(res => {
    //     console.log(res);
    //     let errors = this.state.errors;
    //     if (res.data.user){
    //       erros[e.target.id] = 'there is user with such ' + e.target.id;
    //     } else {
    //       errors[e.target.id] = ''
    //     }
    //     this.setState({ errors })
    //   })
    // }
  }

  onSubmit(e){
    e.preventDefault();
    const formData = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }
    this.props.userSignupRequest(formData).then(
      () => {
        hashHistory.push('/');
      }
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
               {this.state.errors['email']}
          </div>

          <div className="form-group">
          <label className='control-label'>Username </label>
          <input className='form-control'
                 type="text"
                 onChange={this.onChange}
                 onBlur={this.checkUserExists}
                 value={this.state.username}
                 id="username"/>
          </div>

          <div className="form-group">
            <label className='control-label'>Password </label>
            <input className='form-control' type="password" onChange={this.onChange} value={this.state.password} id="password"/>
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-lg" onClick={this.onSubmit}>Sign up</button>
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
