import React from 'react';
import logo from './logo.svg';
import './App.css';

const API_KEY = 'a2fd13908e7ca798960594a0d61175e6'
const API_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY

function Head() {
  return ( 
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Movie Database</h1>
    </header>
  );
}
 
function Footer() {
  return ( 
    <footer className="App-footer">
     <div>
      <p>Lorem ipsum dolor sit amet consectetur, adipiscing elit ornare nisl.</p>
     </div>
   </footer>
  );
}

function Print_movies() {

}

class App extends React.Component {
  constructor(props) {
    super(props);
			this.state = { 
        userInput: '',
        items: [],
        isLoaded: false
      };
   		this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount() {
    fetch(API_POPULAR)
    .then(response => response.json())
    .then(json => {
      this.setState({ 
        items: json, 
        isLoaded: true });
    });
  }

  handleUserInput(e) {
    this.setState({
      userInput: e.target.value
    });
  }

  render() {
    var { items, isLoaded } = this.state;
    var a = 0;

    if (!isLoaded) {
      return <div className="Loading">
                <img src={logo} className="App-logo-loading" alt="logo" />
                </div>
    } else {
       return (
        <div className="App">
        <Head/>
         <body className="App-body">
          <input className="Search-bar" type="text" 
            placeholder="Search movies..." onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Search movies..."} 
            onChange={this.handleUserInput}
            value={this.state.userInput}/>
        <h1 className="Title-section">Popular movies</h1>
        <h1>{this.state.userInput}</h1>
        <div className="Movie-view">
        <img className="Image-movie" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/keym7MPn1icW1wWfzMnW3HeuzWU.jpg" onMouseOver={e => console.log(e)}></img>
        <img className="Image-movie" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/keym7MPn1icW1wWfzMnW3HeuzWU.jpg" onMouseOver={e => console.log(e)}></img>
           </div>
        <div><span>{items.results[0].title}</span></div>
     
      
        </body>
        <Footer/>
        </div>
      );
    }
  }
}

export default App;
