import React from 'react'

export class PopularSelections extends React.Component {
  render (){
    return(
      <div className="PopularSelections">
        <button className={this.props.value === 'popular' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.updateSelection('popular')}>Popular</button>
        <button className={this.props.value === 'now_playing' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.updateSelection('now_playing')}>Now playing</button>
        <button className={this.props.value === 'top_rated' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.updateSelection('top_rated')}>Top rated</button>
        {/* <button className={this.props.value === 'latest' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.updateSelection('latest')}>Latest</button> */}
        <button className={this.props.value === 'upcoming' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.updateSelection('upcoming')}>Upcoming</button>
      </div>
    )
  }
}
