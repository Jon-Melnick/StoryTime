const React = require('react')

const Profile = React.createClass({
  render(){
    return (
      <div className={this.props.klass}>Your Profile</div>
    )
  }
})

module.exports = Profile;
