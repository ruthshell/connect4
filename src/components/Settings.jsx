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

    handleChangePlayerName(index, event) {
        this.props.updatePlayerName(index, event.target.value)
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
                {Object.keys(this.props.players).map((key) => {
                    return (
                        (this.props.isSinglePlayerGame && this.props.players[key].isComputer) ? null
                            :
                            <Grid key={key} className="align-center">
                                <Cell className={"auto " + this.props.players[key].color}>
                                    <input
                                        type="text"
                                        placeholder={this.props.players[key].techname}
                                        onChange={this.handleChangePlayerName.bind(this, key)} />
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
        updatePlayerName : (index,name) => {
            return dispatch(updatePlayerName(index,name))
        },
        toggleComputerPlayer : () => {
            return dispatch(toggleComputerPlayer())
        }
    }
};

const mapStateTopProps = (state) => {
    return {
    	colors: state.board.colors,
        isSinglePlayerGame: state.board.isSinglePlayerGame,
        players: state.player
    }
};

Settings = connect(mapStateTopProps, mapDispatchToProps)(Settings)

export default Settings