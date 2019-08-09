import React from 'react';
import logo from './logo.svg';
import { PopularSelections } from './PopularSelections'
import { API_SEARCH, API_KEY, API_POPULAR, language } from './constants'
import { getSearchUrl } from './utils'
import { MovieView } from './MovieView'

export class Home extends React.Component {
  constructor(props) {
    super(props);
			this.state = { 
        selection: 'popular?',
        userInput: '',
        items: [],
        isLoaded: false,
        page: 1,
        max_pages: 1
      };
       this.handleUserInput = this.handleUserInput.bind(this)
       this.decrementPage = this.decrementPage.bind(this)
       this.incrementPage = this.incrementPage.bind(this)
       this.timeout = null
  }

  componentDidMount() {
    fetch(API_POPULAR)
    .then(response => response.json())
    .then(json => {
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
        if (prevState.userInput !== this.state.userInput)
          this.setState({page: 1});
        if (this.state.userInput === '' && 
        (prevState.userInput !== this.state.userInput)) {
          fetch(API_POPULAR)
          .then(response => response.json())
          .then(json => {
            this.setState({
              selection: 'popular?',
              items: json.results, 
              isLoaded: true,
              page: 1,
              max_pages: json.total_pages
             });
          });
        } else if (this.state.userInput === '' && (prevState.page !== this.state.page)) {
          fetch(API_SEARCH + this.state.selection + API_KEY + language + '&page=' + this.state.page)
          .then(response => response.json())
          .then(json => {
            this.setState({ 
              items: json.results, 
              isLoaded: true,
              max_pages: json.total_pages
             });
          });
        } else {
          fetch(getSearchUrl(this.state.userInput, this.state.page))
          .then(response => response.json())
          .then(json => {
          this.setState({ 
            selection: '',
            items: json.results, 
            isLoaded: true,
            max_pages: json.total_pages });
          });
        }
      }
  }

  render() {
    var { items, isLoaded } = this.state

    if (!isLoaded) {
      return <div className="Loading">
                <img src={logo} className="App-logo-loading" alt="logo" />
                </div>
    } else {
       return (
         <div className="App-body">
          <input className="Search-bar" type="text" 
            placeholder="Search movies..." 
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Search movies..."}
            onChange={this.handleUserInput}
            value={this.state.userInput}/>
        <PopularSelections value={this.state.selection}/>
        <h1>{this.state.userInput}</h1>
        <h1>Pages {this.state.max_pages}</h1>
        <button onClick={this.decrementPage}>Previous</button>
        <div>{this.state.page}</div>
        <button onClick={this.incrementPage}>Next</button>
        <MovieView items={items}/>
        </div>
      );
    }
  }

  handleUserInput(e) {
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(this.timeout);

    const value = e.target.value
    this.setState({
      userInput: e.target.value
    });

    // Make a new timeout set to go off in 800ms
    //this.timeout = setTimeout(function () {
    //  setInput()
    //}, 500);
    
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

export default Home;
