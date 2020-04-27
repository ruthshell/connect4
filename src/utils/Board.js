
class Board {

    constructor(columns,rows,amountToWin) {
        this.columns = columns
        this.rows = rows
        this.amountToWin = amountToWin
        this.newGame()
    }

    setBoxPlayer(index, playerIndex) {
        if (this.isBoardBlocked) {
            return null
        }
        for (let r = 0 ; r < this.rows ; r++) {
            if(this.boxes[index][r] == null) {
                this.boxes[index][r] = playerIndex
                this.checkBoard()
                return r
            }
        }
        return null
    }

    setBoxAI() {
        //console.log(boxes)
        return 1
    }

    areAllBoxesClicked(){
        for (let c = 0;c < this.columns.length; c++) {
            for(let r = 0; r < this.rows.length; r++) {
                if (this.boxes[c][r] === null) {
                    return false
                }
            }
        }
        return true
    }

    checkBoard () {

        const checkHorizontal =     this.check(this.boxes, this.rows, (this.columns - this.amountToWin + 1), true, false)
        const checkVertical =       this.check(this.boxes, (this.rows - this.amountToWin + 1), this.columns, false, true)
        const checkDiagonalRight =  this.check(this.boxes, (this.rows - this.amountToWin + 1), (this.columns - this.amountToWin + 1), true, true)
        const checkDiagonalLeft =   this.check([...this.boxes].reverse(), (this.rows - this.amountToWin + 1), (this.columns - this.amountToWin + 1), true, true)

        this.winner = (
            checkHorizontal.winner ||
            checkVertical.winner ||
            checkDiagonalRight.winner ||
            checkDiagonalLeft.winner
        )

        if (this.winner != null) {
            this.isBoardBlocked = true
        }

        this.score = {
            1:checkHorizontal.score[1] + checkVertical.score[1] + checkDiagonalRight.score[1] + checkDiagonalLeft.score[1],
            2:checkHorizontal.score[2] + checkVertical.score[2] + checkDiagonalRight.score[2] + checkDiagonalLeft.score[2]
        }

    }

    check (boxes, rowAmount, colAmount, isColIncr, isRowIncr) {
        let status = {
            winner: null,
            score: {
                1:0,
                2:0
            }
        }
        for (let r = 0; r < rowAmount; r++) {
            for (let c = 0; c < colAmount; c++) {
                if (this.boxes[c][r]){
                    for (let amount = 1; amount < this.amountToWin; amount++) {
                        if (this.boxes[c][r] === this.boxes[c + (isColIncr?amount:0)][r + (isRowIncr?amount:0)]) {
                            status.score[this.boxes[c][r]]++
                            if(amount === this.amountToWin-1) {
                                status.winner = boxes[c][r]
                                return status
                            }
                        } else {
                            break
                        }
                    }
                }
            }
        }
        return status
    }

    newGame() {
        this.isBoardBlocked = false
        this.winner = null
        this.score = { 1:0, 2:0 }
        this.boxes = [...Array(this.columns)].map(e => Array(this.rows).fill(null))
    }

}

export default Board