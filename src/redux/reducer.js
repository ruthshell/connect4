import {getWinner,areAllBoxesClicked} from '../utils/checkBoard'

const colors = ['red','yellow']

const INITIAL_STATE = {
	boxes: [],
	size: {
		'rows': 0,
		'columns': 0
	},
	playerNames: {
		[colors[0]]: 'Player 1',
		[colors[1]]: 'Player 2'
	},
	colors: colors,
	score: [0,0],
	amountToWin: 4,
	winner: undefined,
	isBoardBlocked: false,
	isDraw: false,
	isSoundOn: true,
	isSinglePlayerGame: true
};

export function boardReducer(state = INITIAL_STATE, action) {
	switch (action.type) {

		case 'START_GAME':
			return{
				...state,
				size: {
					'rows': action.rows,
					'columns': action.columns
				},
				boxes: [...Array(action.columns)].map(e => Array(action.rows).fill(null)),
				isNext: state.colors[0],
				winner: undefined,
				isBoardBlocked: false
			};
		case 'UPDATE_BOXES':
			const boxes = [...Array(state.size.columns)].map((col,colIndex) => {

				if (action.colIndex === colIndex) {
					let isColumnUnDone = true
					return [...state.boxes[colIndex]].map((row,rowIndex) => {
						if(row == null && isColumnUnDone) {
							isColumnUnDone = false
							return state.isNext
						} else {
							return row
						}
					})
				} else {
					return [...state.boxes[colIndex]]
				}

			})
			const winner = getWinner(boxes,state.amountToWin)
			const isDraw = (!winner && areAllBoxesClicked(boxes))

			return{
				...state,
				boxes: boxes,
				winner: winner,
				isDraw: isDraw,
				isNext: (state.isNext === state.colors[0]) ? state.colors[1] : state.colors[0],
				isBoardBlocked: ((winner || areAllBoxesClicked(boxes)) || (state.isNext === state.colors[0] && state.isSinglePlayerGame))
			};
		case 'UPDATE_PLAYERNAME':
			return{
				...state,
				playerNames: {...state.playerNames, [action.color]: action.name}
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