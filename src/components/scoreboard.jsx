///
// src/components/scoreboard.jsx
///
import React from 'react'

// Import Storage object
import { Storage } from './../storage/storage'

// Create Scoreboard component
export class Scoreboard extends React.Component {
  state = {
    scoreboard: []
  }

    // After component mounts, load any data from local storage and update component state
  async componentDidMount() {
    let storage = await new Storage().getData()

    this.setState({
      scoreboard: storage
    })
  }

  render() {
    return (
      <div className="text-center">
      {/* Link to scoreboard */}
        <h2>Scoreboard</h2>

                {/* List with previous games */}
        <ul>
          {this.state.scoreboard.map((leader, key) => {
            return <li key={key}>{leader}</li>
          })}
        </ul>

      </div>
    )
  }
}