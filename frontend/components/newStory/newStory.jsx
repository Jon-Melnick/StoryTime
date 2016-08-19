import React from 'react'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { getGenres } from '../../actions/storyActions'
import { createStory } from '../../actions/storyActions'
import { hashHistory } from 'react-router'


class NewStory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      genre_id: '',
      errors: []
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if (this.props.genres.fetched === false) {
      this.props.getGenres();
    }
  }

  onChange(e){
    e.preventDefault();
    let change = {};
    change[e.target.name] = e.currentTarget.value;
    this.setState(change);
  }

  onSubmit(e){
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      genre_id: this.state.genre_id
    }
    this.props.createStory(data).then(
      (res)=>hashHistory.push('/'),
      (err)=>this.setState({ errors: err.data.errors })
    )
  }


  render(){
    const errors = map(this.state.errors, (val) => {
      return <div key={val} value={val} className="alert alert-danger">{val}</div>
    })
    const options = map(this.props.genres.gens, (val, key)=>{
      return <option key={val.id} value={val.id} onClick={this.onSelect}>{val.genre}</option>
    })
    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
        <form>
          <div className="form-group">
          <label className='control-label'>Title </label>
          <input className='form-control' type="text" onChange={this.onChange} value={this.state.title} name="title"/>
          </div>

          <div className="form-group">
            <label className='control-label'>Description </label>
            <input className='form-control' type="text" onChange={this.onChange} value={this.state.description} name="description"/>
          </div>

          <div className="form-group">
            <label className='control-label'>Genre </label>
            <select className='form-control' onChange={this.onChange} name="genre_id">
              <option value={0} > -- choose one -- </option>
              {options}
            </select>
              <br></br>
          </div>
          {errors}
          <div className="form-group">
            <button className="btn btn-primary btn-lg" onClick={this.onSubmit}>Create Story</button>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

NewStory.propTypes = {
  getGenres: React.PropTypes.func.isRequired,
  createStory: React.PropTypes.func.isRequired
}

function newStoryProps(state) {
  return{
    genres: state.story.genres
  }
}

export default connect(newStoryProps, { getGenres, createStory })(NewStory);
