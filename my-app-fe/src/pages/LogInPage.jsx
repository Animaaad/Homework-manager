import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { login, logout } from '../services/authService';


function LogInPage(props) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        logout()
        props.setAuthStatus(false);
    }, []);

    const handleSubm = (e) => {

        // prevent page reload
        e.preventDefault();
        // basic validation  
        if (username === '' || password === '') {
            props.setError('Username and password are required!');
            return;
        }
        console.log("www")
        login(username, password)
            .then((data) => {
                console.log("zzz" + data.user.id + "zzz")
                props.setAuthStatus(true);

                if (data.user.is_teacher) {
                    navigate('/thome');
                } else {
                    navigate('/home')
                }
            })
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message)
            });
        // reset error message if the form is valid
        props.setError('');
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
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    )
}

export default LogInPage