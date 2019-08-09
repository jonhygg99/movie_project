import React from 'react'
import { white, black, purple } from './constants'

export class PopularSelections extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      color_back: white,
      color_letter: black, 
    };
    this.changeColor = this.changeColor.bind(this);
  }
  
  changeColor() {
    const newColor_back = this.state.color_back === white ? purple : white;
    const newColor_letter = this.state.color_letter === white ? black : white;
    this.setState({ 
      color_back: newColor_back,
      color_letter: newColor_letter,
    });
  }

  render () {
  return (
    <div className="Selection-type">
      <h2 className="Selections" 
      onClick={this.changeColor}
      style={{background: this.state.color_back, 
      color: this.state.color_letter}}>Popular</h2>
      <h2 className="Selections">Now playing</h2>
      <h2 className="Selections">Top rated</h2>
      <h2 className="Selections">Latests</h2>
      <h2 className="Selections">Upcoming</h2>
    </div>
  )
  }
}