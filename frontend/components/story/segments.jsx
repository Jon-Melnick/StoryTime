const React = require('react')
import isEmpty from 'lodash/isEmpty'

const Segment = React.createClass({

  render(){
    const sections = [];
    if (!isEmpty(this.props.sections)) {
      this.props.sections.forEach(section => {
        sections.push(<li onClick={this.props.changeView} className="segment" key={section.id} value={section.id}>{section.body.slice(0, 20)}</li>)
      })
    }
    return (
      <div className="segments">
        <ul>
          {sections}
        </ul>
      </div>
    )

  }
})

module.exports = Segment;
