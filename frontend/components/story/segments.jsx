const React = require('react')

const Segment = React.createClass({

  render(){
    return (
      <div className="segments">
        <ul>
          <li onClick={this.props.changeView} className="segment">Story part 1</li>
          <li onClick={this.props.changeView} className="segment">Story part 2</li>
          <li onClick={this.props.changeView} className="segment">Story part 3</li>
          <li onClick={this.props.changeView} className="segment">Story part 4</li>
          <li onClick={this.props.changeView} className="segment">Story part 5</li>
        </ul>
      </div>
    )

  }
})

module.exports = Segment;
