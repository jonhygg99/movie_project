import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MovieDetails } from './MovieDetails';
import Home from './Home';
import { connect } from 'react-redux';

function App () {
	return (
		<Router>
			<div className='App'>
				<Header />
				<Switch>
					<Route path='/movie' exact component={Home} />
					<Route path='/movie/:id' exact component={MovieDetails} />
					<Redirect from='/' to='/movie' />
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default connect()(App);
