import React from 'react'
import { PopularSelections } from './PopularSelections'
import { API_SEARCH, API_KEY, language, delay, shortDelay } from './constants'
import { SearchBar } from './SearchBar'
import logo from './logo.svg'
import { MovieView } from './MovieView'
import { ChangePage } from './ChangePage'
import { isEmpty } from 'lodash'
import { previous_page, next_page, initial_page, select_category } from './reducers/actions'
import { connect } from 'react-redux'

class Home extends React.Component {
	state = {
		userInput: '',
		items: [],
		isLoading: true,
		max_pages: undefined
	}

	constructor (props) {
		super(props)
	}

	componentDidMount () {
		this.fetchMovies()
	}

	fetchMovies () {
		var selection = this.state.userInput ? '' : this.props.selection
		var inputSearch = this.state.userInput === '' ? '' : '&query=' + this.state.userInput
		var search = this.state.userInput === '' ? 'movie/' : 'search/movie'
		//this.timeout = setTimeout( () =>
		fetch(API_SEARCH + search + selection + '?' + API_KEY + language + '&page=' + this.props.page + inputSearch)
			.then((response) => response.json())
			.then((json) => {
				this.setState({
					items: json.results,
					isLoading: false,
					max_pages: json.total_pages
				})
			}) //, delay)
	}

	componentDidUpdate (prevProps, prevState) {
		if (
			prevState.userInput !== this.state.userInput ||
			prevProps.page !== this.props.page ||
			prevProps.selection !== this.props.selection
		) {
			if (prevState.userInput !== this.state.userInput || prevProps.selection !== this.props.selection) {
				this.props.initPage()
			}
			this.fetchMovies()
		}
	}

	render () {
		const { items, isLoading } = this.state
		const { prevPage, nextPage, page, selection, selCategory } = this.props
		//  const page = useSelector(state => state.page)
		//  const dispatch = useDispatch()
		if (isLoading) {
			return (
				<div className='Loading'>
					<img src={logo} className='App-logo-loading' alt='logo' />
				</div>
			)
		} else {
			return (
				<div className='App-body'>
					<SearchBar value={this.state.userInput} updateInput={this.updateInput} />
					{this.state.userInput === '' ? <PopularSelections {...{ selection, selCategory }} /> : ''}
					<MovieView items={items} />
					{/* value={this.state.selection} updateSelection={this.updateSelection} */}
					{!isEmpty(items) ? <ChangePage max={this.state.max_pages} {...{ prevPage, nextPage, page }} /> : ''}
					{this.state.max_pages === 0 ? '' : <h1>{this.state.max_pages} pages</h1>}
				</div>
			)
		}
	}

	updateSelection = (value) => {
		this.setState({ selection: value })
	}
	updatePage = (value) => {
		this.setState({ page: value })
	}
	updateInput = (value) => {
		this.setState({ userInput: value })
	}
}

const mapStateToProps = (state) => ({
	page: state.page,
	selection: state.selection
})

const mapDispatchToProps = (dispatch) => ({
	prevPage: () => dispatch(previous_page()),
	nextPage: (max_page) => dispatch(next_page(max_page)),
	initPage: () => dispatch(initial_page()),
	selCategory: (category) => dispatch(select_category(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
