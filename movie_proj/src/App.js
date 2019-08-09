import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { MovieDetails } from './MovieDetails'
import { Home } from './Home'

export default function App() {
    return (
      <Router>
        <div className="App">
          <Header/>
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/movie/:id' exact component={MovieDetails}/>
            </Switch>
          <Footer/>
        </div>
      </Router>
  );
}