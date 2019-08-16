import React from 'react'

export class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleUserInput = this.handleUserInput.bind(this)
    }    
    render () {
        return (
            <input 
                className='SearchBar' 
                type='text'
                placeholder='Search movies...' 
                onFocus={(e) => e.target.placeholder = ''} 
                onBlur={(e) => e.target.placeholder = 'Search movies...'}
                onChange={(e)=>this.props.updateInput(this.handleUserInput(e))}
                value={this.props.userInput}
            />
        )
    }
    handleUserInput(e) {
        //clearTimeout(this.timeout)
        return(e.target.value)
      }
}
