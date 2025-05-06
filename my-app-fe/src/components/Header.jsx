import { useState, useEffect } from 'react';
import { logout, getCurrentUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    function handleLogout() {
        logout()
            .then(() => {
                props.setAuthStatus(false);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message);
            });
    }

    useEffect(() => {
        getCurrentUser()
            .then((response) => {
                setUser(response.user);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [props.authStatus]);

    return (
        <>
            <div className="row mb-3 align-items-center">
                <div className="col-sm-5 text-start">
                    <h3 className="py-2 m-0">Homework Manager</h3>
                    {props.authStatus && user && (
                        <p className="mb-0 fs-5">
                            {user.first_name} {user.last_name}
                        </p>
                    )}
                </div>
                <div className="col-sm text-center" />
                {props.authStatus && (
                    <div className="col-sm-4 text-end">
                        <button className="btn btn-outline-primary" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {props.error && (
                <div className="row">
                    <div className="col-sm-12">
                        <p className="text-danger text-center">{props.error}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export { Header };