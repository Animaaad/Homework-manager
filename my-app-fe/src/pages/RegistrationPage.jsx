import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from '../services/authService';

function RegistrationPage(props) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubm = (e) => {
        e.preventDefault();
        addUser({
            "id": crypto.randomUUID(),
            "username": username,
            "password": password,
            "first_name": firstName,
            "last_name": lastName
        }).then(() => {
            navigate('/login');
        }).catch((error) => {
            if (error.response?.status === 409) {
                alert("User already exists");
            } else {
                alert("Something went wrong.");
                console.error(error.message);
            }
        });
    };

    return (
        <div className="registration-container">
            <div className="registration-form">
                <h2 className="text-center mb-4">Create an Account</h2>
                <form onSubmit={handleSubm}>
                    <input
                        type="text"
                        placeholder="Enter username"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="First name"
                        className="form-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        className="form-input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
}

export default RegistrationPage;