import { Link } from "react-router-dom"

function ToLogin() {
    return <nav className="NavBar">
        <div className="navbar-brand">
            <Link to = "/login">log in</Link>
        </div>
    </nav>
}

export default ToLogin;