///
// src/components/board.jsx
///
import React from 'react'
import {connect} from 'react-redux'
import {startGame, updateBoxes} from '../redux/actions'

// Import Box component
import BoardBox from './BoardBox'
import MessageBox from './MessageBox'
import NewGameLink from './NewGameLink'

// Import Sound
import UIfx from 'uifx'
import soundClickAudio from '../sounds/click.mp3' 

// Foundation Elements
import { Grid, Cell } from 'react-foundation';

// Create Board component
class Board extends React.Component {
    constructor(props) {
        super(props)

        this.soundClick = new UIfx(soundClickAudio)

        // Initialize component state
        this.props.startGame()
    }

    clickColumn(index) {
        if (!this.props.isGameOver && this.props.boxes[index][this.props.boxes[index].length - 1] === null) {
            this.props.updateBoxes(index)
            this.soundClick.play()
        }
    }

    render() {

        this.soundClick.setVolume(this.props.isSoundOn ? 0.5 : 0)
        
        return (

            /* The game board */
            <div className="game">
                <MessageBox />
                <Grid className="grid-padding-y align-center">
                    {this.props.boxes.map((row, index) => {
                        return (
                            <Cell key={index} className="board__row auto" onClick={() => this.clickColumn(index)}>
                                {row.slice(0).reverse().map((box, i) => {
                                    return (
                                        <BoardBox key={i} value={box} />
                                    )
                                })}
                            </Cell>
                        )
                    })}
                </Grid>
                <NewGameLink/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startGame : (rows,columns) => {
            return dispatch(startGame(rows,columns))
        },
        updateBoxes : (colIndex, rowIndex) => {
            return dispatch(updateBoxes(colIndex, rowIndex))
        }
    }
};

const mapStateTopProps = (state) => {
    return {
    	boxes: JSON.parse(JSON.stringify(state.board.boxes)),
    	size: state.board.size,
		amountToWin: state.board.amountToWin,
		isGameOver: state.board.isGameOver,
		isSoundOn: state.board.isSoundOn
    }
};

Board = connect(mapStateTopProps, mapDispatchToProps)(Board)

export default Board