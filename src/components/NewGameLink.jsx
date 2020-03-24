///
// src/components/board.jsx
///
import React from 'react'
import {connect} from 'react-redux';
import {startGame} from '../redux/actions';

// Foundation Elements
import { Button, Sizes, Colors } from 'react-foundation';

// Create Board component
class NewGameLink extends React.Component {

    render() {
        return (
            /* Button to start new game */
            <Button size={Sizes.SMALL} color={Colors.PRIMARY} onClick={() => this.props.startGame()}>New Game</Button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startGame : () => {
            return dispatch(startGame())
        }
    }
};

NewGameLink = connect(null,mapDispatchToProps)(NewGameLink);

export default NewGameLink;