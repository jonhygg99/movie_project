import React from 'react';
import logo from './logo.svg';
import './App.css';

const API_KEY = 'a2fd13908e7ca798960594a0d61175e6'
const API_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY

class App extends React.Component {
  constructor(props) {
    super(props);
			this.state = { 
        userInput: '',
        data_movie: []
      };
   		this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount() {
    fetch(API_POPULAR)
    .then(response => response.json())
    .then(data => this.setState({ data_movie: data.data_movie }));
  }
  

  handleUserInput(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Movie Database</h1>
      </header>
      <body className="App-body">
       <input className="Search_bar" type="text" placeholder="Search movies..."  
          onChange={this.handleUserInput}
          value={this.state.userInput}/>
        <h1>{this.state.userInput}</h1>
       <p>Search for something new</p>
       <p>{API_POPULAR}</p>
      </body>
      <footer className="App-footer">
        <div>
        <p>Lorem ipsum dolor sit amet consectetur, adipiscing elit ornare nisl.</p>
        </div>

      </footer>
    </div>
  );
  }
}

export default App;
