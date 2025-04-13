import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LogInPage() {
    const mockUsers = {
        alice: 'pass123',
        bob: 'qwerty',
    };

    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubm = (e) => {
        const userPassword = mockUsers[username.toLowerCase()];
        if (userPassword && password === userPassword) {
            navigate('/home');
        } else {
            setError('Invalid username or password.');
        }
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
                    className="w-full border p-2 rounded"
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

export default LogInPage