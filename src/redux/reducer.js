const INITIAL_BOARD_STATE = {
	size: {
		'rows': 6,
		'columns': 7
	},
	amountToWin: 4,
	winner: null,
	isDraw: false,
	isSoundOn: true,
	isSinglePlayerGame: false
}

const INITIAL_PLAYER_STATE = {
	1:{
		name: 'Player 1',
		techname: 'Player 1',
		color: 'red',
		score: 0
	},
	2:{
		name: 'Player 2',
		techname: 'Player 2',
		color: 'yellow',
		score: 0,
		isComputer: true
	}
}

export function boardReducer(state = INITIAL_BOARD_STATE, action) {
	switch (action.type) {

		case 'START_GAME':
			return{
				...state,
				isNext: 1,
				winner: null
			};
		case 'TOGGLE_NEXTPLAYER':
			return{
				...state,
				isNext: (state.isNext === 1) ? 2 : 1,
				winner: action.winner
			};
		case 'TOGGLE_SOUND':
			return{
				...state,
				isSoundOn: !state.isSoundOn
			};
		case 'TOGGLE_COMPUTER_PLAYER':
			return{
				...state,
				isSinglePlayerGame: !state.isSinglePlayerGame
			};
		default: return state;
	}
}

export function playerReducer(state = INITIAL_PLAYER_STATE, action) {
	switch (action.type) {
		case 'UPDATE_PLAYERNAME':
			state[action.index].name = action.name
			return[
				...state
			]
		default: return state;
	}
}