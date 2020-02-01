///
// src/components/board.jsx
///
import React from 'react'

// Import Storage object
import { Storage } from './../storage/storage'

// Import Box component
import { Box } from './board-box/board-box'

// Import utility functions
import * as utils from '../utils/functions'

// Foundation Elements
import { Grid, Cell } from 'react-foundation';
import { Button, Colors } from 'react-foundation';

// Create Board component
export class Board extends React.Component {
    constructor(props) {
        super(props)

        const initRow = 3;
        const initColumn = 3;

        // Initialize component state
        this.state = {
            rows: initRow,
            columns: initColumn,
            boxes: Array(initRow*initColumn).fill(null),
            history: [],
            xIsNext: true
        }
    }

    // Create instance of Storage object
    storage = new Storage()

    // Handle click on boxes on the board.
    handleBoxClick(index) {
        // get current state of boxes
        const boxes = this.state.boxes.slice()

        // Get current state of history
        let history = this.state.history

        // Stop the game if board contains winning combination
        if (utils.findWinner(boxes) || boxes[index]) {
            return
        }

        // Stop the game if all boxes are clicked (filled)
        if(utils.areAllBoxesClicked(boxes) === true) {
            return
        }

        // Mark the box either as 'x' or 'o'
        boxes[index] = this.state.xIsNext ? 'x' : 'o'

        // Add move to game history
        history.push(this.state.xIsNext ? 'x' : 'o')

        // Update component state with new data
         this.setState({
            boxes: boxes,
            history: history,
            xIsNext: !this.state.xIsNext
        })
    }

    // Handle board restart - set component state to initial state
    handleBoardRestart = () => {
        this.setState({
            boxes: Array(this.state.rows*this.state.columns).fill(null),
            history: [],
            xIsNext: true
        })
    }

    render() {
        // Get winner (if there is any)
        const winner = utils.findWinner(this.state.boxes)

        // Are all boxes checked?
        const isFilled = utils.areAllBoxesClicked(this.state.boxes)

        // Status message
        let status

        if (winner) {
            // If winner exists, create status message
            status = `The winner is: ${winner}!`

            // Push data about the game to storage
            this.storage.update([`${winner} won`])
        } else if(!winner && isFilled) {
            // If game is drawn, create status message
            status = 'Game drawn!'

            // Push data about the game to storage
            this.storage.update(['Game drawn'])
        } else {
            // If there is no winner and game is not drawn, ask the next player to make a move
            status = `It is ${(this.state.xIsNext ? 'x' : 'o')}'s turn.`
        }

        const items = []
        let itemID = 0
        for (let i = 0; i < this.state.columns; i++) {
            const rowItems = []
            for (let y = 0; y < this.state.rows; y++) {
                rowItems.push(itemID)
                itemID++
            }
            items.push(rowItems)
        }

        return (
            <div>
                {/* The game board */}

                        <Grid className="collapse align-center">
                            {items.map((row, index) => {
                                return (
                                    <Cell key={index} className="auto shrink">
                                        {row.map((box, i) => {
                                            return (
                                                <Box key={box} value={this.state.boxes[box]} onClick={() => this.handleBoxClick(box)} />
                                            )
                                        })}
                                    </Cell>
                                )
                            })}
                        </Grid>


                    <div className="text-center">
                        <p>{status}</p>

                        {/* List with history of moves */}
                        <ul className="board-historyList">
                            {this.state.history.length === 0 && <span>No moves to show.</span>}

                            {this.state.history.length !== 0 && this.state.history.map((move, index) => {
                                return <li key={index}>Move {index + 1}: <strong>{move}</strong></li>
                            })}
                        </ul>
                    </div>

                    {/* Button to start new game */}
                    {winner && <div className="board-footer">
                        <Button color={Colors.PRIMARY} onClick={this.handleBoardRestart}>Start new game</Button>
                    </div>}

            </div>
        )
    }
}
