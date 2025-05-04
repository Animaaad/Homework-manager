import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {addUser} from '../services/authService'

function RegistrationPage() {

    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const handleSubm = (e) => {
        e.preventDefault()
        addUser({
            "id": crypto.randomUUID(),
            "username": username,
            "password": password,
            "first_name": firstName,
            "last_name": lastName
        })
            .catch((error) => {
                console.log(error.message);
            })
        navigate('/login');
    };

    return (
        <div className="register">
            <form onSubmit={handleSubm} className="enter-symbols">
                <input type="text"
                    placeholder="Enter username"
                    className="enter-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="LastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">
                    Submit
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    )
}

export default RegistrationPage