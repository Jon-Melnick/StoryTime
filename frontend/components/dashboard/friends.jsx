const React = require('react')


const Friends = React.createClass({
  render(){
    return (
      <div className={this.props.klass}>List of Friends</div>
    )
  }
})

module.exports = Friends;
