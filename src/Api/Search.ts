import { BookData, SubjectData } from "../App";

interface BookWithTitle {
	numFound: number;
	docs: Array<BookData>;
}

interface BookWithSubject {
	work_count: number;
	works: Array<SubjectData>;
}

async function getBooks(url: string) {
	let data = undefined;

	try {
		const cache = localStorage[url];

		if (cache) {
			data = JSON.parse(cache);
		} else {
			const res = await fetch(url);
			data = await res.json();
			localStorage[url] = JSON.stringify(data);
		}
	} catch (err) {
		console.error(err);
	}

	return data;
}

async function searchByTitle(query: string, startIdx: number) {
	let books: BookWithTitle = { numFound: 0, docs: [] };

	books = await getBooks(
		`https://openlibrary.org/search.json?title=${query}&limit=10&offset=${startIdx}`
	);

	if (books.numFound > 0) return books;

	books = await getBooks(
		`https://openlibrary.org/search.json?author=${query}&limit=10&offset=${startIdx}`
	);

	return books;
}

async function searchBySubject(query: string) {
	let books: BookWithSubject = { work_count: 0, works: [] };

	books = await getBooks(`https://openlibrary.org/subjects/${query}.json`);

	return books;
}

export { searchByTitle, searchBySubject };
