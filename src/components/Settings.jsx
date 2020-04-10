///
// src/components/board.jsx
///
import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {updatePlayerName, toggleComputerPlayer} from '../redux/actions'



// Foundation Elements
import {Grid, Cell, Switch} from 'react-foundation';

// Create Board component
class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangePlayerName = this.handleChangePlayerName.bind(this)
        this.handleToggleComputerPlayer = this.handleToggleComputerPlayer.bind(this)
    }

    handleChangePlayerName(event) {
        this.props.updatePlayerName(event.target.id, event.target.value)
    }

    handleToggleComputerPlayer() {
        this.props.toggleComputerPlayer()
    }

    render() {
        
        return (
            <div className="settings">
                <Grid className="align-center">
                    <Cell className="small-2">
                        Player
                    </Cell>
                    <Cell className="auto">
                        <Switch input={{ checked: this.props.isSinglePlayerGame, onChange: this.handleToggleComputerPlayer }}  active={{ text: '1' }} inactive={{ text: '2' }} />
                    </Cell>
                </Grid>
                {this.props.colors.map((color) => {
                    return (
                        (this.props.isSinglePlayerGame && color === 'yellow') ? null
                            :
                            <Grid key={color} className="align-center">
                                <Cell className="small-2">
                                    <label htmlFor={color} className="middle">{color}</label>
                                </Cell>
                                <Cell className="auto">
                                    <input
                                        type="text"
                                        id={color}
                                        value={this.props.playerNames[color]}
                                        onChange={this.handleChangePlayerName} />
                                </Cell>
                            </Grid>

                    )

                })}
                <Link className="button small primary" to="/board">Start Game</Link>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePlayerName : (color,name) => {
            return dispatch(updatePlayerName(color,name))
        },
        toggleComputerPlayer : () => {
            return dispatch(toggleComputerPlayer())
        }
    }
};

const mapStateTopProps = (state) => {
    return {
    	playerNames: state.board.playerNames,
    	colors: state.board.colors,
        isSinglePlayerGame: state.board.isSinglePlayerGame
    }
};

Settings = connect(mapStateTopProps, mapDispatchToProps)(Settings)

export default Settings