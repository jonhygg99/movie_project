import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
			this.state = { userInput: '' };
   		this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Movie Database</h1>
      </header>
      <body className="App-body">
       <input type="text" placeholder="Search movies..."  
          onChange={this.handleUserInput}
          value={this.state.userInput}/>
        <h1>{this.state.userInput}</h1>
       <p>Search for something new</p>
      </body>
      <footer className="App-footer">
        <p>Lorem ipsum dolor sit amet consectetur, adipiscing elit ornare nisl.</p>
      </footer>
    </div>
  );
  }
}

export default App;
