import { Link } from "react-router-dom"

function ToRegistration() {
    return <nav className="NavBar">
        <div className="navbar-brand">
            <Link to = "/register">registration</Link>
        </div>
    </nav>
}

export default ToRegistration;