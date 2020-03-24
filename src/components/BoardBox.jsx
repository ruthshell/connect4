import React from 'react'

// Create boardRow component
class BoardBox extends React.Component  {
    render () {
        return (
            <div className={'board__box ' + this.props.value}></div>
        )
    }
}

export default BoardBox