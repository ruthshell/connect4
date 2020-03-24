export const getWinner = (boxes, amountToWin) => {
    return (checkHorizontal(boxes, amountToWin) || checkVertical(boxes, amountToWin) || checkDiagonalLeft(boxes, amountToWin) || checkDiagonalRight(boxes, amountToWin))
}

export const areAllBoxesClicked = (boxes) => {
    for (let col = 0;col < boxes.length; col++) {
        for(let row = 0; row < boxes[col].length; row++) {
            if (boxes[col][row] === null) {
                return false
            }
        }
    }
    return true
}

const checkHorizontal = (boxes, amountToWin) => {
    for (let r = 0; r < boxes[0].length; r++) {
        for (let c = 0; c <= (boxes.length - amountToWin); c++) {
            if (boxes[c][r]){
                for (let amount = 1; amount < amountToWin; amount++) {
                    if (boxes[c][r] === boxes[c + amount][r]) {
                        if(amount === amountToWin-1) {
                            return boxes[c][r]
                        }
                    } else {
                        break
                    }
                }
            }
        }
    }
}

const checkVertical = (boxes, amountToWin) => {
    for (let r = 0; r <= (boxes[0].length - amountToWin); r++) {
        for (let c = 0; c < boxes.length; c++) {
            if (boxes[c][r]){
                for (let amount = 1; amount < amountToWin; amount++) {
                    if (boxes[c][r] === boxes[c][r + amount]) {
                        if(amount === amountToWin-1) {
                            return boxes[c][r]
                        }
                    } else {
                        break
                    }
                }
            }
        }
    }
}

const checkDiagonalRight = (boxes, amountToWin) => {
    for (let r = 0; r <= (boxes[0].length - amountToWin); r++) {
        for (let c = 0; c <= boxes.length - amountToWin; c++) {
            if (boxes[c][r]){
                for (let amount = 1; amount < amountToWin; amount++) {
                    if (boxes[c][r] === boxes[c + amount][r + amount]) {
                        if(amount === amountToWin-1) {
                            return boxes[c][r]
                        }
                    } else {
                        break
                    }
                }
            }
        }
    }
}

const checkDiagonalLeft = (boxes, amountToWin) => {
    for (let r = 0; r <= (boxes[0].length - amountToWin); r++) {
        for (let c = amountToWin - 1; c < boxes.length; c++) {
            if (boxes[c][r]){
                for (let amount = 1; amount < amountToWin; amount++) {
                    if (boxes[c][r] === boxes[c - amount][r + amount]) {
                        if(amount === amountToWin-1) {
                            return boxes[c][r]
                        }
                    } else {
                        break
                    }
                }
            }
        }
    }
}
