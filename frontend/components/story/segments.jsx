const React = require('react')
import isEmpty from 'lodash/isEmpty'

const Segment = React.createClass({

  render(){
    const sections = [];
    if (!isEmpty(this.props.sections)) {
      this.props.sections.forEach((section, id) => {
        sections.push(<li onClick={this.props.changeView.bind(this, id)}
                          className="segment"
                          key={section.id}
                          value={id}>
                            {section.body.slice(0, 20) + "..."}
                            <h6>{section.author} -- {section.date}</h6>
                      </li>)
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
