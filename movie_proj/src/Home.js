import React from 'react';
import { PopularSelections } from './PopularSelections'
import { API_SEARCH, API_KEY, language, delay, shortDelay } from './constants'
import { SearchBar } from './SearchBar'
import { MovieView } from './MovieView'
import { ChangePage } from './ChangePage'
import { isEmpty } from 'lodash'

export class Home extends React.Component {
  constructor(props) {
    super(props)
			this.state = { 
        userInput: '',
        items: [],
        selection: 'popular',
        isLoading: true,
        page: 1,
        max_pages: undefined
      };
       this.updateInput = this.updateInput.bind(this)
       this.updateSelection = this.updateSelection.bind(this)
       this.updatePage = this.updatePage.bind(this)
       this.timeout = null
  }

  componentDidMount() {
    this.fetchMovies ()
  }

  fetchMovies () {
    var selection = this.state.userInput ? '' : this.state.selection
    var inputSearch = this.state.userInput === '' ? '' : '&query=' + this.state.userInput
    var search = this.state.userInput === '' ? 'movie/' : 'search/movie'
    //this.timeout = setTimeout( () =>
      fetch(API_SEARCH + search + selection + '?' + API_KEY + language + '&page=' + this.state.page + inputSearch )
      .then(response => response.json())
      .then(json => {
        this.setState({ 
          items: json.results, 
          isLoading: false,
          max_pages: json.total_pages
          });
      })//, delay)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userInput !== this.state.userInput || 
      prevState.page !== this.state.page ||
      prevState.selection !== this.state.selection) {
        if (prevState.userInput !== this.state.userInput ||
            prevState.selection !== this.state.selection) {
          this.setState({page: 1})
        }
        this.fetchMovies ()
      }
  }

  render() {
    const { items, isLoading } = this.state

    // if (isLoading) {
    //   return <div className="Loading">
    //             <img src={logo} className="App-logo-loading" alt="logo" />
    //             </div>
    // } else {

       return (
         <div className='App-body'>
            <SearchBar value={this.state.userInput} updateInput={this.updateInput}/>
            {this.state.userInput === '' ? <PopularSelections value={this.state.selection} updateSelection={this.updateSelection}/> : ''}
            <MovieView items={items}/>
            {!isEmpty(items) ? 
            <ChangePage value={this.state.page} max={this.state.max_pages} updatePage={this.updatePage}/> : ''}
            {this.state.max_pages === 0 ? '' : <h1>{this.state.max_pages} pages</h1>}
        </div>
      )
    //}
  }

  updateSelection = (value) => {
    this.setState({selection:value})
  }
  updatePage = (value) => {
    this.setState({page:value})
  }
  updateInput = (value) => {
    this.setState({userInput:value})
  }
}

export default Home;
