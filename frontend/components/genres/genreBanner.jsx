import React from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import { getGenres, getWords, addWord } from '../../actions/genreActions'
import {hashHistory} from 'react-router'


class GenreBanner extends React.Component{

  render(){
    let gen = this.props.genre;
    let style = {backgroundImage: gen.tab_img, backgroundPosition: 'center',
    backgroundSize: 'cover'}

    if (this.props.tabs){
      return(<div id={'genre-'+gen.genre}
                className='col-xs-12 col-md-6 genre-tab'>
            <button style={style}
                    value={gen.id}
                    onClick={this.props.getGenreWords}
                    className='list-group-item lgi'>
                    <h1 className='white' value={gen.id}>{gen.genre}</h1>
              <span className='badge'>
                {`${gen.total_words} words`}
              </span>
            </button>
          </div>
    )} else {
      return(<div id={'genre-'+gen.genre}
                className='col-xs-12 col-md-12 genre-banner'
                style={style}>
                <h1 className='white' value={gen.id}>{gen.genre}</h1>
                {this.props.search}
              </div>
    )}
  }

}

export default connect('',{})(GenreBanner);
