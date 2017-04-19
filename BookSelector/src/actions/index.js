export function selectBook(book) {
	// selectBook is an ActionCreater, it needs to return an action,
	// an object with a type property.
	console.log(book);
	return {
		type: 'BOOK_SELECTED',
		payload: book
	};
}

