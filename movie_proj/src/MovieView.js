import React from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'

export class MovieView extends React.Component {
  render (){  
    const errorMessage = <h1>No movie found, try by another name</h1>
    const ImageNotFound = <img className="ImageNotFound" src='https://i.ytimg.com/vi/L1tx-wAI6Nw/maxresdefault.jpg' alt='ImageNotFound'/>
    const showImage = (Array.isArray(this.props.items) && this.props.items.map((movie) => (
      <Link to={`/movie/${movie.id}`} key={movie.id}>
        {`${movie.poster_path}` === 'null' ? ImageNotFound : (
        <img className="Image-movie"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
        alt={`${movie.title}`}/>
        )}
   </Link>)))
    return ( 
        <div className="Movie-view">
        {Array.isArray(this.props.items) && !isEmpty(this.props.items) 
          ? showImage : errorMessage }
      </div>
    );
  }
}