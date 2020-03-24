///
// src/components/board.jsx
///
import React from 'react'
import {connect} from 'react-redux'
import {toggleSound} from '../redux/actions'

// Import Sound
import UIfx from 'uifx'
import soundClickAudio from '../sounds/click.mp3' 

// Foundation Elements
import { Button, Sizes, Colors } from 'react-foundation'

// Create Board component
class SoundToggleLink extends React.Component {

    constructor(props) {
        super(props)
        this.soundClick = new UIfx(soundClickAudio)
    }

    click() {
        this.props.toggleSound()
        this.soundClick.play()
    }

    render() {

        this.soundClick.setVolume(this.props.isSoundOn ? 0.5 : 0)
        
        return (
            /* Button to start new game */
            <Button size={Sizes.SMALL} color={Colors.PRIMARY} onClick={() => this.click()}>
                Sound {this.props.isSoundOn?'on':'off'}
            </Button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSound : () => {
            return dispatch(toggleSound())
        }
    }
}

const mapStateTopProps = (state) => {
    return {
        isSoundOn: state.board.isSoundOn
    }
}

SoundToggleLink = connect(mapStateTopProps,mapDispatchToProps)(SoundToggleLink);

export default SoundToggleLink;