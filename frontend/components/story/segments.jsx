const React = require('react')
import isEmpty from 'lodash/isEmpty'

const Segment = React.createClass({

  render(){
    const sectionsList = [];
    if (!isEmpty(this.props.sections)) {
      this.props.sections.forEach((section, id) => {
        let divKey = 'div' + section.id
        sectionsList.push(<div key={section.id}
                               className={this.props.section.id === section.id ? "col-xs-12 col-md-12 list-group-item segment selected-segment" : (section.seen[this.props.user.id.toString()] ? "col-xs-12 col-md-12 list-group-item segment" : "col-xs-12 col-md-12 list-group-item segment unseen-segment")}
                               value={id}
                               onClick={this.props.changeView.bind(this, id)}>
                                    {section.body.length > 20 ? section.body.slice(0, 20) + "..." : section.body}
                                    <h6>{section.author} -- {section.date}</h6>
                          </div>)
                        })
                      }
    return (

        <ul className='list-group segments'>
          {sectionsList}
        </ul>

    )

  }
})

module.exports = Segment;


const holder = function(){
  <li onClick={this.props.changeView.bind(this, id)}
                  className={this.props.section.id === section.id ? "segment selected-segment" : (section.seen[this.props.user.id.toString()] ? "segment" : "segment unseen-segment")}
                  key={section.id}
                  value={id}>
                    {section.body.length > 20 ? section.body.slice(0, 20) + "..." : section.body}
                    <h6>{section.author} -- {section.date}</h6>
              </li>
}
