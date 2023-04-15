import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Form, Link } from "react-router-dom";
import "./Sidebar.css";

function formatLink(link: string) {
	return link.split(" ").join("_").toLowerCase();
}

function createListOfSubjects() {
	const predefinedSubject = [
		"Psychology",
		"Comedy",
		"SciFi",
		"Criminal Law",
		"Romance",
		"Mystery",
		"Fantasy",
		"Adventure",
		"Classics",
		"Thriller",
	];

	return predefinedSubject.map((subject, idx) => {
		return (
			<Link to={`/subject/${formatLink(subject)}`} key={idx}>
				<li key={idx} className="subject-btn">
					{subject}
				</li>
			</Link>
		);
	});
}

function Sidebar() {
	const list = createListOfSubjects();
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<>
			<div className="sidebar">
				<Form
					action={`/subject/${searchTerm}`}
					onSubmit={() => setSearchTerm("")}
					className="search-bar"
				>
					<input
						type="search"
						id="search-box"
						value={searchTerm}
						placeholder="Search Subjects"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<FiSearch className="search-icon" />
				</Form>
				<h1>Trending Subjects</h1>
				<ul className="subject-list">{list}</ul>
			</div>
		</>
	);
}

export default Sidebar;
