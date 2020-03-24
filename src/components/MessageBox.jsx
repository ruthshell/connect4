import React from 'react'
import {connect} from 'react-redux'

// Foundation Elements
import { Grid, Cell, Callout } from 'react-foundation'

// Import Sound
import UIfx from 'uifx'
import soundSuccessAudio from '../sounds/success.mp3' 

class MessageBox extends React.Component {

    constructor(props) {
        super(props)
        this.soundSuccess = new UIfx(soundSuccessAudio)
    }

    getMessage() {

        let message = null;

        // Status message

        if (this.props.winner) {
            // If winner exists, create status message
            message = <div className={"text-center " + this.props.winner}><b>The winner is: {this.props.playerNames[this.props.winner]}!</b></div>
            this.soundSuccess.play()
        } else if(!this.props.winner && this.props.isGameOver) {
            // If game is drawn, create status message
            message = <div>Game drawn!</div>
        } else {
            // If there is no winner and game is not drawn, ask the next player to make a move
            message =
                <Grid>
                    <Cell className="auto">
                        <span className={'dot ' + this.props.colors[0]}>&#9679;</span>
                        <span className={(this.props.isNext === this.props.colors[0] ? 'active' : null)}>{this.props.playerNames[this.props.colors[0]]}</span>
                    </Cell>
                    <Cell className="shrink">
                        <span className={(this.props.isNext === this.props.colors[1] ? 'active' : null)}>{this.props.playerNames[this.props.colors[1]]}</span>
                        <span className={'dot ' + this.props.colors[1]}>&#9679;</span>
                    </Cell>
                </Grid>
        }

       return message
    }

    render(){
        
        this.soundSuccess.setVolume(this.props.isSoundOn ? 0.5 : 0)

        return (
            <Callout className={'messageBox' + (this.props.winner ? (' winner') : '')}>
                {this.getMessage()}
            </Callout>
        )
    }
}

const mapStateTopProps = (state) => {
    return {
        playerNames: state.board.playerNames,
        colors: state.board.colors,
    	winner: state.board.winner,
    	isNext: state.board.isNext,
    	isGameOver: state.board.isGameOver,
        isSoundOn: state.board.isSoundOn
    }
}

MessageBox = connect(mapStateTopProps)(MessageBox);

export default MessageBox;