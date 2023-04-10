import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import {API_URL} from "../config";

function GetUsersPage() {
    const [users, setUsers] = useState([]);
    const [filterRole, setFilterRole] = useState('');
    const [filterGroup, setFilterGroup] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/getUsers`)
            .then(response => response.json())
            .then(data => setUsers(data["users"]));
    }, []);

    const handleRoleFilterChange = (event) => {
        setFilterRole(event.target.value);
    };

    const handleGroupFilterChange = (event) => {
        setFilterGroup(event.target.value);
    };

    const filteredUsers = users.filter((user) => {
        return (
            (!filterRole || user.role === filterRole) &&
            (!filterGroup || user.groupName === filterGroup)
        );
    });

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
            <h1>Users</h1>
            <div className="row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="roleFilter">Filter by Role:</label>
                        <select className="form-control" id="roleFilter" value={filterRole} onChange={handleRoleFilterChange}>
                            <option value="">All</option>
                            <option value="Преподаватель">Преподаватель</option>
                            <option value="Студент">Студент</option>
                        </select>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="groupFilter">Filter by Group:</label>
                        <select className="form-control" id="groupFilter" value={filterGroup} onChange={handleGroupFilterChange}>
                            <option value="">All</option>
                        </select>
                    </div>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Group</th>
                    <th>Username</th>
                    <th>Password</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.groupName}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetUsersPage;
