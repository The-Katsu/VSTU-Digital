import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onLogin(username, password);
        navigate('/');
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-4">
                    <h1 className="mb-3">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
