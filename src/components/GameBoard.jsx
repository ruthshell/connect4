///
// src/components/GameBoard.jsx
///
import React from 'react'
import {connect} from 'react-redux'
import {startGame, toggleNextPlayer} from '../redux/actions'

// Import Box component
import MessageBox from './MessageBox'

// Import Sound
import UIfx from 'uifx'
import soundClickAudio from '../sounds/click.mp3'

// Import Connect 4 Board
import Board from '../utils/Board'

// Foundation Elements
import { Grid, Cell, Button, Sizes, Colors } from 'react-foundation';

// Create Board component
class GameBoard extends React.Component {

    constructor(props) {
        super(props)

        // Initialize component state
        this.props.startGame()

        this.soundClick = new UIfx(soundClickAudio)
        
        this.state = {
            board: new Board(this.props.size.columns,this.props.size.rows,this.props.amountToWin)
        }
    }

    setBoxPlayer(index) {
            
        if (this.state.board.setBoxPlayer(index, this.props.isNext) != null) {
            this.setState({
                board: this.state.board
            })
            this.props.toggleNextPlayer(this.state.board.winner)
            this.soundClick.play()
        }

    }

    setBoxAI() {
        setTimeout( ()=>{

            this.state.board.setBoxAI()
            
            this.setState({
                board: this.state.board
            })
            
            this.props.toggleNextPlayer()
            this.soundClick.play()
        }, 200 )
    }

    newGame() {
        this.state.board.newGame()
        this.props.startGame()
    }

    render() {

        if (this.props.isSinglePlayerGame && this.props.players[this.props.isNext].isComputer) {
                this.setBoxAI()
        }

        this.soundClick.setVolume(this.props.isSoundOn ? 0.5 : 0)
        
        return (

            /* The game board */
            <div className="game">
                <MessageBox />
                <Grid className="grid-padding-y align-center">
                    {this.state.board.boxes.map((row, index) => {
                        return (
                            <Cell key={index} className="board__row auto" onClick={() => this.setBoxPlayer(index)}>
                                {row.slice(0).reverse().map((box, i) => {
                                    return (
                                        <div className={'board__box ' + ((box !== null)?this.props.players[box].color:'')}></div>
                                    )
                                })}
                            </Cell>
                        )
                    })}
                </Grid>
                <Button size={Sizes.SMALL} color={Colors.PRIMARY} onClick={() => this.newGame()}>New Game</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startGame : () => {
            return dispatch(startGame())
        },
        toggleNextPlayer : (winner) => {
            return dispatch(toggleNextPlayer(winner))
        }
    }
};

const mapStateTopProps = (state) => {
    return {
    	size: state.board.size,
		amountToWin: state.board.amountToWin,
		isSoundOn: state.board.isSoundOn,
        isNext: state.board.isNext,
        isSinglePlayerGame: state.board.isSinglePlayerGame,
        players: state.player
    }
};

GameBoard = connect(mapStateTopProps, mapDispatchToProps)(GameBoard)

export default GameBoard