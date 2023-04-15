import { Route, Routes } from "react-router-dom";
import Books from "./Components/BookList/Books";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";

export interface BookData {
	title: string;
	publish_year: Array<number>;
	first_publish_year: number;
	author_name: Array<string>;
	subject: Array<string>;
}

export interface SubjectData {
	title: string;
	authors: Array<{ name: string }>;
	first_publish_year: number;
}

export interface Book {
	numFound?: number;
	docs?: Array<BookData>;
	work_count?: number;
	works?: Array<SubjectData>;
}

function App() {
	return (
		<>
			<Navbar />
			<div className="main">
				<Sidebar />
				<Routes>
					<Route path="/" element="" />
					<Route path=":domain/:name" element={<Books />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
