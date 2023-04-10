import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        User Management System
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/get-users">
                                    Get Users
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add-students">
                                    Add Students
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add-teachers">
                                    Add Teachers
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="jumbotron">
                <h1 className="display-4">Welcome to the User Management System!</h1>
                <p className="lead">
                    This is the homepage of our app. You can navigate to other pages using
                    the menu above.
                </p>
                <hr className="my-4" />
            </div>
        </div>
    );
}

export default HomePage;
