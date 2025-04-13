import { Link } from "react-router-dom"

function ToLogin() {
    return <nav className="NavBar">
        <div className="navbar-brand">
            <Link to = "/login">log in as a student</Link>
        </div>
    </nav>
}

export default ToLogin;