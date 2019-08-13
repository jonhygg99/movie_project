import React from 'react'
import { Link } from 'react-router-dom'

export class MovieView extends React.Component {
  render (){  
  return ( 
        <div className="Movie-view">
        {(this.props.items && this.props.items.map((movie) => (
           <Link to={`/movie/${movie.id}`} key={movie.id}>
           <img className="Image-movie"
           src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
           alt={`${movie.title}`}/>
         </Link>
       ))) || <h1>No movie found, try by another name</h1>}
      </div>
    );
  }
}