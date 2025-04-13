import { Link } from "react-router-dom"

function ToTLogin() {
    return <nav className="NavBar">
        <div className="navbar-brand">
            <Link to = "/tlogin">log in as a teacher</Link>
        </div>
    </nav>
}

export default ToTLogin;