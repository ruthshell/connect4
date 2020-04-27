// START GAME
export function startGame() {
	return {
		type: 'START_GAME',
	}
}

// TOGGLE NEXT PLAYER
export function toggleNextPlayer(winner) {
	return {
		type: 'TOGGLE_NEXTPLAYER',
		winner: winner
	}
}

// TOGGLE SOUND
export function toggleSound() {
	return {
		type: 'TOGGLE_SOUND'
	}
}

// TOGGLE COMPUTER PLAYER
export function toggleComputerPlayer() {
	return {
		type: 'TOGGLE_COMPUTER_PLAYER'
	}
}

// UPDATE PLAYERNAME
export function updatePlayerName(index,name) {
	return {
		type: 'UPDATE_PLAYERNAME',
		index: index,
		name: name
	}
}