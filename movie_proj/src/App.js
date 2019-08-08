import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './Header'
import { Footer } from './Footer'
import { PopularSelections } from './PopularSelections'
import { API_POPULAR } from './constants'
import { getSearchUrl } from './utils'

class App extends React.Component {
  constructor(props) {
    super(props);
			this.state = { 
        userInput: '',
        items: [],
        isLoaded: false,
        page: 1,
        max_pages: 1
      };
       this.handleUserInput = this.handleUserInput.bind(this);
       this.decrementPage = this.decrementPage.bind(this);
       this.incrementPage = this.incrementPage.bind(this);
  }

  componentDidMount() {
    fetch(API_POPULAR)
    .then(response => response.json())
    .then(json => {
      debugger
      this.setState({ 
        items: json.results, 
        isLoaded: true,
        max_pages: json.total_pages
       });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userInput !== this.state.userInput || 
      prevState.page !== this.state.page) {
      fetch(getSearchUrl(this.state.userInput, this.state.page))
        .then(response => response.json())
        .then(json => {
          debugger
          this.setState({ 
            items: json.results, 
            isLoaded: true,
            max_pages: json.total_pages });
        });
    }
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
        <Header/>
         <body className="App-body">
          <input className="Search-bar" type="text" 
            placeholder="Search movies..." onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Search movies..."} 
            onChange={this.handleUserInput}
            value={this.state.userInput}/>
        <PopularSelections/>
        <h1>{this.state.userInput}</h1>
        <h1>Pages {this.state.max_pages}</h1>
        <button onClick={this.decrementPage}>Previous</button>
        <div>{this.state.page}</div>
        <button onClick={this.incrementPage}>Next</button>
        <div className="Movie-view">
        {items.map((movie) => (
          <img className="Image-movie" 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
          alt={`${movie.title}`}/>
        ))}
        </div>
      </body>
        <Footer/>
        </div>
      );
    }
  }

  decrementPage () {
    const newPage = this.state.page - 1
    this.setState({ page: newPage < 1 ? 1 : newPage })
  }
  incrementPage () {
    const newPage = this.state.page + 1
    this.setState({ page: newPage > this.state.max_pages ? this.state.page : newPage})
  }
}

export default App;
