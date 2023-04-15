import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./Navbar.css";

function formatLink(searchTerm: string) {
  return searchTerm.split(" ").join("_").toLowerCase();
}

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <nav>
        <div className="home-btn">
          <h1>
            <Link to="/">Open Books Library</Link>
          </h1>
        </div>
        <Form
          action={`/book/${formatLink(searchTerm)}`}
          onSubmit={() => setSearchTerm("")}
          className="search-bar"
        >
          <input
            type="search"
            id="search-box"
            value={searchTerm}
            placeholder="Search Books by Title or Author"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-icon">
            <FiSearch />
          </div>
        </Form>
      </nav>
    </>
  );
}

export default Navbar;
