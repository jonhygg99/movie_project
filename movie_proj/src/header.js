import React from 'react';
import logo from './logo.svg';
import './App.css'

export function Header() {
  return ( 
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Movie Database</h1>
    </header>
  );
}