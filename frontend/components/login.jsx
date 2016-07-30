const React = require('react');


const Login = React.createClass({
  getInitialState(){
    return {
      signInAs: "",
      password: "",
      authErrors: "",
    }
  },

  _updateInput(e){
    if (e.currentTarget.type === "password") {
      this.setState({password: e.currentTarget.value})
    } else {
      this.setState({signInAs: e.currentTarget.value})
    }
  },

  _handleSubmit(e){
    e.preventDefault();
    const formData = {
      signInAs: this.state.signInAs,
      password: this.state.password
    }
  },

  render(){
    return (
      <div>
        <form>
          <label>Email or Username </label>
          <input type="text" onChange={this._updateInput} value={this.state.signInAs}/>
          <br></br>
          <label>Password </label>
          <input type="password" onChange={this._updateInput} value={this.state.password}/>
          <br></br>
          <button onClick={this._handleSubmit}>Sign in</button>
        </form>
      </div>
    )
  }
})

module.exports = Login;
