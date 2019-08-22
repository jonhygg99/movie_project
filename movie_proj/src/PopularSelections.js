import React from 'react'
import { POPULAR, NOW_PLAYING, TOP_RATED, UPCOMING } from './reducers/actions'

export class PopularSelections extends React.Component {
  render (){
    return(
      <div className="PopularSelections">
        <button className={this.props.selection === 'popular' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.selCategory(POPULAR)}>Popular</button>
        <button className={this.props.selection === 'now_playing' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.selCategory(NOW_PLAYING)}>Now playing</button>
        <button className={this.props.selection === 'top_rated' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.selCategory(TOP_RATED)}>Top rated</button>
        {/* <button className={this.props.selection === 'latest' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.updateSelection('latest')}>Latest</button> */}
        <button className={this.props.selection === 'upcoming' ? "SelectionOn" : 'SelectionOff'} onClick={()=>this.props.selCategory(UPCOMING)}>Upcoming</button>
      </div>
    )
  }
}
