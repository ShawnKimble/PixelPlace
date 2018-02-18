import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './Home';
import Edit from './Edit';

import './fonts/supertext/style.css';
import './fonts/ft-blockbusta/style.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './css/@blueprintjs/core/dist/blueprint.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/edit" component={Edit} />

          {/* Catch all */}
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
