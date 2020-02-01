///
// src/index.jsx
///
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'

// Import Board and Scoreboard views
import { Board } from './components/board'
import { Scoreboard } from './components/scoreboard'

// Foundation Elements
import { GridContainer, Grid, Cell, TopBar, TopBarLeft, TopBarRight, Menu, MenuItem, MenuText } from 'react-foundation';

import './styles/app.scss'
import './styles/board.scss'
import './styles/buttons.scss'

// Create App component
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <TopBar>
            <TopBarLeft>
              <Menu>
                <MenuText>Tic Tac Toe</MenuText>
              </Menu>
            </TopBarLeft>
            <TopBarRight>
              <Menu>
                <MenuItem><NavLink to="/">Game</NavLink></MenuItem>
                <MenuItem><NavLink to="/scoreboard">Scoreboard</NavLink></MenuItem>
              </Menu>
            </TopBarRight>
          </TopBar>
          <GridContainer>
            <Grid className="grid-padding-y align-center">
              <Cell>
                <Switch>
                  <Route exact path="/" component={Board}/>
                  <Route path="/scoreboard" component={Scoreboard}/>
                </Switch>
              </Cell>
            </Grid>
          </GridContainer>
        </BrowserRouter>
      </div>
    )
  }
}

// Render the App component into DOM
ReactDOM.render(<App />, document.getElementById('root'))