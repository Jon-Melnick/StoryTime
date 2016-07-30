const React = require('react'),
      ReactDOM = require('react-dom'),
      Login = require('./components/login'),
      Dashboard = require('./components/dashboard/view'),
      Story = require('./components/story/view');




document.addEventListener('DOMContentLoaded', ()=> {
  ReactDOM.render(<Story />, document.getElementById('content'))
})
