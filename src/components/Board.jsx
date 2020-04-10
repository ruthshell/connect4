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

// Import Connect 4 Player AI
import {getAImove} from '../utils/playerAI'

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

    playerSetField(index) {
        if (!this.props.isBoardBlocked && this.props.boxes[index][this.props.boxes[index].length - 1] === null) {
            this.props.updateBoxes(index)
            this.soundClick.play()
        }
    }

    computerSetField() {
        setTimeout( ()=>{
            this.props.updateBoxes(getAImove(this.props.boxes))
            this.soundClick.play()
        }, 200 )
    }

    render() {

        if (this.props.isSinglePlayerGame && this.props.isNext === 'yellow') {
                this.computerSetField()
        }

        this.soundClick.setVolume(this.props.isSoundOn ? 0.5 : 0)
        
        return (

            /* The game board */
            <div className="game">
                <MessageBox />
                <Grid className="grid-padding-y align-center">
                    {this.props.boxes.map((row, index) => {
                        return (
                            <Cell key={index} className="board__row auto" onClick={() => this.playerSetField(index)}>
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
		isBoardBlocked: state.board.isBoardBlocked,
		isSoundOn: state.board.isSoundOn,
        isNext: state.board.isNext,
        isSinglePlayerGame: state.board.isSinglePlayerGame
    }
};

Board = connect(mapStateTopProps, mapDispatchToProps)(Board)

export default Board