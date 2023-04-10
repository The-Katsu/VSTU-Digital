import React, { useState, useEffect } from 'react';
import {API_URL} from "../config";

function AddStudentPage() {
    const [students, setStudents] = useState([{
        firstName: '',
        lastName: '',
        patronymic: '',
        groupName: ''
    }]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch('https://localhost:44382/getGroups')
            .then(response => response.json())
            .then(data => setGroups(data["groups"]));
    }, []);

    function handleInputChange(index, event) {
        const { name, value } = event.target;
        const list = [...students];
        list[index][name] = value;
        setStudents(list);
    }

    function handleAddStudent() {
        const list = [...students];
        list.push({
            firstName: '',
            lastName: '',
            patronymic: '',
            groupName: ''
        });
        setStudents(list);
    }

    function handleRemoveStudent(index) {
        const list = [...students];
        list.splice(index, 1);
        setStudents(list);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            users: students
        };
        fetch(`${API_URL}/createUsers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            setStudents([{
                firstName: '',
                lastName: '',
                patronymic: '',
                groupName: ''
            }]);
        });
    }

    return (
        <div className="container">
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
                {students.map((inputField, index) => (
                    <div key={index} className="row mb-3">
                        <div className="col">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={inputField.firstName} onChange={event => handleInputChange(index, event)} />
                        </div>
                        <div className="col">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={inputField.lastName} onChange={event => handleInputChange(index, event)} />
                        </div>
                        <div className="col">
                            <label htmlFor="patronymic" className="form-label">Patronymic</label>
                            <input type="text" className="form-control" id="patronymic" name="patronymic" value={inputField.patronymic} onChange={event => handleInputChange(index, event)} />
                        </div>
                        <div className="col">
                            <label htmlFor="groupName" className="form-label">Group Name</label>
                            <select className="form-select" id="groupName" name="groupName" value={inputField.groupName} onChange={event => handleInputChange(index, event)}>
                                <option value="">Choose...</option>
                                {groups.map(group => (
                                    <option key={group.id} value={group.name}>{group.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-danger" onClick={() => handleRemoveStudent(index)}>Remove</button>
                        </div>
                    </div>
                ))}

                <div className="mt-3">
                    <button type="button" className="btn btn-primary me-2" onClick={handleAddStudent}>Add Fields</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}


export default AddStudentPage;