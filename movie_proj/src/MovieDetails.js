import React, { useState, useEffect } from 'react';
import { API_KEY, language } from './constants'

export function MovieDetails({ match }) {
  useEffect(() => {
    fetchItem();
   // fetchVideo();
  }, []);

  const [item, setItem] = useState({})
  const fetchItem = async () => {
    const fetchItem = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?${API_KEY}${language}`)
    const item = await fetchItem.json()
    setItem(item)
//    console.log(item)
  }
/*  const [video, setVideo] = useState({})
  const fetchVideo = async () => {
    const fetchVideo = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/videos?${API_KEY}${language}`)
    const video = await fetchVideo.json()
    setVideo(video)
    console.log(video.results)
    {video.results.key && video.results.key.map((keys) => (
      <iframe key={keys.id} src={`https://www.youtube.com/embed/${keys}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>))}
      
  }*/
    return (
      <div className="App-body">
      <div>
           <img key={item.id} width="100%" height="400px"
              src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} 
              alt={`${item.title}`}/>
          <h1>{item.title}</h1>
          <h3>{item.status}</h3>
          <p>{item.overview}</p>
          <h3>{item.genres && item.genres.map((genre) => (<p>{genre.name}</p>)) || 'No genres'}</h3>
          <h3>{item.runtime}'</h3>
          <h1>Trailer error</h1>
      </div>
      </div>
    );
  }