import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from '../services/authService';

function LogInPage(props) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        props.setAuthStatus(false);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            props.setError('Username and password are required!');
            return;
        }
        login(username, password)
            .then((data) => {
                props.setAuthStatus(true);
                if (data.user.is_teacher) {
                    navigate('/thome');
                } else {
                    navigate('/home');
                }
            })
            .catch((error) => {
                props.setError(error.message);
            });
        props.setError('');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="login-form-container bg-white p-5 rounded shadow-lg">
                <h2 className="text-center mb-4">Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="form-control p-3 rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="form-control p-3 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2">
                        Log In
                    </button>
                    {error && <p className="text-danger text-center mt-3">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default LogInPage;