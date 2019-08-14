import React from 'react';
import { PopularSelections } from './PopularSelections'
import { API_SEARCH, API_KEY, language, delay, shortDelay } from './constants'
import { MovieView } from './MovieView'

export class Home extends React.Component {
  constructor(props) {
    super(props);
			this.state = { 
        selection: 'popular',
        userInput: '',
        items: [],
        isLoading: true,
        page: 1,
        max_pages: undefined
      };
       this.handleUserInput = this.handleUserInput.bind(this)
       this.decrementPage = this.decrementPage.bind(this)
       this.incrementPage = this.incrementPage.bind(this)
       this.updateSelection = this.updateSelection.bind(this)
       this.timeout = null
  }

  componentDidMount() {
    this.fetchMovies ()
  }

  fetchMovies () {
    var selection = this.state.userInput ? '' : this.state.selection
    var inputSearch = (this.state.userInput === '') ? '' : '&query=' + this.state.userInput
    var search = (this.state.userInput === '') ? 'movie/' : 'search/movie'
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
    if (prevState.userInput !== this.state.userInput || prevState.page !== this.state.page) {
        if (prevState.userInput !== this.state.userInput) {
          this.setState({page: 1})
        }
        this.fetchMovies ()
      }
  }

  render() {
    var { items, isLoading } = this.state

    // if (isLoading) {
    //   return <div className="Loading">
    //             <img src={logo} className="App-logo-loading" alt="logo" />
    //             </div>
    // } else {
       return (
         <div className='App-body'>
          <input className='Search-bar' type='text'
            placeholder='Search movies...' 
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'Search movies...'}
            onChange={this.handleUserInput}
            value={this.state.userInput}/>
        <PopularSelections value={this.state.selection} updateSelection={this.updateSelection}/>
        <h1>Input: {this.state.userInput}</h1>
        <div className='changePage'>
          <button className='SelectionOff' id='decrement' onClick={this.decrementPage}>Previous</button>
          <h1 className='changePageNumber'>{this.state.page}</h1>
          <button className='SelectionOff' id='increment' onClick={this.incrementPage}>Next</button>
        </div>
        <h1>{this.state.max_pages} pages</h1>
        <MovieView items={items}/>
        </div>
      )
    //}
  }

  updateSelection = (value) => {
    this.setState({selection:value}, ()=>console.log(this.state.selection))
}

//   updateData=(data)=>{
//     this.setstate({selection:data})
// }
  handleUserInput(e) {
    clearTimeout(this.timeout)
    this.setState({
      userInput: e.target.value
    })
  }
  decrementPage () {
    const newPage = this.state.page - 1
    //this.timeout = setTimeout( () =>
    this.setState({ page: newPage < 1 ? 1 : newPage })
    //, shortDelay);
  }
  incrementPage () {
    const newPage = this.state.page + 1
    //this.timeout = setTimeout( () =>
    this.setState({ page: newPage <= this.state.max_pages ? newPage : this.state.page})
    //, shortDelay);
  }
}

export default Home;
