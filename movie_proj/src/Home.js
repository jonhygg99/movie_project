import React from 'react';
import logo from './logo.svg';
import { PopularSelections } from './PopularSelections'
import { API_SEARCH, API_KEY, API_POPULAR, language, delay, shortDelay } from './constants'
import { getSearchUrl } from './utils'
import { MovieView } from './MovieView'
import { debounce } from 'lodash'

export class Home extends React.Component {
  constructor(props) {
    super(props);
			this.state = { 
        selection: 'popular?',
        userInput: '',
        items: [],
        isLoading: true,
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
        isLoading: false,
        max_pages: json.total_pages
       });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    var timeoutID
    if (prevState.userInput !== this.state.userInput || 
      prevState.page !== this.state.page) {
        if (prevState.userInput !== this.state.userInput)
          this.setState({page: 1});
        if (this.state.userInput === '' && 
        (prevState.userInput !== this.state.userInput || this.state.page === 1) ) {
          this.timeout = setTimeout( () =>
          fetch(API_POPULAR)
          .then(response => response.json())
          .then(json => {
            this.setState({
              selection: 'popular?',
              items: json.results, 
              isLoading: false,
              max_pages: json.total_pages
             });
          }), delay);
        } else if (this.state.userInput === '' && (prevState.page !== this.state.page)) {
          this.timeout = setTimeout( () =>
          fetch(API_SEARCH + this.state.selection + API_KEY + language + '&page=' + this.state.page)
          .then(response => response.json())
          .then(json => {
            this.setState({ 
              items: json.results, 
              isLoading: false,
              max_pages: json.total_pages
             });
          }), delay);
        } else {
          this.timeout = setTimeout( () =>
          fetch(getSearchUrl(this.state.userInput, this.state.page))
          .then(response => response.json())
          .then(json => {
          this.setState({ 
            selection: '',
            items: json.results, 
            isLoading: false,
            max_pages: json.total_pages });
          }), delay);
          console.log(this.state.items)
        }
      }
      //clearTimeout(this.timeout)

  }

  render() {
    var { items, isLoading } = this.state

    // if (isLoading) {
    //   return <div className="Loading">
    //             <img src={logo} className="App-logo-loading" alt="logo" />
    //             </div>
    // } else {
       return (
         <div className="App-body">
          <input className="Search-bar" type="text" 
            placeholder="Search movies..." 
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Search movies..."}
            onChange={this.handleUserInput}
            value={this.state.userInput}/>
        <PopularSelections value={this.state.selection}/>
        <h1>Input: {this.state.userInput}</h1>
        <div className="changePage">
          <button className="Selections" id="decrement" onClick={this.decrementPage}>Previous</button>
          <h1 className="changePageNumber">{this.state.page}</h1>
          <button className="Selections" id="increment" onClick={this.incrementPage}>Next</button>
        </div>
        <h1>{this.state.max_pages} pages</h1>
        <MovieView items={items}/>
        </div>
      );
    //}
  }

  handleUserInput(e) {
    clearTimeout(this.timeout);
    this.setState({
      userInput: e.target.value
    });
  }
  decrementPage () {
    const newPage = this.state.page - 1
    this.timeout = setTimeout( () =>
    this.setState({ page: newPage < 1 ? 1 : newPage })
    , shortDelay);
  }
  incrementPage () {
    const newPage = this.state.page + 1
    this.timeout = setTimeout( () =>
    this.setState({ page: newPage > this.state.max_pages ? this.state.page : newPage})
    , shortDelay);
  }
}

export default Home;
