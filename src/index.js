///
// src/index.jsx
///
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
/**/
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {boardReducer, playerReducer} from'./redux/reducer'

const store = createStore(
	combineReducers({
    board: boardReducer,
    player: playerReducer
	}),
	applyMiddleware(thunkMiddleware)
);

// Render the App component into DOM
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))