import React from 'react'

export class PopularSelections extends React.Component {
  render (){
    return(
      <div className="PopularSelections">
        <button className={this.props.value === 'popular' ? "SelectionOn" : 'SelectionOff'}>Popular</button>
        <button className={this.props.value === 'now_playing' ? "SelectionOn" : 'SelectionOff'}>Now playing</button>
        <button className={this.props.value === 'top_rated' ? "SelectionOn" : 'SelectionOff'}>Top rated</button>
        <button className={this.props.value === 'latest' ? "SelectionOn" : 'SelectionOff'}>Latests</button>
        <button className={this.props.value === 'upcoming' ? "SelectionOn" : 'SelectionOff'}>Upcoming</button>
      </div>
    )
  }
}
