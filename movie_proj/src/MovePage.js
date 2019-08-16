import React from 'react'

export class MovePage extends React.Component {
    constructor(props) {
        super(props)
        this.decrementPage = this.decrementPage.bind(this)
        this.incrementPage = this.incrementPage.bind(this)
    }
    
    render () {
        return (
            <div className='changePage'>
                <button className='SelectionOff' id='decrement' onClick={()=>this.props.updatePage(this.decrementPage())}>Previous</button>
                <h1 className='PageNumber'>{this.props.value}</h1>
                <button className='SelectionOff' id='increment' onClick={()=>this.props.updatePage(this.incrementPage())}>Next</button>
            </div>
        )
    }
    decrementPage () {
        const newPage = this.props.value - 1
        //this.timeout = setTimeout( () =>
        return(newPage < 1 ? 1 : newPage )
        //, shortDelay);
      }
    incrementPage () {
        const newPage = this.props.value + 1
        //this.timeout = setTimeout( () =>
        return(newPage <= this.props.max ? newPage : this.props.value)
        //, shortDelay);
    }
}