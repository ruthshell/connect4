import React from 'react'
import { Link } from 'react-router-dom'

import SoundToggleLink from './SoundToggleLink'

// Foundation Elements
import { Grid, Cell } from 'react-foundation'



// Create boardRow component
const Header = (props) => {
    return (
        <Grid className="grid-padding-y">
            <Cell className="auto">
                <h3><Link to="/">CONNECT4</Link></h3>
            </Cell>
            <Cell className="shrink">
                <SoundToggleLink/>&nbsp;
            </Cell>
        </Grid>
        
    )
}

export default Header;