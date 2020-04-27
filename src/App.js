///
// src/index.jsx
///
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Import Board and Scoreboard views
import GameBoard from './components/GameBoard'
import Header from './components/Header'
import Settings from './components/Settings'

// Foundation Elements
import { GridContainer} from 'react-foundation';

import './styles/app.scss'

// Create App component
class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <GridContainer>
            <Header/>
            <Switch>
              <Route exact path="/" component={Settings}/>
              <Route path="/board" component={GameBoard}/>
            </Switch>
          </GridContainer>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;