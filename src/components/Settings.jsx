///
// src/components/board.jsx
///
import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {updatePlayerName} from '../redux/actions'



// Foundation Elements
import {Grid, Cell} from 'react-foundation';

// Create Board component
class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.updatePlayerName(event.target.id, event.target.value)
    }

    render() {
        
        return (
            <div className="settings">
                {this.props.colors.map((color) => {
                    return (
                        <Grid key={color} className="align-center">
                            <Cell className="small-2">
                                <label htmlFor={color} className="middle">{color}</label>
                            </Cell>
                            <Cell className="auto">
                                <input
                                    type="text"
                                    id={color}
                                    value={this.props.playerNames[color]}
                                    onChange={this.handleChange} />
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
        }
    }
};

const mapStateTopProps = (state) => {
    return {
    	playerNames: state.board.playerNames,
    	colors: state.board.colors
    }
};

Settings = connect(mapStateTopProps, mapDispatchToProps)(Settings)

export default Settings