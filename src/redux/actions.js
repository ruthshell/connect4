// START GAME
export function startGame(rows = 6, columns = 7) {
	return {
		type: 'START_GAME',
		rows: rows,
		columns: columns
	}
}

// UPDATE BOXES
export function updateBoxes(colIndex) {
	return {
		type: 'UPDATE_BOXES',
		colIndex: colIndex
	}
}

// SET SOUND
export function toggleSound() {
	return {
		type: 'TOGGLE_SOUND'
	}
}

// UPDATE PLAYERNAME
export function updatePlayerName(color,name) {
	return {
		type: 'UPDATE_PLAYERNAME',
		color: color,
		name: name
	}
}