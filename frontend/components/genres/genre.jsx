import React from 'react'
import GenreBanner from './genreBanner'
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
    let params = this.props.params.genId
    // this.fadeIn('genre-page');
    if(!!params && params.slice(5)){
      let genreId = params.slice(5);
      this.props.getGenres().then(
        (res)=>{
          this.goToWordView(genreId, true);
          }
      );
    } else {
      if (this.props.genres.fetched){
        this.setState({genres: this.props.genres.genres})
      } else {
        this.props.getGenres().then(
          (res)=>{
            this.setState({genres: this.props.genres.genres})
            }
        )
      }
    }
  }

  componentWillReceiveProps(props){
    let after = props.params.genId;
    let before = this.props.params.genId;

    if (before !== after){
      if (!after) {
        this.setState({view: 'genre', search: '', success: {}, errors: {}})
      }
      if(!!after && after.slice(5)){
        let genreId = after.slice(5);
        this.goToWordView(genreId, false);
      }
    }
  }

  goToWordView(genreId, initial){
    this.headerId = genreId-1;
    if (genreId == this.state.selectedGenre.id) {
      window.setTimeout(()=>{
        this.setState({view: "words"});
      });
    } else {
      this.props.getWords(genreId).then(
        (res)=>{
          this.setState({genres: this.props.genres.genres, selectedGenre: this.props.genres.genre, view: "words"})
        },
        (err)=>{console.log(err.response);})
    };
  }

  componentWillUnmount(){

  }

  fadeIn(page){
    let x = document.getElementById(page);
    x.style.opacity = 0
    window.setTimeout(()=>{
      x.style.opacity = 100
    });
  }

  fadeOut(page){
    let x = document.getElementById(page);
    x.style.opacity = 100
    window.setTimeout(()=>{
      x.style.opacity = 0
    });
  }

  transition(fIn, fOut){
    fIn = document.getElementById(fIn);
    fIn.style.opacity = 0
    window.setTimeout(()=>{
      fIn.style.opacity = 100
    });

    fOut = document.getElementById(fOut);
    fOut.style.opacity = 100
    window.setTimeout(()=>{
      fOut.style.opacity = 0
    });
  }

  getGenreWords(e, genre){
    const genreId = e;
    hashHistory.push('/genre'+genreId);
    this.headerId = genreId-1;

    // if (genreId == this.state.selectedGenre.id) {
    //   window.setTimeout(()=>{
    //     this.setState({view: "words"});
    //   });
    // } else {
    //   this.props.getWords(genreId).then(
    //     (res)=>{
    //       this.setState({selectedGenre: this.props.genres.genre, view: "words"})
    //     },
    //     (err)=>{console.log(err.response);})
    // };
  }

  hideGenreTabs(headerId){
    let genreTabs = document.getElementsByClassName('genre-tab');
    console.log(genreTabs);
    for(let tab of genreTabs){
      if(headerId === tab.id){
        tab.classList.add('header-tab');
        tab.classList.add('col-md-12');
        continue;
      }

      tab.classList.add('fade-tab');

      window.setTimeout(()=>{
        tab.classList.add('hide-tab');
      }, 1000);
    }
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

  mouseOver(e){
    console.log(e);
  }

  render(){

    let genres, words, search, banner;
    let header = <h1 className='page-header'> Genres </h1>
    if (this.state.genres !== '') {
      genres = map(this.state.genres, (gen) =>{
        return <GenreBanner genre={gen}
                            key={'div' + gen.id}
                            getGenreWords={this.getGenreWords.bind(this, gen.id)}
                            tabs={true}/>
      })
    }

    if (this.state.selectedGenre !== '') {
      words = map(this.state.selectedGenre.words, (word)=>{
        let search = this.state.search.toUpperCase();
        if (search !== '' && (word.word.toUpperCase().indexOf(search) < 0)) {
          return;
        }
          return <li className='col-md-3 col-sm-4 col-xs-6'
                     key={word.id}
                     value={word.id}>{word.word}</li>
        })
    }

    if (this.state.view === 'words') {
       search = <div className="col-md-7 col-xs-9 pull-right input-group">
                 <input type="text"
                        className="form-control"
                        onChange={this.onChange.bind(this)}
                        value = {this.state.search}
                        placeholder="Search or add a word..."/>
                 <span className="input-group-btn">
                   <button className="btn btn-default"
                           type="button"
                           onClick={this.onSubmit.bind(this)}>
                           Add word
                   </button>
                 </span>
               </div>

      banner = <GenreBanner genre={this.state.genres[this.headerId]}
                                tabs={false}
                                search={search}/>
    }

    return(
      <div className='container top-pad off-white'>
        {this.state.errors['invalid word'] ? <div className="alert alert-danger"> {this.state.errors['invalid word']} </div> : ''}

        {this.state.success['word'] ? <div className="alert alert-success"> {this.state.success['word']} </div> : ''}

        {banner}

        <ul className='list-group genre-group'>
          { this.state.view === "genre" ?
            <div id='genre-page'>{genres}</div>
              :
              <div id='word-page'>{words}</div>
          }
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
