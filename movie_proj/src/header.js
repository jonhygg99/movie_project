import React from 'react';
import logo from './logo.svg';
import './App.css'

export class Header extends Component {
    render() { 
        return (  
            <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Movie Database</h1>
        </header>
      </div>
        );
    }
}
