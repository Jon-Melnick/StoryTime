import React from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import { getGenres, getWords, addWord } from '../../actions/genreActions'
import {hashHistory} from 'react-router'


class Genre extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      genres: '',
      selectedGenre: '',
      view: 'genre',
      search: '',
      errors: {},
      success: {}
    }

  }

  componentDidMount(){
    this.props.getGenres().then(
      (res)=>{
        this.setState({genres: this.props.genres.genres})
        }
    )
  }

  getGenreWords(e){
    const genreId = e.target.value;
    if (genreId == this.state.selectedGenre.id) {
      this.setState({view: "words"});
      return;
    }
    this.props.getWords(genreId).then(
      (res)=>{
        this.setState({selectedGenre: this.props.genres.genre, view: "words"})
      },
      (err)=>{console.log(err.response);})
  }

  setView(e){
    e.preventDefault();
    this.setState({view: 'genre', search: '', success: {}, errors: {}})
  }

  onChange(e){
    e.preventDefault();
    this.setState({search: e.target.value, success: {}, errors: {}})
  }

  onSubmit(e){
    if (!this.props.auth.user.id) {
      const errors = {}
      errors['invalid word'] = "You must be signed in to add words, thanks."
      this.setState({errors: errors})
      return ;
    }
    e.preventDefault();
    const validWord = this.validWord(this.state.search.toUpperCase())
    if (!validWord) {
      const errors = {}
      errors['invalid word'] = "this word is already in the database"
      this.setState({errors: errors})
      return;
    }
    this.props.addWord(this.state.selectedGenre.id, this.state.search).then(
      res=>{
        const success = {}
        success['word'] = `${this.state.search} has been added to the database`
        this.setState({selectedGenre: this.props.genres.genre, search: '', success: success}
      )}
    )
  }

  validWord(newWord){
    let words = this.state.selectedGenre.words;
    for (let i = 0; i < words.length; i++) {
      if (words[i].word.toUpperCase() === newWord) {
        return false;
      }
    }
    return true;
  }

  render(){
    let genres, words, search;
    let header = <h1 className='page-header'> Genres </h1>
    if (this.state.genres !== '') {
      genres = map(this.state.genres, (gen) =>{
        return <button key={gen.id}
                   value={gen.id}
                   onClick={this.getGenreWords.bind(this)}
                   className='list-group-item'>
               {gen.genre}<span className='badge'>{`${gen.total_words} words`} </span></button>
      })
    }

    if (this.state.selectedGenre !== '') {
      words = map(this.state.selectedGenre.words, (word)=>{
        let search = this.state.search.toUpperCase();
        if (search !== '' && (word.word.toUpperCase().indexOf(search) < 0)) {
          return;
        }
          return <li className='col-md-3 col-sm-4 col-xs-6' key={word.id} value={word.id}>{word.word}</li>
        })
    }

    if (this.state.view === 'words') {
      header = <h1 className='page-header'>
                { this.state.selectedGenre.genre_type }
                <a href=''>
                <small className='offset-by-20'
                       onClick={this.setView.bind(this)}>
                  go back
                </small>
              </a>
               </h1>

       search = <div className="input-group">
         <input type="text"
                className="form-control"
                onChange={this.onChange.bind(this)}
                value = {this.state.search}
                placeholder="Search or add a word..."/>
         <span className="input-group-btn">
           <button className="btn btn-default"
                   type="button"
                   onClick={this.onSubmit.bind(this)}>Add word</button>
         </span>
       </div>
    }

    return(
      <div>
          {header}
        <ul className='list-group'>
          {search}

          {this.state.errors['invalid word'] ? <div className="alert alert-danger"> {this.state.errors['invalid word']} </div> : ''}

          {this.state.success['word'] ? <div className="alert alert-success"> {this.state.success['word']} </div> : ''}

          { this.state.view === "genre" ? genres : words }
        </ul>
      </div>
    )
  }
}

Genre.propTypes = {
  getWords: React.PropTypes.func.isRequired,
  addWord: React.PropTypes.func.isRequired,
  getGenres: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return{
    genres: state.genres,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getWords, getGenres, addWord })(Genre);
