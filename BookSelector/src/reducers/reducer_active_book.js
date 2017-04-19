// State argument is not application state, only the state that this
// reducer is responsible for

// state = null tarkoitaa että jos state on undefined se on null (reduxille tärkeää)
export default function(state = null, action) {
	switch(action.type) {
	case 'BOOK_SELECTED':
		return action.payload;
	}

	return state;
}