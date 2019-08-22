import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { next_page, previous_page } from './reducers/actions'

export class ChangePage extends React.Component {
	render () {
		const max_page = this.props.max
		const page = this.props.page
		//const page = useSelector(state => state.page)
		//const dispatch = useDispatch()
		return (
			<div className='changePage'>
				<button className='SelectionOff' id='decrement' onClick={() => this.props.prevPage()}>
					Previous
				</button>
				<h1 className='PageNumber'>{page}</h1>
				<button className='SelectionOff' id='increment' onClick={() => this.props.nextPage(max_page)}>
					Next
				</button>
			</div>
		)
	}
}
