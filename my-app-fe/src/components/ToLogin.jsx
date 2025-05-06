import { Link } from "react-router-dom";

function ToLogin() {
  return (
    <Link to="/login" className="btn btn-outline-primary btn-lg">
      Log In
    </Link>
  );
}

export default ToLogin;