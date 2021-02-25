import React, { Fragment } from 'react';
import './App.css';
import Header from './components/Header';
import Landing from './components/Landing';
import Routes from './components/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => (
  <Router>
    <Fragment>
      <Header/>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route component={Routes} />
      </Switch>
    </Fragment>
  </Router>
  
);

export default App;
