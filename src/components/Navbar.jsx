import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'

const Navbar = () => {

    return (
        <nav>
            <div className="logo">QuizApp</div>
            <div className="nav-links">
                <Link to={"/"}>Home</Link>
                <Link to={"/Quiz"}>Quiz</Link>
                <Link to={"/Result"}>Result</Link>
            </div>
        </nav>
    )
}

export default Navbar;